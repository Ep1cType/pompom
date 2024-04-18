"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import { Icon } from "shared/ui/icon";
import { NavLink } from "shared/ui/navlink";

type Props = {
  className?: string;
};

export const Header = ({ className }: Props) => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    onClose();
  }, [pathname]);

  const onOpen = () => {
    setIsMenuOpen(true);
  };

  const onClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={clsx("flex min-h-16 items-center bg-blue-900", className)}>
      <div className="container mx-auto flex items-center justify-between px-4 md:justify-normal">
        <div className="flex w-1/2 items-center justify-start">
          <Link href={"/"} className="btn-ghost btn text-lg normal-case md:text-xl">
            pom-pom.pro
          </Link>
        </div>
        <div className="flex md:flex-shrink-0">
          <button className="md:hidden" onClick={onOpen}>
            <Icon className="h-8 w-8 text-white" name="hamburger" section="hamburger" />
          </button>
          <nav
            className={clsx(
              "fixed inset-0 z-10 flex flex-col bg-blue-900 px-4 transition-all md:static md:translate-x-0 md:px-0 ",
              isMenuOpen ? "translate-x-0" : "translate-x-full",
            )}
          >
            <div className="flex justify-end pt-4 md:hidden">
              <button onClick={onClose}>
                <Icon className="h-8 w-8 text-white " name="close" section="close" />
              </button>
            </div>
            <ul className="flex flex-col gap-5 px-1  md:inline-flex md:flex-row md:gap-0">
              {headerItems.map((item, index) => (
                <li key={index} className="">
                  <NavLink
                    className="block rounded-xl px-4 py-3 hover:bg-blue-950/30 md:inline"
                    prefetch={false}
                    activeClassName="bg-blue-950/60"
                    href={item.link}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
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
