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
            href: "#",
            children: [
              {
                href: "#",
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
        href: "#",
        children: [
          {
            label: "Shop all Tires",
            href: "#",
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
        href: "#",
        children: [
          {
            label: "Shop All Suspension",
            href: "#",
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
            href: "#",
            children: [
              {
                label: "Center Caps",
                href: "#",
              },
              {
                label: "Lug Nuts",
                href: "#",
              },
              {
                label: "Wheel Spacers",
                href: "#",
              },
              {
                label: "Wheel Adapters",
                href: "#",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    href: "#",
    label: "ADD MY TRUCK",
  },
  {
    href: "#",
    label: "SEARCH GALLERY",
  },
  {
    label: "BRANDS",
    href: "#",
    meagMenu: false,
    children: [
      {
        label: "Wheels",
        href: "#",
      },
      {
        label: "Tires",
        href: "#",
      },
      {
        label: "Accessories",
        href: "#",
      },
    ],
  },
  //   {
  //     label: "In Stock",
  //     href: "/collections/product-category/in-stock-wheels",
  //     meagMenu: false,
  //     children: [
  //       {
  //         label: "Wheels",
  //         href: "/collections/product-category/in-stock-wheels",
  //         children: [
  //           {
  //             label: "Passenger",
  //             href: "/collections/product-category/in-stock-wheels?forging_style=Passenger%2CSignature+Series%2CSignature+XL+Series%2CAXL+Concave%2CWire+Wheels",
  //           },
  //           {
  //             label: "Off-Road",
  //             href: "/collections/product-category/in-stock-wheels?forging_style=Off-Road",
  //           },
  //           {
  //             label: "Dually",
  //             href: "/collections/product-category/in-stock-wheels?forging_style=Dually",
  //           },
  //           {
  //             label: "Wire Wheels",
  //             href: "/collections/product-category/in-stock-wheels?forging_style=Wire+Wheels",
  //           },
  //           {
  //             label: "Browse All",
  //             href: "/collections/product-category/in-stock-wheels",
  //           },
  //         ],
  //       },
  //       {
  //         label: "Steering Wheels",
  //         href: "/collections/product-category/in-stock-steering-wheel",
  //       },
  //     ],
  //   }
];

export default navMenus;
