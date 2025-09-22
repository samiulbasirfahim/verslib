import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const variants = {
  title: "text-3xl text-primary",
};

type Props = {
  variant?: keyof typeof variants;
  children: ReactNode;
} & ComponentPropsWithoutRef<"p">;

export default function Text({
  className,
  children,
  variant = "title",
  ...props
}: Props) {
  return (
    <p className={twMerge([variants[variant], "", className])} {...props}>
      {children}
    </p>
  );
}
