import React, { useState } from "react";
import { CharacterMainSkill } from "shared/api/character/type";

interface Props {
  skill: CharacterMainSkill;
}

export const CharacterSkill = ({ skill }: Props) => {
  const [initialSkill, setInitialSkill] = useState(0);

  const skillLevelList = Object.values(skill.description) as string[];
  const maxSkillLevel = skillLevelList.length - 1;

  return (
    <div className="flex flex-col rounded-2xl bg-blue-900 p-4 shadow-blue-900 drop-shadow-md">
      <h3 className="mb-1 text-base font-bold">{skill.name}</h3>
      <p className="mb-2 text-sm font-medium text-orange">{skill.type}</p>
      <p
        className="flex-grow text-base/snug [&>[data-tooltip-id='tooltip-skill']]:cursor-pointer [&>[data-tooltip-id='tooltip-skill']]:underline [&>span]:font-bold"
        dangerouslySetInnerHTML={{
          __html: skillLevelList[Math.round(initialSkill)],
        }}
      />
      {skillLevelList.length > 1 && (
        <div className="mt-4">
          <span className="mr-2">Уровень: {Math.round(initialSkill) + 1}</span>
          <p className="inline space-x-1">
            <input
              className="range-white range range-xs"
              type="range"
              min={0}
              max={maxSkillLevel}
              value={initialSkill}
              step={0.0001}
              onChange={(e) => setInitialSkill(Number(e.target.value))}
            />
          </p>
        </div>
      )}
    </div>
  );
};
