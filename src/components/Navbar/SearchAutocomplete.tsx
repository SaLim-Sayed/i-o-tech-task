"use client";

import {
    Autocomplete,
    AutocompleteItem,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import logo from "@/public/logo.png";

interface Product {
    id: number;
    title: string;
    thumbnail: string;
}

export default function SearchAutocomplete(
    {
        setIsMenuOpen,
    }: {
        setIsMenuOpen: (value: boolean) => void;
    }
) {
    const [query, setQuery] = useState("");
     const router = useRouter();

   
const data=[
    {
        id:1,
        title:"Product 1",
        thumbnail:logo
    },
    {
        id:2,
        title:"Product 2",
        thumbnail:logo
    },
    {
        id:3,
        title:"Product 3",
        thumbnail:logo
    },
    {
        id:4,
        title:"Product 4",
        thumbnail:logo
    },
    {
        id:5,
        title:"Product 5",
        thumbnail:logo
    },
]
    return (
        <div className="max-w-md">
            <Autocomplete
                placeholder="Type to search..."
                inputValue={query}
                onInputChange={(value) => setQuery(value)}
                isLoading={false}
            
                items={data}
                 className="bg-[#4B2615]"
                classNames={{
                    listboxWrapper: "w-full",
                    listbox: "w-full",
                    clearButton: "text-white",
                    selectorButton: "text-white",
                    base: "bg-[#4B2615]  ",
                 }}
                onSelectionChange={(key) => {
                    setIsMenuOpen(false);
                    if (key) {
                        router.push(`/product/${key}`);
                    }
                }}
            >
                {(item) => (
                    <AutocompleteItem key={item.id}>
                        <div className="flex items-center gap-3">
                            <img
                                src={item.thumbnail.src}
                                alt={item.title}
                                className="w-8 h-8 object-cover rounded"
                            />
                            <span>{item.title}</span>
                        </div>
                    </AutocompleteItem>
                )}
            </Autocomplete>
        </div>
    );
}
