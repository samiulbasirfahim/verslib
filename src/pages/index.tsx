import { Link } from "react-router";
import { BottomCard } from "../components/bottom-card";
import Button from "../components/button";
import { Hero } from "../components/hero";
import { useGetFiles } from "../lib/queries/components";
import { SVGpreview } from "../components/svg-preview";
import Masonry from "react-masonry-css";

type FileItem = {
    id: number;
    name: string;
    image: string;
    category: number;
};

const breakpointColumnsObj = {
    default: 4, // 2xl
    1200: 3, // xl
    768: 2, // md
    500: 1, // sm
};

export default function Page() {
    const { data: filesData, isLoading: filesLoading } = useGetFiles({
        limit: 15,
        offset: 0,
        body: {},
    });

    const allFiles = (filesData as any)?.results ?? [];

    return (
        <div className="flex flex-col items-center">
            <Hero />

            <div className="w-4/5 p-8 gap-4 flex-col flex items-center">
                {filesLoading ? (
                    <div>Loading...</div>
                ) : (
                    allFiles.length > 0 && (
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="flex w-auto gap-3"
                            columnClassName="masonry-column"
                        >
                            {allFiles.map((file: FileItem) => (
                                <SVGpreview
                                    id={file.id}
                                    key={file.id}
                                    not_allowed={false}
                                    favourite={false}
                                    url={file.image}
                                    name={file.name}
                                />
                            ))}
                        </Masonry>
                    )
                )}
                <Link to={"/explore"}>
                    <Button variant="primary" className="max-w-sm w-full">
                        See More
                    </Button>
                </Link>
            </div>

            <BottomCard />
        </div>
    );
}
