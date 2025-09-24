import { useState } from "react";
import { SVGpreview } from "../components/svg-preview";
import Text from "../components/text";
import Button from "../components/button";
import { Link } from "react-router";
import { Pill } from "../components/pill";

const categories = [
    "Components",
    "Header",
    "Features",
    "Navigation",
    "FAQs",
    "Testimonial",
    "Image Grid",
];

export default function ExplorePage() {
    const svg = "http://localhost:8080/test-svg.svg";
    const svg1 = "http://localhost:8080/block-1.svg";
    const svg2 = "http://localhost:8080/block-2.svg";

    const [text, setText] = useState("");

    const [selected, setSelected] = useState<string[]>([]);

    const toggleCategory = (cat: string) => {
        if (selected.includes(cat)) {
            setSelected(selected.filter((c) => c !== cat));
        } else {
            setSelected([...selected, cat]);
        }
    };

    return (
        <div>
            <div className="flex flex-row gap-4">
                <aside className="w-1/5 h-screen sticky top-0 bg-muted-background">
                    <div className="flex items-center gap-2 border-b-1 p-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-8 text-foreground"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                            />
                        </svg>
                        <Text variant="sub-title" className="text-foreground">
                            FILTER
                        </Text>
                    </div>
                    <div className="p-4 pb-0 flex items-center justify-between">
                        <Text className="text-xl text-foreground">Categories</Text>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </div>
                    {selected.length > 0 && (
                        <div className="flex flex-wrap gap-2 p-4 border-muted-foreground/40 border-b-1">
                            {selected.map((cat) => (
                                <Pill
                                    key={cat}
                                    text={cat}
                                    selected={true}
                                    onClick={() => toggleCategory(cat)}
                                />
                            ))}
                        </div>
                    )}

                    <div className="flex items-start justify-start w-full gap-2 max-w-lg flex-wrap p-4">
                        {categories
                            .filter((cat) => !selected.includes(cat))
                            .map((cat) => (
                                <Pill
                                    key={cat}
                                    text={cat}
                                    selected={false}
                                    onClick={() => toggleCategory(cat)}
                                />
                            ))}
                    </div>
                </aside>
                <div className="gap-4 justify-center w-4/5">
                    <div className="w-full h-22 sticky top-0 bg-background z-100 flex justify-between items-center gap-4 pr-8">
                        <Link to={"/"}>
                            <img width={50} src="/public/logo.svg" className="cursor-pointer" />
                        </Link>
                        <input
                            placeholder="Search components, elements..."
                            className="border-0 text-xl outline-0 flex-1"
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                        />

                        {text.length > 0 && (
                            <Button onClick={() => setText("")}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="size-8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                            </Button>
                        )}
                    </div>
                    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4 pr-8 pt-8 pb-8">
                        <SVGpreview not_allowed={false} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg} />
                        <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                        <SVGpreview not_allowed={true} favourite={false} url={svg2} />
                    </div>
                </div>
            </div>
        </div>
    );
}
