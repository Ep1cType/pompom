import { GetServerSideProps } from "next";
import { CharacterApi } from "shared/api/character";
import { ApiCollectionResponse } from "shared/api/types";
import { CharacterExtend } from "shared/api/character/type";

const DOMAIN_HOST = process.env.NEXT_PUBLIC_DOMAIN as string;
const Api = new CharacterApi();

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
              return `
              <item turbo="true">
                <turbo:extendedHtml>true</turbo:extendedHtml>
                <link>${DOMAIN_HOST}/characters/${char.attributes.name}</link>
                <turbo:topic>${char.attributes.name} | pom-pom.pro</turbo:topic>

                <pubDate>${char.attributes.updatedAt}</pubDate>
                    <turbo:content>
                      <![CDATA[
                          <header>
                          
                          </header>
                          <section class="mb-4 flex flex-col-reverse items-center justify-between gap-3 md:mb-8 md:flex-row">
                            <div class="md:max-w-[50%]">
                              <h1>${char.attributes.name}</h1>
                            </div>
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
