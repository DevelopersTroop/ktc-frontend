// Interface for defining the structure of a navigation menu item
export interface NavMenu {
  label: string;
  href?: string;
  children?: NavMenu[];
  target?: "_blank";
  meagMenu?: boolean;
  megaeMenuImage?: {
    href: string;
    src: string;
  };
  megaMenuVideo?: {
    href: string;
    src: string;
  };
}

// Array of navigation menu items
const navMenus: NavMenu[] = [
  {
    label: "Shop Wheels", // Main menu item
    href: "/collections/product-category/wheels", // Link to the wheels category
    meagMenu: true, // Indicates this is part of a mega menu
    children: [
      {
        label: "",
        children: [
          {
            label: "Shop Wheels", // Submenu for custom wheels
            href: "/collections/product-category/wheels",
            children: [
              {
                label: "Shop all wheels",
                href: "/collections/product-category/wheels",
              },
              {
                label: "Shop by brands",
                href: "/brands?query=wheels",
              },
            ],
          },
          {
            label: "Make your wheel and tire packages now",
            href: "/collections/product-category/wheels",
          },
        ],
      },
      {
        label: "",
        megaeMenuImage: {
          href: "#",
          src: "/not-available.webp",
        },
      },
    ],
  },
  {
    label: "Shop Tires",
    href: "/collections/product-category/tires",
    meagMenu: false,
    children: [
      {
        label: "Shop all Tires",
        href: "/collections/product-category/tires",
      },
      {
        label: "All-Season",
        href: "/collections/product-category/tires",
      },
      {
        label: "All-Terrain",
        href: "/collections/product-category/tires",
      },
      {
        label: "Dessert Terrain",
        href: "/collections/product-category/tires",
      },
      {
        label: "Hybrid at/mt",
        href: "/collections/product-category/tires",
      },
      {
        label: "Mud terrain",
        href: "/collections/product-category/tires",
      },
      {
        label: "Shop by brand",
        href: "/brands?query=tires",
      },
    ],
  },
  {
    meagMenu: false,
    label: "Wheel & Tire Packages",
    href: "/collections/product-category/wheels",
    children: [
      {
        label: "Shop all packages",
        href: "/collections/product-category/wheels",
      },
    ],
  },

  {
    meagMenu: false,
    label: "Suspension",
    href: "#",
    children: [
      {
        label: "Shop All Suspension",
        href: "/collections/product-category/accessories",
      },
      { label: "Leveling Kits", href: "/collections/product-category/accessories" },
      { label: "Lift Kits", href: "/collections/product-category/accessories" },
      { label: "Body Lifts", href: "/collections/product-category/accessories" },
      { label: "Shop By Brand", href: "/collections/product-category/accessories" },
    ],
  },
  {
    meagMenu: false,
    label: "Accessories",
    href: "/collections/product-category/accessories",
    children: [
      {
        meagMenu: false,
        label: "Wheel Accessories",
        href: "#",
        children: [
          {
            label: "Center Caps",
            href: "/collections/product-category/accessories",
          },
          {
            label: "Lug Nuts",
            href: "/collections/product-category/accessories",
          },
          {
            label: "Wheel Spacers",
            href: "/collections/product-category/accessories",
          },
          {
            label: "Wheel Adapters",
            href: "/collections/product-category/accessories",
          },
        ],
      },
      {
        meagMenu: false,
        label: "Performance",
        href: "#",
        children: [
          {
            label: "Shop All Performance",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Engine Performance",
            href: "/collections/product-category/wheels",
          },
          { label: "Intake", href: "/collections/product-category/wheels" },
          { label: "Driveline", href: "/collections/product-category/wheels" },
          { label: "Brakes", href: "/collections/product-category/wheels" },
          { label: "Exhaust", href: "/collections/product-category/wheels" },
          {
            label: "Tuners & Gauges",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Shop By Brand",
            href: "/collections/product-category/wheels",
          },
        ],
      },
      {
        meagMenu: false,
        label: "Lighting",
        href: "#",
        children: [
          {
            label: "Shop All Lighting",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Lighting Accessories",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Exterior Lighting",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Interior Lighting",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Off-Road Lighting",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Auxiliary Lighting",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Shop By Brand",
            href: "/collections/product-category/wheels",
          },
        ],
      },
      {
        meagMenu: false,
        label: "Exterior",
        href: "#",
        children: [
          {
            label: "Shop All Exterior",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Armor & Protection",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Bed Accessories",
            href: "/collections/product-category/wheels",
          },
          { label: "Body", href: "/collections/product-category/wheels" },
          {
            label: "Bumpers & Accessories",
            href: "/collections/product-category/wheels",
          },
          { label: "Horns", href: "/collections/product-category/wheels" },
          {
            label: "Overlanding & Camping",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Safety & Storage",
            href: "/collections/product-category/wheels",
          },
          { label: "Step Bars", href: "/collections/product-category/wheels" },
          { label: "Towing", href: "/collections/product-category/wheels" },
          {
            label: "Winches & Recovery",
            href: "/collections/product-category/wheels",
          },
        ],
      },
      {
        meagMenu: false,
        label: "Interior",
        href: "#",
        children: [
          {
            label: "Shop All Interior",
            href: "/collections/product-category/wheels",
          },
          { label: "Audio", href: "/collections/product-category/wheels" },
          {
            label: "Interior Protection & Storage",
            href: "/collections/product-category/wheels",
          },
          {
            label: "Interior Safety",
            href: "/collections/product-category/wheels",
          },
          { label: "Seats", href: "/collections/product-category/wheels" },
        ],
      },
    ],
  },

  {
    label: "Financing",
    href: "/financing",
    meagMenu: false,
  },
  {
    meagMenu: false,
    label: "Resource",
    href: "#",
    children: [
      {
        label: "Affiliate Program",
        href: "/affiliates",
      },
    ],
  },
];

export default navMenus;
