import { TInventoryItem } from "@/app/types/product";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import Container from "@/app/ui/container/container";
import GalleryDetails from "./gallery-details";
import ImageGallery from "./image-gallery";
// import "./single-product.css";

const galleryProduct: TInventoryItem = {
  _id: 1,
  slug: "wheel-1",
  title: {
    brand: "American Force AFW 09",
    model: "Caesar Chrome",
    subtitle: "20X12-51MM",
  },
  category: {
    title: "Wheels",
    slug: "wheels",
  },
  price: 1699.0,
  description:
    "These Factory Reproductions FR52 wheels feature a Chrome finish and are sure to make your ride stand out! This particular wheel setup is in 22x9.5 with a 44 offset. The Factory Reproductions FR52 is a One Piece Alloy wheel that features exposed lugs. These beautiful 6 spoke wheels are available in a 6x135 configuration and will be sure to elevate the look of your vehicle build!",
  item_image: "/images/gallery/image1.jpeg",
  gallery_images: [
    "/images/gallery/image2.jpeg",
    "/images/gallery/image3.jpeg",
    "/images/gallery/image4.jpeg",
  ],
  item_promo: "Save up to $68.96 When Adding Tires to Package",
  item_shipping: "In Stock & free quick delivery as fast as",
  delivery_date: "Tue, Jan 21",
  specifications: {
    partNumber: "AFW09C20X12-51",
    color: "Chrome",
    backspacing: "6.98",
    offset: "+44",
    wheelDiameter: "22",
    wheelWidth: "9.5",
    hubBore: "87.10",
    wheelExposedLugs: "Yes",
    wheelMaterial: "Alloy",
    weight: "45.00",
    wheelStructure: "One Piece",
    wheelSpokeNumber: "6",
    boltPatterns: "6x135",
    trueDirectional: "No",
    otherColors: [
      "Gloss Black with Machined Spoke Faces and Outer Lip",
      "Chrome",
      "Gloss Black",
    ],
  },
};

const SingleProduct = async ({
  params,
}: {
  params: Promise<{ singleProduct: string }>;
}) => {
  const { singleProduct } = await params;
  console.log("singleProduct == ", singleProduct);

  return (
    <>
      <div className="p-2">
        <Breadcrumb>
          <Item href={"/"}>Home</Item>
          <Item href={"/ktc-audio-gallery"}>ktc-audio-gallery</Item>
          <Item href={"/ktc-audio-gallery"}> {singleProduct} </Item>
        </Breadcrumb>
      </div>
      <Container>
        <div className="w-full flex flex-col mx-auto gap-4 mt-4 sm:p-4">
          <div className="w-full">
            <ImageGallery product={galleryProduct} />
          </div>
          <div className="px-2">
            <p className="text-4xl font-medium">
              {galleryProduct.title?.brand}
            </p>
            <p className="font-medium">
              {galleryProduct.title?.model} | {galleryProduct.title?.subtitle}
            </p>
          </div>
          <GalleryDetails product={galleryProduct} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
