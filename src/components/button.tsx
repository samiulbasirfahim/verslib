import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const variants = {
  primary: "text-xl bg-primary py-2 rounded-md px-4",
  link: "bg-transparent underline text-foreground",
  base: "",
};

type Props = {
  variant?: keyof typeof variants;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

export default function Button({
  className,
  children,
  variant = "base",
  ...props
}: Props) {
  return (
    <button
      className={twMerge(["cursor-pointer", variants[variant], className])}
      {...props}
    >
      {children}
    </button>
  );
}
