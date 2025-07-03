import SingleProductClient from "./client";

export default async function Page({ params }: { params: Promise<{ singleProduct: string }> }) {
    const { singleProduct } = await params
    return <SingleProductClient singleProduct={singleProduct} />
}