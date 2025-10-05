import { useEffect, useState } from "react";
import { SVGpreview } from "../components/svg-preview";
import Text from "../components/text";
import Button from "../components/button";
import { Link, useLocation } from "react-router";
import { Pill } from "../components/pill";
import { useGetCategories } from "../lib/queries/category";
import { useGetFiles } from "../lib/queries/components";
import Masonry from "react-masonry-css";

type Category = {
    id: number;
    name: string;
    image: string;
    category: number;
};

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

export default function ExplorePage() {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    const search = queryParams.get("text");

    const [text, setText] = useState("");
    const [selected, setSelected] = useState<number[]>([]);
    const [page, setPage] = useState(0);
    const limit = 30;

    const [body, setBody] = useState<any>({
        categories: [],
        search: "",
    });

    useEffect(() => {
        if (category) {
            if (Number(category.trim())) setSelected([Number(category.trim())]);
        }
        if (search) {
            setText(search);
        }
    }, [category, search]);

    useEffect(() => {
        setBody({
            search: text,
            categories: selected,
        });
    }, [selected, text]);

    const { data: categoriesData, isPending: categoriesLoading } =
        useGetCategories();

    useEffect(() => {
        console.log(categoriesData);
    }, [categoriesData]);

    const {
        data: filesData,
        isLoading: filesLoading,
        error: filesError,
        isFetching,
    } = useGetFiles({ limit, offset: page * limit, body });

    const toggleCategory = (id: number) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((c) => c !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const allFiles = (filesData as any)?.results ?? [];

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
                            {categoriesData &&
                                ((categoriesData as any).results as []).length > 0
                                ? ((categoriesData as any).results as Category[])
                                    .filter((cat) => selected.includes(cat.id))
                                    .map((cat) => (
                                        <Pill
                                            key={cat.id}
                                            text={cat.name}
                                            selected={true}
                                            onClick={() => toggleCategory(cat.id)}
                                        />
                                    ))
                                : null}
                        </div>
                    )}

                    <div className="flex items-start justify-start w-full gap-2 max-w-lg flex-wrap p-4">
                        {categoriesLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground"></div>
                                <Text>Loading categories...</Text>
                            </div>
                        ) : categoriesData &&
                            ((categoriesData as any).results as []).length > 0 ? (
                            ((categoriesData as any).results as Category[])
                                .filter((cat) => !selected.includes(cat.id))
                                .map((cat) => (
                                    <Pill
                                        key={cat.id}
                                        text={cat.name}
                                        selected={false}
                                        onClick={() => toggleCategory(cat.id)}
                                    />
                                ))
                        ) : null}
                    </div>
                </aside>

                {/* Main Content */}
                <div className="gap-4 justify-center w-4/5">
                    {/* Top Search Bar */}
                    <div className="w-full h-22 sticky top-0 bg-background z-100 flex justify-between items-center gap-4 pr-8">
                        <Link to={"/"}>
                            <img width={50} src="/logo.svg" className="cursor-pointer" />
                        </Link>
                        <input
                            placeholder="Search files..."
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

                    {/* Files Grid */}
                    <div className="pr-8 pt-8 pb-8">
                        {filesLoading && (
                            <div className="flex justify-center items-center p-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
                                <Text className="ml-2">Loading files...</Text>
                            </div>
                        )}

                        {filesError && (
                            <div className="text-center p-8">
                                <Text className="text-red-600 mb-4">
                                    Error loading files: {filesError.message}
                                </Text>
                                <Button onClick={() => window.location.reload()}>Retry</Button>
                            </div>
                        )}

                        {allFiles.length > 0 && (
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
                        )}

                        {!filesLoading && allFiles.length === 0 && (
                            <div className="text-center p-8">
                                <Text className="text-muted-foreground">
                                    No files found. Try adjusting your filters.
                                </Text>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-4 pb-8">
                        <Button
                            disabled={page === 0 || isFetching}
                            className="disabled:text-gray-600"
                            onClick={() => setPage((p) => Math.max(p - 1, 0))}
                        >
                            Previous
                        </Button>
                        <Text className="text-lg">
                            Page {page + 1} of {Math.ceil(((filesData as any)?.count ?? 0) / limit)}
                        </Text>
                        <Button
                            disabled={
                                isFetching || (page + 1) * limit >= ((filesData as any)?.count ?? 0)
                            }
                            className="disabled:text-gray-600"
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
