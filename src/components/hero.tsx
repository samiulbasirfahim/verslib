import { Pill } from "./pill";

export function Hero() {
    return (
        <div className="items-center flex flex-col py-8 gap-12">
            <button className="border-foreground border-1 bg-muted-background/60 px-4 py-2 rounded-4xl text-foreground cursor-pointer">
                Design Smarter & Build Faster
            </button>

            <h2 className="text-center text-5xl w-full max-w-2xl text-foreground font-black leading-[58px] top-bottom-gradient">
                Ready-to-Use Figma Designs for a Faster Workflow
            </h2>

            <div className="w-full max-w-lg justify-center flex relative">
                <input
                    className="border-1 border-muted-foreground text-xl bg-muted-background rounded-4xl py-2 ps-3 w-full"
                    placeholder="Search"
                />

                <button className="cursor-pointer">
                    <img
                        src="/public/search_icon.png"
                        className="absolute top-1/2 -translate-y-1/2 right-3"
                    />
                </button>
            </div>

            <div className="flex items-center justify-center w-full gap-2 max-w-lg flex-wrap">
                <Pill text="Components" />
                <Pill text="Header" />
                <Pill text="Features" />
                <Pill text="Navigation" />
                <Pill text="FAQs" />
                <Pill text="Testimonial" />
                <Pill text="Image Grid" />
                <Pill text="Components" />
                <Pill text="Header" />
                <Pill text="Features" />
                <Pill text="Navigation" />
                <Pill text="FAQs" />
                <Pill text="Testimonial" />
                <Pill text="Image Grid" />
            </div>
        </div>
    );
}
