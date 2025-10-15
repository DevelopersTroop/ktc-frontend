import StarRating from "./StarRating";
import { useGetReviewsQuery } from "@/app/globalRedux/api/reviews";
import { formatDistanceToNow } from "date-fns";
import { useMemo, useState } from "react";
import ReviewPagination from "./ReviewPagination";
import { WriteAReview } from "./WriteAReview";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

export const Reviews: React.FC<{ productId: string }> = ({ productId }) => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const { isLoading, isFetching, data } = useGetReviewsQuery({
    productId,
    page: 1,
  });
  const getPercentage = useMemo(() => {
    if (!data?.ratingBreakdown || !data.count) {
      return {
        5: "",
      };
    }
    const totalRatings = data?.count || 0;

    const calculateWidthClass = (count: number) => {
      const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
      return `w-[${Math.round(percentage)}%]`;
    };

    return {
      5: calculateWidthClass(data?.ratingBreakdown[5]),
      4: calculateWidthClass(data?.ratingBreakdown[4]),
      3: calculateWidthClass(data?.ratingBreakdown[3]),
      2: calculateWidthClass(data?.ratingBreakdown[2]),
      1: calculateWidthClass(data?.ratingBreakdown[1]),
    };
  }, [data?.ratingBreakdown, data?.count]);
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-xl font-semibold border-b py-1">
                Write your review
              </h2>
            </DialogTitle>
          </DialogHeader>
          <WriteAReview setOpen={setOpen} productId={productId} />
        </DialogContent>
      </Dialog>
      {isLoading || isFetching ? (
        <div>
          {Array.from({ length: 10 }).map((_, id) => {
            return (
              <div
                key={id}
                className="space-y-2 border-b last:border-none animate-pulse"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <div className="w-10 h-10 rounded-full bg-gray-300" />
                  <div className="h-4 bg-gray-300 rounded w-32" />
                </div>

                <div className="space-y-2 ml-10">
                  {/* Star rating placeholders */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-gray-300 rounded" />
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-20" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="bg-gray-500 text-white text-center py-1 my-2">
            <p>Product Reviews ({data?.count})</p>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-30">
            {data?.reviews?.length ? (
              <div className="w-full lg:w-[50%] flex flex-col gap-y-4">
                <div className="text-xl font-semibold">
                  {data?.average}
                  <h2>OUT OF 5</h2>
                  <p className="font-normal text-lg">STARS OVERALL</p>
                </div>
                {data?.reviews.map((review) => {
                  return (
                    <div
                      className="space-y-2 border-b last:border-none py-1"
                      key={review._id}
                    >
                      <p className="flex items-center gap-2 font-semibold">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                          {review.userId.firstName.split("")[0]}
                          {review.userId.lastName.split("")[0]}
                        </div>
                        {review.userId.firstName + " " + review.userId.lastName}
                      </p>
                      <div className="space-y-1 ml-10">
                        <StarRating className="gap-1" rating={review.rating} />
                        <div className="flex justify-between items-center">
                          <p>{review.comment}</p>
                          <p className="text-gray-500">
                            {formatDistanceToNow(review.createdAt, {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full lg:w-[50%] ">
                <p>No reveiws yet</p>
              </div>
            )}
            <div className="w-full lg:w-[50%]">
              <div className="grid grid-cols-1  text-black items-center">
                <div className="space-y-xs pl-[2rem] ">
                  <p className="text-xl font-semibold">Overall Rankings</p>
                  <div className="flex space-x-3 items-center">
                    <div className="w-[3.5rem] flex items-center gap-1">
                      <h3 className="text-[1.5rem] font-semibold text-muted">
                        5
                      </h3>
                      <StarIcon
                        size={20}
                        className="fill-[#ffc107] stroke-[#ffc107] text-xl"
                      />
                    </div>
                    <div className="relative w-full">
                      <div
                        className={`bg-[#FFC107] ${getPercentage[5]} h-4  absolute z-20 top-1/2 -translate-y-1/2 left-0`}
                      />
                      <div
                        className={`bg-gray-400 w-full h-4  absolute top-1/2 -translate-y-1/2 left-0 z-10`}
                      />
                    </div>
                    <div>
                      <p>{data?.ratingBreakdown[5]}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div className="w-[3.5rem] flex items-center gap-1">
                      <h3 className="text-[1.5rem] font-semibold text-muted">
                        4
                      </h3>
                      <StarIcon
                        size={20}
                        className="fill-[#ffc107] stroke-[#ffc107] text-xl"
                      />
                    </div>
                    <div className="relative w-full">
                      <div
                        className={`bg-[#FFC107] ${getPercentage[4]} h-4  absolute z-20 top-1/2 -translate-y-1/2 left-0`}
                      />
                      <div
                        className={`bg-gray-400 w-full h-4  absolute top-1/2 -translate-y-1/2 left-0 z-10`}
                      />
                    </div>
                    <div>
                      <p>{data?.ratingBreakdown[4]}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div className="w-[3.5rem] flex items-center gap-1">
                      <h3 className="text-[1.5rem] font-semibold text-muted">
                        3
                      </h3>
                      <StarIcon
                        size={20}
                        className="fill-[#ffc107] stroke-[#ffc107] text-xl"
                      />
                    </div>
                    <div className="relative w-full">
                      <div
                        className={`bg-[#FFC107] ${getPercentage[3]} h-4  absolute z-20 top-1/2 -translate-y-1/2 left-0`}
                      />
                      <div
                        className={`bg-gray-400 w-full h-4  absolute top-1/2 -translate-y-1/2 left-0 z-10`}
                      />
                    </div>
                    <div>
                      <p>{data?.ratingBreakdown[3]}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div className="w-[3.5rem] flex items-center gap-1">
                      <h3 className="text-[1.5rem] font-semibold text-muted">
                        2
                      </h3>
                      <StarIcon
                        size={20}
                        className="fill-[#ffc107] stroke-[#ffc107] text-xl"
                      />
                    </div>
                    <div className="relative w-full">
                      <div
                        className={`bg-[#FFC107] ${getPercentage[2]} h-4  absolute z-20 top-1/2 -translate-y-1/2 left-0`}
                      />
                      <div
                        className={`bg-gray-400 w-full h-4  absolute top-1/2 -translate-y-1/2 left-0 z-10`}
                      />
                    </div>
                    <div>
                      <p>{data?.ratingBreakdown[2]}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div className="w-[3.5rem] flex items-center gap-1">
                      <h3 className="text-[1.5rem] font-semibold text-muted">
                        1
                      </h3>
                      <StarIcon
                        size={20}
                        className="fill-[#ffc107] stroke-[#ffc107] text-xl"
                      />
                    </div>
                    <div className="relative w-full">
                      <div
                        className={`bg-[#FFC107] ${getPercentage[1]} h-4  absolute z-20 top-1/2 -translate-y-1/2 left-0`}
                      />
                      <div
                        className={`bg-gray-400 w-full h-4  absolute top-1/2 -translate-y-1/2 left-0 z-10`}
                      />
                    </div>
                    <div>
                      <p>{data?.ratingBreakdown[1]}</p>
                    </div>
                  </div>
                  <div className="w-full mt-2">
                    <Button
                      onClick={() => {
                        if (!user?._id) {
                          toast.error("You must login to submit a review");
                        } else {
                          setOpen(true);
                        }
                      }}
                      className="w-full rounded-none bg-white text-black border shadow-none"
                    >
                      Write a review
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {data?.reviews?.length ? (
            <ReviewPagination
              currentPage={data.currentPage}
              onPageChange={setPage}
              totalPages={data.pages}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
