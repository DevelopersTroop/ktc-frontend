export const BlogPageSidebarSkeleton: React.FC = () => {
    return (
        <div className="col-span-4 flex flex-col gap-y-6">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="shadow-md flex flex-col gap-y-4 rounded-md">
                    <div className="h-[200px] bg-gray-200 animate-color-pulse"></div>
                    <div className="px-4 py-4">
                        <div className="h-6 bg-gray-200 animate-color-pulse w-3/4 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
