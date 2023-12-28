import { cva, VariantProps } from "class-variance-authority";
import React, { HTMLAttributes } from "react";

const badge = cva(
  [
    "text-white px-1 py-0.5 flex justify-center items-center text-[8px] w-fit min-w-[15px] rounded-lg absolute font-bold",
  ],
  {
    variants: {
      intent: {
        red: ["bg-badge-red/50"],
        green: ["bg-badge-green/50"],
        yellow: ["bg-badge-yellow/50"],
      },
      pos: {
        "bottom-right": ["right-0", "bottom-0"],
      },
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badge> {}

export const Badge = ({
  className,
  intent,
  children,
  pos,
  ...props
}: BadgeProps) => (
  <div className={badge({ intent, pos, className })} {...props}>
    {children}
  </div>
);
