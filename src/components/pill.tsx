export function Pill({ text }: { text: string }) {
    return (
        <button className="border-foreground border-1 bg-muted-background/60 px-3 py-1 rounded-4xl text-foreground cursor-pointer">{text}</button>
    );
}
