export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
export const s3BucketUrl = "https://ktc-stage-s3.s3.us-east-1.amazonaws.com";
export const getCategories = async () => {
  const response = await fetch(`${apiBaseUrl}/categories/list`);
  const {
    data: { categories },
  } = await response.json();
  return categories;
};
