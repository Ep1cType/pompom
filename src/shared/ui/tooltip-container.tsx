"use client";

import { Tooltip } from "react-tooltip";

import { skills } from "features/tooltips/model/skills";

import { CharacterSkillList } from "shared/api/character/type";

export const TooltipContainer = () => {
  return (
    <>
      <Tooltip id="tooltip-info" />
      <Tooltip
        id="tooltip-skill"
        render={({ content }) => (
          <p
            className="max-w-[300px]"
            dangerouslySetInnerHTML={{
              __html: skills[content as CharacterSkillList],
            }}
          />
        )}
      />
    </>
  );
};
