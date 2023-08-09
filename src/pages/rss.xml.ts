import { GetServerSideProps } from "next";
import { CharacterApi } from "shared/api/character";
import { ApiCollectionResponse } from "shared/api/types";
import { CharacterExtend } from "shared/api/character/type";
import { checkImageFormat } from "shared/api/model";

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

function generateRssFeed(
  charactersList: ApiCollectionResponse<CharacterExtend>,
) {
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
          ${charactersList.data
            .map((char) => {
              const imageFormat = char.attributes.info?.image?.data?.attributes
                ? checkImageFormat(
                    char.attributes.info.image.data.attributes.formats,
                  )
                : "thumbnail";
              const splashImage =
                char.attributes.info?.image?.data?.attributes?.formats?.[
                  imageFormat
                ];

              return `
              <item turbo="true">
                <turbo:extendedHtml>true</turbo:extendedHtml>
                <link>${DOMAIN_HOST}/characters/${char.attributes.name}</link>
                <turbo:topic>${char.attributes.name} | pom-pom.pro</turbo:topic>

                <pubDate>${char.attributes.updatedAt}</pubDate>
                    <turbo:content>
                      <![CDATA[
                          <header>
                            <h1>${char.attributes.name}</h1>
                          </header>
                          <section>
                            <div>
                              <figure>
                                <img src="${SERVER_DOMAIN_HOST}${
                splashImage?.url
              }">
                                <figcaption>${char.attributes.name}</figcaption>
                              </figure> 
                              <p>
                                <span>Путь:</span>
                                <span>${pathList[char.attributes.path]}</span>
                              </p>
                              <p>
                                <span>Тип:</span>
                                <span>${
                                  elementList[char.attributes.element]
                                }</span>
                              </p>
                              <p>
                                ${char.attributes.info.story}
                              </p>
                            </div>
                          </section>
                          <br />
                            <section>
                            <h2>Навыки</h2>
                            ${char.attributes.info?.main_skill
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

function Rss() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const charactersListRequest = await Api.getCharactersListForRss();

  const rss = generateRssFeed(charactersListRequest.data);

  res.setHeader("Content-Type", "text/xml");
  res.write(rss);
  res.end();

  return {
    props: {},
  };
};

export default Rss;
