import React, { useState } from 'react';
import { CharacterMainSkill } from 'shared/api/character/type';
import clsx from 'clsx';

type Props = {
	skill: CharacterMainSkill;
}

export const CharacterSkill = ({ skill }: Props) => {
	const [initialSkill, setInitialSkill] = useState(0);

	const skillLevelList = Object.values(skill.description) as string[];

	return (
		<div className='py-4 px-4 bg-blue-900 rounded-2xl'>
			<h3 className='font-medium mb-2'>{skill.name}</h3>
			<p dangerouslySetInnerHTML={{ __html: skillLevelList[initialSkill] }} />
			<div className="mt-4">
				<span className='mr-2'>Уровни:</span>
				<p className='space-x-1 inline'>
					{skillLevelList.map((_, index) => (
						<button className={clsx('btn btn-circle btn-outline btn-xs', initialSkill === index && 'btn-active')}
										key={index} onClick={() => setInitialSkill(index)}>{index + 1}</button>
					))}
				</p>
			</div>
		</div>
	);
};
