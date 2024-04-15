import { CharacterApi, getCharactersList } from "shared/api/character";
import { CharacterExtend } from "shared/api/character/type";
import { checkImageFormat } from "shared/api/model";
import { ApiCollectionResponse } from "shared/api/types";

export const dynamic = "force-dynamic";

const DOMAIN_HOST = process.env.NEXT_PUBLIC_DOMAIN as string;
const SERVER_DOMAIN_HOST = process.env.NEXT_PUBLIC_API_URL as string;
const Api = new CharacterApi();

const pathList = {
  destruction: "Разрушение",
  hunt: "Охота",
  erudition: "Эрудиция",
  harmony: "Гармония",
  nihility: "Небытие",
  preservation: "Сохранение",
  abundance: "Изобилие",
};

const elementList = {
  title: "Тип",
  fire: "Огненный",
  ice: "Ледяной",
  imaginary: "Мнимый",
  lightning: "Электрический",
  quantum: "Квантовый",
  wind: "Ветряной",
  physical: "Физический",
};

export async function GET() {
  const characterList = await getCharactersList({
    query: {
      "populate[0]": "info",
      "populate[1]": "info.main_skill,info.eidolon,info.eidolon.image,info.image,info.meta_img",
      "populate[2]": "info.main_skill.icon",
    },
  });

  return new Response(generateRssFeed(characterList as CharacterExtend[]), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}

function generateRssFeed(charactersList: CharacterExtend[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss
      xmlns:yandex="http://news.yandex.ru"
      xmlns:media="http://search.yahoo.com/mrss/"
      xmlns:turbo="http://turbo.yandex.ru"
      version="2.0">
        <channel>
          <title>pom-pom.pro rss feed</title>
          <link>${DOMAIN_HOST}</link>
          <copyright>Honkai: Star Rail, контент и материалы игры являются товарными знаками и принадлежат HoYoverse.</copyright>
          <description>Краткое описание канала</description>
          <language>ru</language>
          ${charactersList
            .map((char) => {
              const imageFormat = char.info?.image ? checkImageFormat(char.info.image.formats) : "thumbnail";
              const splashImage = char.info?.image?.formats?.[imageFormat];

              return `
              <item turbo="true">
                <turbo:extendedHtml>true</turbo:extendedHtml>
                <link>${DOMAIN_HOST}/characters/${char.name}</link>
                <turbo:topic>${char.name} | pom-pom.pro</turbo:topic>

                <pubDate>${char.updatedAt}</pubDate>
                    <turbo:content>
                      <![CDATA[
                          <header>
                            <h1>${char.name}</h1>
                          </header>
                          <section>
                            <div>
                              <figure>
                                <img src="${SERVER_DOMAIN_HOST}${splashImage?.url}">
                                <figcaption>${char.name}</figcaption>
                              </figure> 
                              <p>
                                <span>Путь:</span>
                                <span>${pathList[char.path]}</span>
                              </p>
                              <p>
                                <span>Тип:</span>
                                <span>${elementList[char.element]}</span>
                              </p>
                              <p>
                                ${char.info.story}
                              </p>
                            </div>
                          </section>
                          <br />
                            <section>
                            <h2>Навыки</h2>
                            ${char.info?.main_skill
                              ?.map((skill) => {
                                return `<div>
                                  <h3>${skill.name}</h3>
                                  <p>${skill.type}</p>
                                  <p>${Object.values(skill.description)[0]}</p>
                                </div>
                              `;
                              })
                              .join("")}
                          </section>
                      ]]> 
                    </turbo:content>
              </item>
            `;
            })
            .join("")}
        </channel>
    </rss>
  `;
}
