import { TInventoryItem } from "@/app/types/product";
import Container from "@/app/ui/container/container";
import Accessory from "./_accessory/accessory";
import Suspension from "./_suspension/suspension";
import Tire from "./_tire/tire";
import Wheels from "./_wheels/wheels";
import "./single-product.css";

const wheelProduct: TInventoryItem = {
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
  item_image: "/images/wheels/wheels1.png",
  gallery_images: [
    "/images/wheels/wheels5.png",
    "/images/wheels/wheels6.png",
    "/images/wheels/wheels7.png",
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

const tireProduct: TInventoryItem = {
  _id: 1,
  slug: "tire",
  title: {
    brand: "Venom Power",
    model: "Terra Hunter X/T",
    size: "33x12.50R20LT (Load E)",
  },
  category: {
    title: "tire",
    slug: "tire",
  },
  price: 1209.72,
  description: "",
  item_image: "/images/tires/tire1.webp",
  gallery_images: ["/images/tires/tire2.webp", "/images/tires/tire3.webp"],
  item_promo: "Save up to $68.96 When Adding Tires to Package",
  item_shipping: "In Stock & free quick delivery as fast as",
  delivery_date: "Tue, Jan 21",
  specifications: {
    inventoryNumber: "TVPXT04",
    aspectRatio: "12.5",
    inflatedDiameter: "33",
    inflatedWidth: "12.5",
    loadIndex: "114",
    loadRange: "E",
    ply: "10",
    sectionWidth: "33",
    serviceDescription: "114R",
    sidewall: "Black Side Wall",
    speedIndex: "R",
    tireRimDiameter: "20",
    tireType: "Hybrid AT/MT",
    tireType2: "All Terrain",
    weight: "65.4 lbs",
    warranty: "50K mileage warranty",
  },
};

const suspensionProduct: TInventoryItem = {
  _id: 1,
  slug: "suspension",
  title: {
    subtitle: "Rough Country M1 Shock Shaft Protector | Pair",
  },
  category: {
    title: "Suspension",
    slug: "suspension",
  },
  price: 19.95,
  description:
    "Added Protection and Durable Construction. Protect your Rough Country M1 Monotube shocks with Rough Country's M1 Shock Shaft Protectors. This innovative two-piece design is constructed of a durable high-quality UV-resistant polypropylene thermoplastic material that is built to protect our inverted shock design from rocks and debris. Installation. With a simple clamp-on design, installation couldn't be easier. Simply use the supplied hardware and you're good to go! With an estimated timeframe of 10-15 minutes, these protectors can be installed at home using standard tools and can be completed efficiently and quickly! Limited Lifetime Replacement Warranty. Rough Country's M1 Shock Shaft Protectors is backed with a limited lifetime replacement warranty towards manufacturer defects. As such, the product is protected from structural and workmanship damage after the date of purchase. With our industry-leading warranty give yourself peace of mind when using Rough Country's Suspension products!",
  item_image: "/images/suspension/suspension1.webp",
  gallery_images: [
    "/images/suspension/suspension2.webp",
    "/images/suspension/suspension3.webp",
    "/images/suspension/suspension4.webp",
  ],
  delivery_date: "Saturday, Jan 18",
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
  features: [
    "2-Piece Design for Easy Installation",
    "Made of Durable, UV Resistant Polypropylene Thermoplastic Material",
    "Only fits Rough Country M1 Shock Line",
    "Protects inverted shock shaft from rocks and debris",
    "Clears shock body during compression",
  ],
  notes: ["Sold as a pair.", "Does NOT fit M1 shocks with stem on rod end."],
};

const accessoryProduct: TInventoryItem = {
  _id: 1,
  slug: "accessories",
  title: {
    subtitle: "Body Armor 4x4 Back bone Hitch Skid",
  },
  category: {
    title: "Accessories",
    slug: "accessories",
  },
  price: 132.99,
  description: "",
  item_image: "/images/accessories/accessories1.webp",
  gallery_images: [
    "/images/accessories/accessories2.webp",
    "/images/accessories/accessories3.webp",
    "/images/accessories/accessories4.webp",
  ],
  delivery_date: "Wednesday, Jan 22",
  specifications: {
    partNumber: "13243546",
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
  features: [
    "Easy to install, no tools required",
    "Protect your hitch, trailer wiring and rear bumper",
    "Adds a secure non-slip step to your vehicle",
    "Provides a reliable recovery point",
    "Black e-coat finish",
  ],
  notes: ["Sold as a pair.", "Does NOT fit M1 shocks with stem on rod end."],
};

const SingleProduct = async ({
  params,
}: {
  params: Promise<{ singleProduct: string }>;
}) => {
  const { singleProduct } = await params;
  console.log("singleProduct == ", singleProduct);

  let productBasedOnCategory = <></>;
  if (singleProduct === "wheels") {
    productBasedOnCategory = <Wheels product={wheelProduct} />;
  } else if (singleProduct === "tire") {
    productBasedOnCategory = <Tire product={tireProduct} />;
  } else if (singleProduct === "suspension") {
    productBasedOnCategory = <Suspension product={suspensionProduct} />;
  } else if (singleProduct === "accessories") {
    productBasedOnCategory = <Accessory product={accessoryProduct} />;
  } else {
    productBasedOnCategory = <Wheels product={wheelProduct} />;
  }
  return <Container>{productBasedOnCategory}</Container>;
};

export default SingleProduct;
