import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ResponseDataItem } from 'shared/api/types';
import { Character, CharacterExtend } from 'shared/api/character/type';
import { CharacterApi } from 'shared/api/character';
import { useRouter } from 'next/router';
import { CharacterInfo } from 'organisms/character-info';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { checkImageFormat } from 'shared/api/model';

const Api = new CharacterApi();

const CharacterPage = ({ characterInfo }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const router = useRouter();

	if (router.isFallback) {
		return (
			<h1>Loading...</h1>
		);
	}

	if (characterInfo) {
		const imageFormat = characterInfo.attributes.info?.meta_img?.data?.attributes ? checkImageFormat(characterInfo.attributes.info?.meta_img?.data?.attributes?.formats) : "thumbnail";

		return (
			<>
				<Head>
					<title>{`${characterInfo.attributes.name} | pom-pom.pro`}</title>
					<meta property='og:title' content={`${characterInfo.attributes.name} | pom-pom.pro`} />
					<meta property='og:description' content={characterInfo.attributes?.info?.story} />
					<meta name="description" content={characterInfo.attributes?.info?.story} />
					<meta property="og:url" content={`${process.env.NEXT_PUBLIC_DOMAIN}/characters/${characterInfo.attributes.name}`} />
					<meta property="og:type" content="profile"/>
					<meta property="og:locale" content={router.locale} />
					{characterInfo.attributes.info?.meta_img?.data && (
						<meta property='og:image'
									content={`${process.env.NEXT_PUBLIC_API_URL}${characterInfo.attributes.info.meta_img?.data?.attributes?.formats?.[imageFormat]?.url}`} />
					)}
				</Head>
				<CharacterInfo characterInfo={characterInfo} />
			</>
		);
	}
};

export const getStaticPaths: GetStaticPaths = async (context) => {
	const locales = context!.locales;
	const allResponse: ResponseDataItem<Character>[] = [];

	// @ts-ignore
	for (const locale of locales) {
		const response = await Api.getCharactersList({ locale });
		allResponse.push(...response.data.data);
	}

	const paths = allResponse.map((char) => ({
		params: { id: char.attributes.name },
		locale: char.attributes.locale,
	}));


	return {
		fallback: true,
		paths,
	};
};

export const getStaticProps: GetStaticProps<{ characterInfo: ResponseDataItem<CharacterExtend> | null }> = async (
	context,
) => {
	const locale = context.locale as string;
	const name = context.params!.id as string;


	try {
		const response = await Api.getCharacter({ name, locale });

		if (response.data.data.length > 0) {
			return {
				props: {
					characterInfo: response.data.data[0] ?? null,
					...(await serverSideTranslations(locale, ['common', 'character'])),
				},
				revalidate: 60,
			};
		}

		return {
			props: {
				characterInfo: null,
				...(await serverSideTranslations(locale, ['common', 'character'])),
			},
			redirect: {
				revalidate: 60,
				destination: '/404',
			},
		};

	} catch (e) {
		return {
			props: {
				characterInfo: null,
				...(await serverSideTranslations(locale, ['common', 'character'])),
			},
			redirect: {
				revalidate: 60,
				destination: '/404',
			},
		};
	}
};

export default CharacterPage;