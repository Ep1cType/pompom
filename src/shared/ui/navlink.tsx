"use client";

import React, { PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface Props extends LinkProps {
  activeClassName?: string;
  className?: string;
}

export const NavLink = ({ activeClassName, className, href, children, ...props }: Props & PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <Link className={clsx(className, pathname === href && activeClassName)} href={href} {...props}>
      {children}
    </Link>
  );
};
