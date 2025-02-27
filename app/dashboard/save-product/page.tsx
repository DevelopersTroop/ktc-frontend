"use client";
import LoadingSpinner from "@/app/ui/loading-spinner/loading-spinner";
import { apiBaseUrl } from "@/app/utils/api";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type WishListData = {
  wishlist_id: string;
  title: string;
  item_image: string;
  category: string;
  slug: string;
};

type WishListResult = {
  statusCode: number;
  response: boolean;
  message: string;
  data: {
    total: number;
    pages: number;
    wishlists: any;
  };
};

const SaveProduct = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [wishListData, setWishListData] = useState<
    {
      wishlist_id: string;
      title: string;
      item_image: string;
      category: string;
      slug: string;
    }[]
  >([]);

  useEffect(() => {
    if (!user) {
      return router.push("/login");
    }
    (async () => {
      setLoading(true);
      const wishListResponse = await fetch(`${apiBaseUrl}/wishlists/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          sort: [
            {
              whom: "updatedAt",
              order: "desc",
            },
          ],
        }),
      });
      const wishListResult = await wishListResponse.json();
      setLoading(false);
      if (wishListResult?.statusCode === 200) {
        const wishList: WishListData[] = (
          wishListResult as WishListResult
        )?.data?.wishlists.map((wishlist) => {
          return {
            wishlist_id: wishlist?._id,
            title: wishlist?.data?.title,
            item_image: wishlist?.data?.item_image,
            category: wishlist?.data?.category,
            slug: wishlist?.slug,
          };
        });
        setWishListData(wishList);
      }
    })();
  }, []);

  const handleOnclick = async (wishlist_id: string) => {
    // setLoading(true);
    const response = await fetch(
      `${apiBaseUrl}/wishlists/${wishlist_id}?force=true`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    );
    const result = await response.json();

    // setLoading(false);
    if (result?.statusCode === 200) {
      const updatedWishList = wishListData.filter(
        (wishlist) => wishlist.wishlist_id !== wishlist_id,
      );
      setWishListData(updatedWishList);
    }
  };

  if (loading)
    return (
      <div className="my-20">
        <LoadingSpinner />
      </div>
    );

  console.log("wishlist === ", wishListData);

  return (
    <div>
      <div className="hidden md:block">
        <table className="min-w-full border-x border-b bg-white p-8">
          <thead>
            <tr className="text-start">
              <th className="text-bold border-b px-24 py-5 text-start uppercase">
                Name
              </th>
              <th className="text-bold border-b px-4 py-5 text-start uppercase">
                Category
              </th>
              <th className="text-bold border-b px-4 py-5 text-start uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {wishListData.length > 0 ? (
              wishListData.map((product) => (
                <tr key={product?.wishlist_id}>
                  <td className="border-b px-4 py-5">
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                      <div
                        className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap hover:cursor-pointer"
                        title={product?.item_image}
                      >
                        <img
                          src={
                            product?.item_image !== ""
                              ? product.item_image
                              : "/not-available.webp"
                          }
                          alt={product?.title}
                        />
                      </div>
                      <Link
                        href={`/collections/product/${product.slug}?wishlist_id=${product?.wishlist_id}`}
                      >
                        <p className="text-primary"> {product?.title} </p>
                      </Link>
                    </div>
                  </td>
                  <td className="border-b px-4 py-5">{product?.category}</td>
                  <td className="border-b px-4 py-5">
                    <button onClick={() => handleOnclick(product?.wishlist_id)}>
                      <p className="text-primary"> Remove </p>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td
                    colSpan={5}
                    className="border-b px-4 py-5 text-center text-gray-500"
                  >
                    <div className="text-lg font-semibold">
                      You have not Save Product.
                    </div>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Product View for Mobile */}
      {wishListData.length > 0 && (
        <div className="block text-xs min-[390px]:text-base md:hidden">
          {wishListData.map((product) => (
            <div
              key={product?.wishlist_id}
              className="mb-4 rounded-lg border border-gray-200 bg-white p-2 text-sm shadow-sm min-[380px]:p-4 min-[380px]:text-base"
            >
              <div className="mb-2 flex justify-center">
                <img
                  className="w-[150px]"
                  src={
                    product?.item_image !== ""
                      ? product?.item_image
                      : "/not-available.webp"
                  }
                  alt={product?.title}
                />
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold text-gray-500">Name</span>
                <span>
                  <Link href={`#`}>
                    <p className="text-primary"> {product?.title} </p>
                  </Link>
                </span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold text-gray-500">Category</span>
                <span>{product?.category}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-semibold text-gray-500">Actions</span>
                <span>
                  <button onClick={() => handleOnclick(product?.wishlist_id)}>
                    <p className="text-primary"> Remove </p>
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SaveProduct;
