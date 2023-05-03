import React from 'react';
import { ResponseDataItem } from 'shared/api/types';
import { CharacterExtend } from 'shared/api/character/type';
import { ImageWithDomain } from 'shared/ui/image-with-domain';
import { CharacterSkill } from 'molecules/character-skill';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

type Props = {
	characterInfo: ResponseDataItem<CharacterExtend>
}

export const CharacterInfo = ({ characterInfo }: Props) => {
	const { t } = useTranslation(['character']);

	const starCount = characterInfo.attributes.star === 'five' ? 5 : 4;

	return (
		<div className='container mx-auto px-4 py-8'>
			<section className='flex flex-col-reverse md:flex-row justify-between items-center gap-3 md:mb-8 mb-4'>
				<div className='md:max-w-[50%]'>
					<h1 className='text-4xl'>{characterInfo.attributes.name}</h1>

					<p className='mb-8'>
						{[...Array(starCount)].map((_, index) => (
							<Image
								key={index}
								className='w-4 h-4 inline mr-2'
								src={`/icons/common/level_star.png`}
								width={42}
								height={42}
								alt={`${characterInfo.attributes.path} icon`}
							/>
						))}
					</p>

					<p className='flex items-center mb-2'>
						<span className='mr-2 font-medium text-base'>{t('path.title', { ns: 'character' })}:</span>
						<Image
							className='w-5 h-5 inline mr-2'
							src={`/icons/paths/${characterInfo.attributes.path}.png`}
							width={108}
							height={108}
							alt={`${characterInfo.attributes.path} icon`}
						/> <span className='opacity-80'>{t(`path.${characterInfo.attributes.path}`, { ns: 'character' })}</span>
					</p>
					<p className='flex items-center mb-2'>
						<span className='mr-2 font-medium text-base'>{t('element.title', { ns: 'character' })}:</span>
						<Image
							className='w-5 h-5 inline mr-2'
							src={`/icons/elements/${characterInfo.attributes.element}.webp`}
							width={256}
							height={256}
							alt={`${characterInfo.attributes.element} icon`}
						/> <span
						className='opacity-80'>{t(`element.${characterInfo.attributes.element}`, { ns: 'character' })}</span>
					</p>
					<p className='text-lg/tight'>{characterInfo.attributes.info?.story}</p>
				</div>
				{characterInfo.attributes.info?.image && (
					<ImageWithDomain
						className='md:max-w-[50%]'
						src={characterInfo.attributes.info.image.data.attributes.formats.large.url}
						width={characterInfo.attributes.info.image.data.attributes.formats.large.width}
						height={characterInfo.attributes.info.image.data.attributes.formats.large.height}
						quality={100}
						alt={characterInfo.attributes.info.image.data.attributes.name}
					/>
				)}

			</section>
			<section className="mb-6">
				<h2 className='text-2xl font-medium mb-4'>Навыки</h2>
				<div className="flex flex-col gap-4">
					{characterInfo.attributes.info?.main_skill?.map((skill) => (
						<CharacterSkill key={skill.id} skill={skill} />
					))}
				</div>
			</section>
			<section>
				<h2 className='text-2xl font-medium mb-4'>Эйдолоны</h2>
			</section>
		</div>
	);
};
