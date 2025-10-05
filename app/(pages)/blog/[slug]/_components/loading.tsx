"use client"
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb"
import Item from "@/app/ui/breadcrumb/item"
import { Clock3, UserCircle } from "lucide-react"

export const ClientLoadingSkeleton: React.FC = () => {
    return (
        <div className="col-span-12 lg:col-span-8 shadow-md py-8 px-4 flex flex-col gap-y-4 rounded-md">
            <div className="flex w-full items-start">
                <Breadcrumb>
                    <Item href={"/"}>Home</Item>
                    <Item href={`/blog`}>
                        Blog
                    </Item>
                    <Item isEnd href={`#`}>
                        <div className="bg-gray-200 animate-color-pulse h-4 w-20 rounded"></div>
                    </Item>
                </Breadcrumb>
            </div>
            {/* Blog Body */}
            <div className="bg-gray-200 animate-color-pulse h-10 w-3/4 rounded"></div>
            <div className="flex gap-4">
                <div className="flex items-center gap-2">
                    <UserCircle size={18} />
                    <span>Amani Forged</span>
                </div>
                <div className="bg-gray-200 animate-color-pulse h-4 w-24 rounded"></div>
                <div className="flex items-center gap-1">
                    <Clock3 size={20} />
                    <div className="bg-gray-200 animate-color-pulse h-4 w-20 rounded"></div>
                </div>
            </div>

            {/* Blog content placeholder */}
            <div className="space-y-4">
                <div className="bg-gray-200 animate-color-pulse h-4 w-full rounded"></div>
                <div className="bg-gray-200 animate-color-pulse h-4 w-full rounded"></div>
                <div className="bg-gray-200 animate-color-pulse h-4 w-3/4 rounded"></div>
                <div className="bg-gray-200 animate-color-pulse h-4 w-full rounded"></div>
                <div className="bg-gray-200 animate-color-pulse h-4 w-5/6 rounded"></div>
                <div className="bg-gray-200 animate-color-pulse h-40 w-full rounded"></div>
                <div className="bg-gray-200 animate-color-pulse h-4 w-full rounded"></div>
                <div className="bg-gray-200 animate-color-pulse h-4 w-2/3 rounded"></div>
            </div>

            {/* Prev Next placeholder */}
            <div className="flex justify-between mt-8">
                <div className="bg-gray-200 animate-color-pulse h-10 w-24 rounded"></div>
                <div className="bg-gray-200 animate-color-pulse h-10 w-24 rounded"></div>
            </div>
        </div>
    )
}