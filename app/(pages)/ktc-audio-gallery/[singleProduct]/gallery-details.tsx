import { IGallery } from "@/app/globalRedux/api/gallery";

/**
 *
 */
const getDetails = (
  product: IGallery,
  prefix: "wheel" | "tire" | "suspension"
) => {
  const regx = new RegExp(`^${prefix}`, "i");

  const filteredKeys = Object.keys(product).filter((key) => regx.test(key));

  return filteredKeys.map((key) => {
    // 1️⃣ Remove prefix
    let label = key.replace(regx, "");

    // 2️⃣ Split camelCase into words (e.g. "FrontOffset" → ["Front", "Offset"])
    label = label.replace(/([A-Z])/g, " $1").trim();

    // 3️⃣ Capitalize first letter of each word
    label = label
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      label, // "Front Offset"
      value: product[key as keyof IGallery] as string, // the actual value
      originalKey: key, // optional, if you want to keep reference
    };
  });
};

const GalleryDetails = ({ product }: { product: IGallery }) => {
  return (
    <>
      <div className="w-full">
        <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-center">
          About this Build
        </h2>
      </div>

      <div className="w-full">
        <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-start px-2">
          Wheel Info
        </h2>

        <table className="w-full border-collapse">
          <tbody>
            {getDetails(product, "wheel").map((tire) => {
              console.log("TCL: GalleryDetails -> tire", tire);
              return (
                <tr key={tire.originalKey}>
                  <td className="border p-2 font-medium w-1/2">{tire.label}</td>
                  <td className="border p-2 w-1/2">{tire.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="w-full">
        <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-start px-2">
          Tire Info
        </h2>
        <table className="w-full border-collapse">
          <tbody>
            {getDetails(product, "tire").map((tire) => {
              console.log("TCL: GalleryDetails -> tire", tire);
              return (
                <tr key={tire.originalKey}>
                  <td className="border p-2 font-medium w-1/2">{tire.label}</td>
                  <td className="border p-2 w-1/2">{tire.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="w-full">
        <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-start px-2">
          Suspension Info
        </h2>
        <table className="w-full border-collapse">
          <tbody>
            {getDetails(product, "suspension").map((tire) => {
              console.log("TCL: GalleryDetails -> tire", tire);
              return (
                <tr className="w-full" key={tire.originalKey}>
                  <td className="border p-2 font-medium w-1/2">
                    {tire.label || tire.originalKey}
                  </td>
                  <td className="border p-2 w-1/2">{tire.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GalleryDetails;
