import React, { ReactNode } from "react";
import { Header } from "shared/ui/header";
import clsx from "clsx";
import { Footer } from "shared/ui/footer";
import { Tooltip } from "react-tooltip";
import { paths } from "features/tooltips/model/paths";
import { elements } from "features/tooltips/model/elements";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Layout = ({ children, className }: Props) => {
  return (
    <div className="flex h-full min-h-screen w-full flex-col text-white">
      <Header className={className} />
      <main className={clsx("flex-grow bg-blue-950", className)}>
        {children}
      </main>
      <Footer className={className} />
      {paths.map((path) => (
        <Tooltip key={path.id} id={path.id} render={() => path.content} />
      ))}
      {elements.map((element) => (
        <Tooltip
          key={element.id}
          id={element.id}
          render={() => element.content}
        />
      ))}
    </div>
  );
};
