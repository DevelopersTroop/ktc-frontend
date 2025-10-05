"use client"
import { cn } from '@/lib/utils';
import { Search, SearchIcon, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import SearchSuggestion from './search-suggestion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


// HeaderSearchButton Component
// This component renders a search button that opens a search bar for users to search for wheels.
const HeaderSearchButton: React.FC<{
    isHomepage: boolean;
    'aria-label'?: string;
}> = ({ isHomepage, 'aria-label': ariaLabel }) => {
    const [open, setOpen] = React.useState(false); // State to manage the visibility of the search bar

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        setOpen(true);
    }
    // press esc to close the search bar
    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setOpen(false);
        }
    }

    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            search: ""
        }
    });

    useEffect(() => {
        if (open) {
            // Focus the input when search is opened
            const input = document.querySelector('input[name="search"]');
            if (input) {
                (input as HTMLInputElement).focus();
            }
            // press esc to close the search bar
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [open]);

    const onSubmit = (data: { search: string }) => {
        // if (data.search.trim() !== "") {
        //     console.log("Search submitted:", data.search.trim());
        // }
    };

    const searchInput = watch("search");

    return (
        <>
            {/* Render the search bar if `open` is true */}
            {open && <div >
                {/* Overlay to close the search bar when clicked */}
                <button
                    onClick={() => setOpen(false)}
                    className='bg-gray-900/20 border-none cursor-default h-screen w-full fixed top-0 left-0 overflow-hidden'
                    aria-label="Close search overlay"
                ></button>
                {/* Search bar container */}

                <div className='bg-white h-20 z-[150] fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl'>
                    <form className=' h-full flex items-center border-b border-gray-300' onSubmit={handleSubmit(onSubmit)}>
                        <div className='w-full h-full'>
                            <Controller
                                name="search"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder='Search Wheel'
                                        className='px-10 font-medium bg-white text-2xl h-full border-none focus:outline-none w-full'
                                        aria-label="Search for wheels and products"
                                    />
                                )}
                            />
                        </div>
                        {/* Submit button */}
                        <div className='w-max h-full px-10 flex gap-4 items-center'>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className='h-full flex items-center'
                                aria-label="Close search"
                            >
                                <X className='text-3xl h-full text-btext' />
                            </button>
                            <button
                                type="button"
                                className="h-full flex items-center"
                                aria-label="Submit search"
                            >
                                <SearchIcon className="text-3xl h-full text-black" />
                            </button>
                        </div>
                    </form>
                    {/* Search results as a list of links like suggestion which contain a link, image, title and price */}
                    <SearchSuggestion setOpen={setOpen} searchInput={searchInput} />
                </div>
            </div>}
            {/* Search button */}
            <div onClick={onClick}>
                <div>
                    <form
                        className=" h-full flex items-center"
                    >
                        {/* <div className='w-full h-full'>
                            <input
                                ref={ref}
                                type="text"
                                placeholder='Search Wheel'
                                className='px-10 font-medium bg-white text-2xl h-full border-none focus:outline-none w-full'
                                name="search"
                                id="search"
                                onChange={formik.handleChange}
                                value={formik.values.search}
                            />
                        </div>
                        <div className='w-max h-full'>
                            <button type="submit" className='h-full flex items-center px-10'>
                                <CiSearch className='text-3xl h-full text-btext' />
                            </button>
                        </div> */}  
                            <div className="fixed inset-0 z-50 bg-white lg:hidden">
                                <div className="flex items-center gap-2 p-4">
                                    <Input
                                        type="text"
                                        placeholder="Search wheels"
                                        name="search"
                                        id="search"
                                        className="flex-1"
                                    />
                                    <Button
                                        variant="ghost"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        <div className="mx-4 hidden max-w-xl flex-1 lg:flex">
                            <div className="relative flex-1">
                                <Input
                                    type="text"
                                    placeholder="Search wheels"
                                    className="w-full pl-4 pr-10"
                                />
                                <Button
                                    type="submit"
                                    className="absolute bottom-0 right-0 top-0 px-3"
                                    variant="ghost"
                                >
                                    <Search className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                        >
                            <Search className="h-8 w-8 text-3xl" />
                        </Button>
                    </form>
                </div>
            </div>
            {/* <button 
                onClick={onClick} 
                className='border-none foucs:outline-none'
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Search"
                data-tooltip-place="top"
                aria-label={ariaLabel || "Search products and content"}
            >
                <CiSearch className={cn('text-2xl stroke-[0.5]', isHomepage ? 'text-white' : 'text-black')} />
            </button> */}
        </>
    );
};

export default HeaderSearchButton; // Export the component as the default export