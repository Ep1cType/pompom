import React, { useState } from "react";
import { CharacterMainSkill } from "shared/api/character/type";

type Props = {
  skill: CharacterMainSkill;
};

export const CharacterSkill = ({ skill }: Props) => {
  const [initialSkill, setInitialSkill] = useState(0);

  const skillLevelList = Object.values(skill.description) as string[];
  const maxSkillLevel = skillLevelList.length - 1;

  return (
    <div className="flex flex-col rounded-2xl bg-blue-900 px-4 py-4">
      <h3 className="mb-1 text-base font-bold">{skill.name}</h3>
      <p className="mb-2 text-sm font-medium text-orange-300">{skill.type}</p>
      <p
        className="flex-grow text-base/snug [&>span]:font-bold"
        dangerouslySetInnerHTML={{ __html: skillLevelList[initialSkill] }}
      />

      {skillLevelList.length > 1 && (
        <div className="mt-4">
          <span className="mr-2">Уровень: {initialSkill + 1}</span>
          <p className="inline space-x-1">
            <input
              className="range range-accent range-xs"
              type="range"
              min={0}
              max={maxSkillLevel}
              value={initialSkill}
              onChange={(e) => setInitialSkill(Number(e.target.value))}
            />
            {/*{skillLevelList.map((_, index) => (*/}
            {/*	<button*/}
            {/*		className={clsx('btn btn-circle btn-xs border-white hover:bg-blue-950 hover:border-white', initialSkill === index ? 'bg-orange-500 hover:bg-orange-500' : 'bg-transparent')}*/}
            {/*		key={index} onClick={() => setInitialSkill(index)}>{index + 1}</button>*/}
            {/*))}*/}
          </p>
        </div>
      )}
    </div>
  );
};
