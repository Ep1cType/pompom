import React, { useState } from 'react';
import { CharacterMainSkill } from 'shared/api/character/type';

type Props = {
	skill: CharacterMainSkill;
}

export const CharacterSkill = ({ skill }: Props) => {
	const [initialSkill, setInitialSkill] = useState(0);

	const skillLevelList = Object.values(skill.description) as string[];

	return (
		<div className='py-4 px-4 bg-blue-900 rounded-2xl'>
			<h3 className="font-medium mb-2">{skill.name}</h3>
			<p dangerouslySetInnerHTML={{__html: skillLevelList[initialSkill]}} />
			{skillLevelList.map((_, index) => (
				<button key={index} onClick={() => setInitialSkill(index)}>{index + 1}</button>
			))}
		</div>
	);
};
