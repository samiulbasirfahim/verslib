import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    staleTime: 0,
    queryFn: () =>
      fetcher({
        endpoint: "/categories/",
        options: {
          method: "GET",
        },
      }),
  });
}
