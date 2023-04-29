import React from 'react';
import { ResponseDataItem } from 'shared/api/types';
import { CharacterExtend } from 'shared/api/character/type';
import { ImageWithDomain } from 'shared/ui/image-with-domain';
import { CharacterSkill } from 'molecules/character-skill';

type Props = {
	characterInfo: ResponseDataItem<CharacterExtend>
}

export const CharacterInfo = ({ characterInfo }: Props) => {
	return (
		<div className='container mx-auto px-4 py-8'>
			<section className="flex flex-col-reverse md:flex-row justify-between items-start gap-3 md:mb-8 mb-4">
				<div className="md:max-w-[50%]">
					<h1 className='text-4xl mb-8'>{characterInfo.attributes.name}</h1>
					<p className="text-lg/tight">{characterInfo.attributes.info?.story}</p>
				</div>
				{characterInfo.attributes.info?.image && (
					<ImageWithDomain
						className="md:max-w-[50%]"
						src={characterInfo.attributes.info.image.data.attributes.formats.large.url}
						width={characterInfo.attributes.info.image.data.attributes.formats.large.width}
						height={characterInfo.attributes.info.image.data.attributes.formats.large.height}
						quality={100}
						alt={characterInfo.attributes.info.image.data.attributes.name}
					/>
				)}

			</section>
			<section>
				<h2 className="text-2xl font-medium mb-4">Главные навыки</h2>
				{characterInfo.attributes.info?.main_skill?.map((skill) => (
					<CharacterSkill key={skill.id} skill={skill} />
				))}
			</section>
		</div>
	);
};
