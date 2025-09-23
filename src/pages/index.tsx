import { BottomCard } from "../components/bottom-card";
import Button from "../components/button";
import { Hero } from "../components/hero";
import { SVGpreview } from "../components/svg-preview";

export default function Page() {
    const svg = "http://localhost:8080/test-svg.svg";
    const svg1 = "http://localhost:8080/block-1.svg";
    const svg2 = "http://localhost:8080/block-1.svg";
    return (
        <div className="flex flex-col items-center">
            <Hero />

            <div className="w-4/5 p-8 gap-4 flex-col flex items-center">
                <div className="grid xl:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4 content-center">
                    <SVGpreview not_allowed={false} favourite={false} url={svg} />
                    <SVGpreview not_allowed={true} favourite={true} url={svg1} />
                    <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                    <SVGpreview not_allowed={true} favourite={false} url={svg} />
                    <SVGpreview not_allowed={true} favourite={true} url={svg2} />
                    <SVGpreview not_allowed={true} favourite={false} url={svg} />
                </div>
                <Button variant="primary" className="max-w-sm w-full">See More</Button>
            </div>
            <BottomCard />
        </div>
    );
}
