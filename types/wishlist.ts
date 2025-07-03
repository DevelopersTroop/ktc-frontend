export type WishList = {
  _id: string;
  slug: string;
  data: {
    title: string;
    category: string;
    sku: string;
    thumbnail: string;
  };
};
