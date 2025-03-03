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

  if(loading) return (
    <div className="my-20">
      <LoadingSpinner />
    </div>
  )

  // console.log("wishlist === ", wishListData);

  return (
    <div>
      <div className="hidden md:block">
        <table className="min-w-full bg-white border-x border-b p-8">
          <thead>
            <tr className="text-start">
              <th className="py-5 px-24 border-b text-start uppercase text-bold">
                Name
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Category
              </th>
              <th className="py-5 px-4 border-b text-start uppercase text-bold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {wishListData.length > 0 ? (
              wishListData.map((product) => (
                <tr key={product?.wishlist_id}>
                  <td className="py-5 px-4 border-b">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div
                        className="w-[100px] overflow-hidden whitespace-nowrap text-ellipsis hover:cursor-pointer"
                        title={product?.item_image}
                      >
                        <img src={
                            product?.item_image !== ""
                              ? product.item_image
                              : "/not-available.webp"
                          } 
                          alt={product?.title} 
                        />
                      </div>
                      <Link href={`/collections/product/${product.slug}?wishlist_id=${product?.wishlist_id}`}>
                        <p className="text-primary"> {product?.title} </p>
                      </Link>
                    </div>
                  </td>
                  <td className="py-5 px-4 border-b">{product?.category}</td>
                  <td className="py-5 px-4 border-b">
                    <button onClick={() => handleOnclick(product?.wishlist_id)} >
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
                    className="py-5 px-4 border-b text-center text-gray-500"
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
        <div className="block text-xs min-[390px]:text-base  md:hidden ">
          {wishListData.map((product) => (
            <div
              key={product?.wishlist_id}
              className="bg-white text-sm min-[380px]:text-base border border-gray-200 rounded-lg mb-4 p-2 min-[380px]:p-4 shadow-sm"
            >
              <div className="flex justify-center mb-2">
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
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Name</span>
                <span>
                  <Link href={`#`}>
                    <p className="text-primary"> {product?.title} </p>
                  </Link>
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Category</span>
                <span>{product?.category}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500 font-semibold">Actions</span>
                <span>
                  <button onClick={() => handleOnclick(product?.wishlist_id)} >
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
