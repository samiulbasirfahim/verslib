import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";

export function useGetFiles({ limit = 10, offset = 0, body = {} } = {}) {
    return useQuery({
        queryKey: ["files", limit, offset, body],
        staleTime: 0,
        queryFn: () =>
            fetcher({
                endpoint: `/files/?limit=${limit}&offset=${offset}`,
                options: {
                    method: "POST",
                    body,
                },
            }),
    });
}
