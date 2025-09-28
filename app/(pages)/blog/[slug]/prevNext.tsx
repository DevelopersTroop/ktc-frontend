import { useGetBlogsQuery } from "@/app/globalRedux/api/blog"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

export const PrevNext: React.FC<{ slug: string }> = ({ slug }) => {
    const { data } = useGetBlogsQuery({ size: 10, page: 1, sort: [{ "whom": "updatedAt", "order": "desc" }] })

    const prevNextBlog = useMemo(() => {
        if (data?.posts) {
            const index = data.posts.findIndex((blog) => blog.slug === slug)
            return {
                prev: data.posts[index - 1],
                next: data.posts[index + 1]
            }
        }
    }, [slug, data?.posts])
    return (
        <div className="flex flex-col lg:flex-row w-full justify-between gap-4 py-6">
            <div className="w-full border-b lg:border-none">
                {
                    prevNextBlog?.prev && (
                        <Link href={`/blog/${prevNextBlog.prev.slug}`}>
                            <div className="flex items-center justify-start gap-2 text-muted">
                                <ChevronLeft size={52} />
                                <div>
                                    <h3 className="font-medium  text-base">Prev</h3>
                                    <p className="text-muted text-sm">{prevNextBlog.prev.title}</p>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>
            <div className="w-full lg:border-l">
                {
                    prevNextBlog?.next && (
                        <Link href={`/blog/${prevNextBlog.next.slug}`}>
                            <div className="flex items-center justify-end gap-2 text-muted">
                                <div className="">
                                    <h3 className="font-medium  text-base">Next</h3>
                                    <p className="text-muted text-sm">{prevNextBlog.next.title}</p>
                                </div>
                                <ChevronRight size={52} />
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}