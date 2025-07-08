// Interface for defining the structure of a navigation menu item
interface NavMenu {
  label: string;
  href: string;
  children?: NavMenu[];
  target?: "_blank";
  meagMenu?: boolean;
}

// Array of navigation menu items
const navMenus: NavMenu[] = [
  {
    label: "SHOP", // Main menu item
    href: "/collections/product-category/wheels", // Link to the wheels category
    meagMenu: true, // Indicates this is part of a mega menu
    children: [
      {
        label: "Wheel & Tire Packages",
        href: "#",
        children: [
          {
            label: "Shop all packages",
            href: "#",
          },
          {
            label: "Wheels",
            href: "/collections/product-category/wheels",
            children: [
              {
                href: "/collections/product-category/wheels",
                label: "Shop all wheels",
              },
              {
                href: "#",
                label: "Shop by brands",
              },
            ],
          },
        ],
      },
      {
        label: "Tires",
        href: "/collections/product-category/tires",
        children: [
          {
            label: "Shop all Tires",
            href: "/collections/product-category/tires",
          },
          {
            label: "All-Season",
            href: "#",
          },
          {
            label: "All-Terrain",
            href: "#",
          },
          {
            label: "Dessert Terrain",
            href: "#",
          },
          {
            label: "Hybrid at/mt",
            href: "#",
          },
          {
            label: "mud terrain",
            href: "#",
          },
          {
            label: "shop by brand",
            href: "#",
          },
        ],
      },
      {
        label: "Suspension",
        href: "/collections/product-category/suspension",
        children: [
          {
            label: "Shop All Suspension",
            href: "/collections/product-category/suspension",
          },
          {
            label: "Leveling Kits",
            href: "#",
          },
          {
            label: "Lift Kits",
            href: "#",
          },
          {
            label: "Body Lifts",
            href: "#",
          },
          {
            label: "Shop By Brand",
            href: "#",
          },
        ],
      },
      {
        label: "Performance",
        href: "#",
        children: [
          {
            label: "Shop All Performance",
            href: "#",
          },
          {
            label: "Engine Performance",
            href: "#",
          },
          {
            label: "Intake",
            href: "#",
          },
          {
            label: "Driveline",
            href: "#",
          },
          {
            label: "Brakes",
            href: "#",
          },
          {
            label: "Exhaust",
            href: "#",
          },
          {
            label: "Tuners & Gauges",
            href: "#",
          },
          {
            label: "Shop By Brand",
            href: "#",
          },
        ],
      },
      {
        label: "Lighting",
        href: "#",
        children: [
          {
            label: "Shop All Lighting",
            href: "#",
          },
          {
            label: "Lighting Accessories",
            href: "#",
          },
          {
            label: "Exterior Lighting",
            href: "#",
          },
          {
            label: "Interior Lighting",
            href: "#",
          },
          {
            label: "Off-Road Lighting",
            href: "#",
          },
          {
            label: "Auxiliary Lighting",
            href: "#",
          },
          {
            label: "shop by brand",
            href: "#",
          },
        ],
      },
      {
        label: "Exterior",
        href: "#",
        children: [
          {
            label: "Shop All Exterior",
            href: "#",
          },
          {
            label: "Armor & Protection",
            href: "#",
          },
          {
            label: "Bed Accessories",
            href: "#",
          },
          {
            label: "Body",
            href: "#",
          },
          {
            label: "Bumpers & Accessories",
            href: "#",
          },
          {
            label: "Horns",
            href: "#",
          },
          {
            label: "Horns",
            href: "#",
          },
          {
            label: "Overlanding & Camping",
            href: "#",
          },
          {
            label: "Safety & Storage",
            href: "#",
          },
          {
            label: "Step Bars",
            href: "#",
          },
          {
            label: "Towing",
            href: "#",
          },
          {
            label: "Winches & Recovery",
            href: "#",
          },
        ],
      },
      {
        label: "Interior",
        href: "#",
        children: [
          {
            label: "Shop All Interior",
            href: "#",
          },
          {
            label: "Audio",
            href: "#",
          },
          {
            label: "Interior Protection & Storage",
            href: "#",
          },
          {
            label: "Interior Safety",
            href: "#",
          },
          {
            label: "Seats",
            href: "#",
          },
          {
            label: "Wheel Accessories",
            href: "/collections/product-category/accessories",
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
                href: "#",
              },
              {
                label: "Wheel Adapters",
                href: "/collections/product-category/accessories",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: "/add-my-truck",
    label: "ADD MY TRUCK",
  },
  {
    href: "/ktc-audio-gallery",
    label: "SEARCH GALLERY",
  },
  {
    label: "BRANDS",
    href: "#",
    meagMenu: false,
    children: [
      {
        label: "Wheels",
        href: "/collections/product-category/wheels",
      },
      {
        label: "Tires",
        href: "/collections/product-category/tires",
      },
      {
        label: "Accessories",
        href: "/collections/product-category/accessories",
      },
    ],
  },
  {
    label: "RESOURCES",
    href: "#",
    meagMenu: false,
    children: [
      {
        label: "About Us",
        href: "/about",
      },
      {
        label: "Track Your Order",
        href: "/track-order",
      },
      {
        label: "Contact",
        href: "/contact",
      },
    ],
  },
];

export default navMenus;
