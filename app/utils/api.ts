export const apiBaseUrl = "https://api.stage.developertroop.com/api/v1"
export const s3BucketUrl = "https://stage-amani-forged.s3.us-east-2.amazonaws.com"
export const getCategories = async () => {
    const response = await fetch(`${apiBaseUrl}/categories/list`);
    const {data: {categories}} = await response.json(); 
    return categories;
}