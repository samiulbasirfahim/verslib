import { useInfiniteQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";

export interface Component {
    id: number;
    name: string;
    image: string;
    category: number;
}

export interface ComponentsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Component[];
}

export function useGetComponents(categories: number[]) {
    return useInfiniteQuery<ComponentsResponse>({
        queryKey: ["components", categories],
        queryFn: async ({ pageParam = 1 }) => {
            return fetcher({
                endpoint: "files/",
                options: {
                    body: {
                        categories,
                        page: pageParam,
                    },
                },
            });
        },
        getNextPageParam: (lastPage, allPages) => {
            // If there's a next URL, return the next page number
            if (lastPage.next) {
                return allPages.length + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
    });
}

// Helper hook for easier data access
export function useComponentsData(categories: number[]) {
    const query = useGetComponents(categories);

    const components = query.data?.pages.flatMap(page => page.results) ?? [];
    const totalCount = query.data?.pages[0]?.count ?? 0;

    return {
        ...query,
        components,
        totalCount,
    };
}
