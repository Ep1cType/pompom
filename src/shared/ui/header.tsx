import React from "react";

import Link from "next/link";

import clsx from "clsx";

import { NavLink } from "shared/ui/navlink";

type Props = {
  className?: string;
};

export const Header = ({ className }: Props) => {
  return (
    <header className={clsx("flex min-h-16 items-center bg-blue-900", className)}>
      <div className="container mx-auto hidden items-center px-4 md:flex">
        <div className="flex w-1/2 items-center justify-start">
          <Link href={"/"} className="btn-ghost btn text-lg normal-case md:text-xl">
            pom-pom.pro
          </Link>
        </div>
        <div className="flex flex-shrink-0">
          <ul className="inline-flex px-1">
            {headerItems.map((item, index) => (
              <li key={index} className="">
                <NavLink
                  className="rounded-xl px-4 py-3 hover:bg-blue-950/30"
                  prefetch={false}
                  activeClassName="bg-blue-950/60"
                  href={item.link}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

const headerItems = [
  {
    title: "Персонажи",
    link: "/characters",
  },
  {
    title: "История прыжков",
    link: "/warp",
  },
  {
    title: "Лента событий",
    link: "/timeline",
  },
];
