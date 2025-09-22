import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = {} & ComponentPropsWithoutRef<"input">;

export default function Input({ className, ...props }: Props) {
  return (
    <input
      className={twMerge(
        "border-[1px] py-2 w-full max-w-lg rounded-md border-muted-foreground px-2",
        className,
      )}
      {...props}
    />
  );
}
