import { GetServerSideProps } from "next";

import { CharacterApi } from "shared/api/character";
import { Character } from "shared/api/character/type";
import { ApiCollectionResponse } from "shared/api/types";

const DOMAIN_HOST = process.env.NEXT_PUBLIC_DOMAIN;
const Api = new CharacterApi();

function generateSiteMap(charactersList: ApiCollectionResponse<Character>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${DOMAIN_HOST}</loc>
       <changefreq>monthly</changefreq>
       <priority>0.2</priority>
       <lastmod>2023-05-05</lastmod>
     </url>
     <url>
       <loc>${DOMAIN_HOST}/characters</loc>
       <changefreq>monthly</changefreq>
       <priority>0.5</priority>
       <lastmod>2023-05-05</lastmod>
     </url>
     <url>
       <loc>${DOMAIN_HOST}/warp</loc>
       <changefreq>monthly</changefreq>
       <priority>0.9</priority>
       <lastmod>2023-05-08</lastmod>
     </url>
     <url>
       <loc>${DOMAIN_HOST}/timeline</loc>
       <changefreq>monthly</changefreq>
       <priority>0.9</priority>
       <lastmod>2023-05-12</lastmod>
     </url>
     ${charactersList.data
       .map((char) => {
         return `
       <url>
           <loc>${`${DOMAIN_HOST}/characters/${char.attributes.name}`}</loc>
           <changefreq>monthly</changefreq>
           <priority>0.9</priority>
           <lastmod>${char.attributes.updatedAt}</lastmod>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // We make an API call to gather the URLs for our site
  // const charactersListRequest = await Api.getCharactersList({});
  // const charactersListRequest = [];

  // We generate the XML sitemap with the posts data
  // const sitemap = generateSiteMap(charactersListRequest.data);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  // res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
