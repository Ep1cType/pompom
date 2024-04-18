import React, { ReactNode } from "react";

import clsx from "clsx";
import { Tooltip } from "react-tooltip";

import { skills } from "features/tooltips/model/skills";

import { CharacterSkillList } from "shared/api/character/type";
import { Footer } from "shared/ui/footer";
import { Header } from "shared/ui/header";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Layout = ({ children, className }: Props) => {
  return (
    <div className="flex h-full min-h-screen w-full flex-col text-white">
      <Header className={className} />
      <main className={clsx("flex-grow bg-blue-950", className)}>{children}</main>
      <Footer />
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
    </div>
  );
};
