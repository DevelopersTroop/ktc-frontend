export type TInventoryItem = {
  title: string;
  slug: string;
  thumbnail: string;
  price: number;
  stockQuantity: number;
  galleryImages: string[];
  brand: string;
  model: string;
  partNumber: string;
  color: string;
  backspacing: string;
  offset: string;
  diameter: string;
  width: string;
  hubBore: string;
  loadRating: string;
  wheelExposedLugs: "Yes" | "No";
  wheelMaterial: string;
  weight: string;
  wheelStructure: string;
  wheelSpokeNumber: number;
  boltPatterns: string[];
  trueDirectional: "Yes" | "No";
  relatedVideos: string[];
  createdBy: string | null;
  updatedBy: string;
  deletedBy: string | null;
  isDelete: boolean;
  deletedAt: string | null;
  wheel_size?:string
  finish?:string
  _id: string;
  createdAt: string;
  updatedAt: string;
};
export type GProduct = {
  id: number;
  slug: string;
  ymm: {
    title: string;
    model: string;
  };
  image: string;
  wheel: {
    title: string;
    size: string;
  };
  tire: {
    title: string;
    size: string;
  };
};
