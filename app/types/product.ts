export type TInventoryItem = {
    _id: number;
    slug: string;
    title: {
        brand?: string;
        model?: string;
        subtitle?: string;
        size?: string;
    };
    category?: {
        title?: string;
        slug?: string;
    };
    price: number;
    description?: string;
    item_image: string;
    item_promo?: string;
    item_shipping?: string;
    delivery_date?: string;
    tire_type?: string;
    warranty?: string;
    vehicle?: string;
    specifications?: {
        partNumber?: string;
        inventoryNumber?: string;
        aspectRatio?: string;
        inflatedDiameter?: string;
        inflatedWidth?: string;
        loadIndex?: string;
        loadRange?: string;
        ply?: string;
        sectionWidth?: string;
        serviceDescription?: string;
        sidewall?: string;
        speedIndex?: string;
        tireRimDiameter?: string;
        tireType?: string;
        tireType2?: string;
        weight?: string;
        warranty?: string;
        trueDirectional?: string;
        otherColors?: string[];
        color?: string;
        backspacing?: string;
        offset?: string;
        wheelDiameter?: string;
        wheelWidth?: string;
        hubBore?: string;
        wheelExposedLugs?: string;
        wheelMaterial?: string;
        wheelStructure?: string;
        wheelSpokeNumber?: string;
        boltPatterns?: string;
    } | object;
    gallery_images?: string[];
    features?: string[];
    notes?: string[];
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