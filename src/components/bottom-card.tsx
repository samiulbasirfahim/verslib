export function BottomCard() {
    return (
        <div className="container mx-auto bg-[url(/public/bottom_card_bg.png)] rounded-2xl bg-muted-background bg-cover mb-8">
            <div className="p-8 flex-col items-center justify-center gap-6 w-full flex">
                <h3 className="text-center text-5xl w-full max-w-2xl text-foreground font-black leading-[58px] left-right-gradient">
                    Join our community and claim free products
                </h3>
                <p className="text-muted-foreground w-full max-w-2xl text-center">
                    No Spam. Only sweet content and updates of our products. Join 55,000+
                    other creators in our community
                </p>

                <div className="w-full max-w-md justify-center flex relative">
                    <input
                        className="border-1 border-muted-foreground text-xl bg-muted-background rounded-4xl py-2 ps-3 w-full"
                        placeholder="Email address..."
                    />

                    <button className="cursor-pointer bg-primary text-foreground font-semibold rounded-4xl px-6 absolute py-2 text-xl top-1/2 -translate-y-1/2 right-[1px]">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
