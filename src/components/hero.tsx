import { Link, useNavigate } from "react-router";
import { Pill } from "./pill";
import { useGetCategories } from "../lib/queries/category";
import { useState } from "react";

type Category = {
    id: number;
    name: string;
    image: string;
    category: number;
};

export function Hero() {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const { data: categories, isPending: categoriesLoading } = useGetCategories();

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
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    className="border-1 border-muted-foreground text-xl bg-muted-background rounded-4xl py-2 ps-3 w-full"
                    placeholder="Search"
                    onSubmit={() => navigate("/explore?&text=" + text)}
                />

                <button
                    className="cursor-pointer"
                    onClick={() => navigate("/explore?&text=" + text)}
                >
                    <img
                        src="/search_icon.png"
                        className="absolute top-1/2 -translate-y-1/2 right-3"
                    />
                </button>
            </div>

            <div className="flex items-center justify-center w-full gap-2 max-w-lg flex-wrap">
                {categoriesLoading ? (
                    <div>Loading...</div>
                ) : categories && ((categories as any).results as []).length > 0 ? (
                    ((categories as any).results as Category[]).map((cat) => (
                        <Link to={"/explore?category=" + cat.id}>
                            <Pill key={cat.id} text={cat.name} selected={true} />
                        </Link>
                    ))
                ) : null}
            </div>
        </div>
    );
}
