import { useEffect, useState } from "react";
import { SVGpreview } from "../components/svg-preview";
import Text from "../components/text";
import Button from "../components/button";
import { Link } from "react-router";
import { Pill } from "../components/pill";
import { useGetCategories } from "../lib/queries/category";
import { useGetComponents } from "../lib/queries/components";
import { useInView } from "react-intersection-observer";

type Category = {
  id: number;
  name: string;
  image: string;
  category: number;
};

type Component = {
  id: number;
  name: string;
  image: string;
  category: number;
};

export default function ExplorePage() {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  const { data: categoriesData, isPending: categoriesLoading } =
    useGetCategories();

  useEffect(() => {
    console.log(categoriesData);
  }, [categoriesData]);

  const {
    data: componentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: componentsLoading,
    error: componentsError,
  } = useGetComponents(selected);

  // Intersection observer for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  // Trigger next page when bottom reached
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const toggleCategory = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((c) => c !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // Flatten components data for easier handling
  const allComponents =
    componentsData?.pages.flatMap((page) => page.results) ?? [];

  // Filter components based on search text
  const filteredComponents = allComponents.filter((comp: Component) =>
    comp.name.toLowerCase().includes(text.toLowerCase()),
  );

  return (
    <div>
      <div className="flex flex-row gap-4">
        {/* Sidebar */}
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

          {/* Selected Categories */}
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

          {/* Available Categories */}
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

          {/* Components Grid */}
          <div className="pr-8 pt-8 pb-8">
            {/* Loading State for Initial Load */}
            {componentsLoading && allComponents.length === 0 && (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
                <Text className="ml-2">Loading components...</Text>
              </div>
            )}

            {/* Error State */}
            {componentsError && (
              <div className="text-center p-8">
                <Text className="text-red-600 mb-4">
                  Error loading components: {componentsError.message}
                </Text>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </div>
            )}

            {/* Components Grid */}
            {filteredComponents.length > 0 && (
              <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4">
                {filteredComponents.map((comp: Component, index: number) => (
                  <SVGpreview
                    key={comp.id}
                    not_allowed={false}
                    favourite={false}
                    url={comp.image}
                    name={comp.name}
                  />
                ))}
              </div>
            )}

            {/* No Results State */}
            {!componentsLoading && allComponents.length === 0 && (
              <div className="text-center p-8">
                <Text className="text-muted-foreground">
                  No components found. Try adjusting your filters.
                </Text>
              </div>
            )}

            {/* No Search Results */}
            {text &&
              filteredComponents.length === 0 &&
              allComponents.length > 0 && (
                <div className="text-center p-8">
                  <Text className="text-muted-foreground">
                    No components match "{text}". Try a different search term.
                  </Text>
                </div>
              )}
          </div>

          {/* Infinite Scroll Trigger & Loading States */}
          {allComponents.length > 0 && (
            <div ref={ref} className="flex justify-center p-4">
              {isFetchingNextPage && (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-foreground"></div>
                  <Text>Loading more components...</Text>
                </div>
              )}
              {!hasNextPage && !isFetchingNextPage && (
                <Text className="text-muted-foreground">
                  🎉 You've seen all {allComponents.length} components!
                </Text>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
