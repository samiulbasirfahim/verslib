import { twMerge } from "tailwind-merge";
import Button from "./button";
import Text from "./text";
import { fetcher } from "../lib/fetcher";
import { useState } from "react";

type Props = {
    url: string;
    favourite: boolean;
    not_allowed?: boolean;
    name: string;
    id: number;
};

export function SVGpreview({
    url,
    favourite,
    name,
    id,
    not_allowed = true,
}: Props) {
    const [fetching, setFetching] = useState(false);

    return (
        <div className="bg-muted-background px-2 pt-4 rounded-sm flex flex-col justify-between group">
            <div className="flex items-center justify-center flex-1">
                <div className="rounded-sm relative overflow-hidden min-h-20 flex items-center">
                    <img src={url} />
                    <div className="bg-black/40 z-10 absolute inset-0 flex-col flex justify-end pb-2 opacity-0 group-hover:opacity-100">
                        <div className="flex justify-center gap-4 z-[99]">
                            <Button
                                onClick={async () => {
                                    setFetching(true);
                                    const response: any = await fetcher({
                                        endpoint: `/files/${id}/copy/`,
                                        options: {
                                            auth: true,
                                            method: "GET",
                                        },
                                    });
                                    console.log(response.code);
                                    navigator.clipboard.writeText(`${response.code}`);
                                    setFetching(false);
                                }}
                                className={twMerge([
                                    "bg-black/80 p-2 rounded",
                                    not_allowed ? "cursor-not-allowed opacity-20" : "",
                                ])}
                            >
                                {fetching ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-dasharray="16"
                                            stroke-dashoffset="16"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 3c4.97 0 9 4.03 9 9"
                                        >
                                            <animate
                                                fill="freeze"
                                                attributeName="stroke-dashoffset"
                                                dur="0.2s"
                                                values="16;0"
                                            />
                                            <animateTransform
                                                attributeName="transform"
                                                dur="1.5s"
                                                repeatCount="indefinite"
                                                type="rotate"
                                                values="0 12 12;360 12 12"
                                            />
                                        </path>
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M6.6 11.397c0-2.726 0-4.089.843-4.936c.844-.847 2.201-.847 4.917-.847h2.88c2.715 0 4.073 0 4.916.847c.844.847.844 2.21.844 4.936v4.82c0 2.726 0 4.089-.844 4.936c-.843.847-2.201.847-4.916.847h-2.88c-2.716 0-4.073 0-4.917-.847s-.843-2.21-.843-4.936z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M4.172 3.172C3 4.343 3 6.229 3 10v2c0 3.771 0 5.657 1.172 6.828c.617.618 1.433.91 2.62 1.048c-.192-.84-.192-1.996-.192-3.66v-4.819c0-2.726 0-4.089.843-4.936c.844-.847 2.201-.847 4.917-.847h2.88c1.652 0 2.8 0 3.638.19c-.138-1.193-.43-2.012-1.05-2.632C16.657 2 14.771 2 11 2S5.343 2 4.172 3.172"
                                            opacity="0.5"
                                        />
                                    </svg>
                                )}
                            </Button>
                            <Button className="bg-black/80 p-2 rounded">
                                {favourite ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6"
                                    >
                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                    </svg>
                                ) : (
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
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                        />
                                    </svg>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <Text variant="sub-title" className="text-white">
                    {name}
                </Text>
                <Text className="text-md text-white/40">
                    Loreml klfdsjalkfjds lkafjdklsjafkl sdafjlksajflkajdkl
                </Text>
            </div>
        </div>
    );
}
