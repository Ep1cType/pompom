import React, { ReactNode } from "react";
import Link from "next/link";

type Props = {
  title: string;
  children: ReactNode;
  link: string;
};

export const NavigationCard = ({ title, children, link }: Props) => {
  return (
    <div className="rounded-2xl bg-blue-900 shadow-info hover:opacity-70">
      <Link className="block p-6 md:p-8" prefetch={false} href={link}>
        <h2 className="mb-2 text-2xl md:mb-4">{title}</h2>
        {children}
        <span className="mt-2 block underline">Перейти</span>
      </Link>
    </div>
  );
};
