import { twMerge } from "tailwind-merge";

export function Pill({
    text,
    className = "",
    selected = false,
    onClick,
}: {
    text: string;
    className?: string;
    selected?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={twMerge(
                "border-foreground border-1 px-3 py-1 rounded-xl text-foreground cursor-pointer",
                selected
                    ? "bg-primary/20 text-foreground border-primary"
                    : "bg-muted-background/60 text-foreground",
                className,
            )}
        >
            {text}
        </button>
    );
}
