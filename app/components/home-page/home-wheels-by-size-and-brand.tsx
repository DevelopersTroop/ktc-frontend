"use client";
import useYmm from "@/hooks/use-ymm";
import { useFetchFilters } from "@/hooks/useFetchFilters";
import { cn } from "@/lib/utils";

const WheelsBySizeAndBrand = () => {
  const {
    isYearLoading,
    isMakeLoading,
    isModelLoading,
    isBodyTypeLoading,
    isSubmodelLoading,
    shouldShowSubmit,
    years,
    makes,
    models,
    bodyTypes,
    subModels,
    onYearChange,
    onMakeChange,
    onModelChange,
    onBodyTypeChange,
    onSubModelChange,
    onSubmit,
    isDisabledSubmit,
  } = useYmm();

  const {filters} =  useFetchFilters("wheels");

  console.log('filter === ', filters)


  return (
    <>
      <div className="w-full p-4">
        <form className="w-full flex flex-col md:flex-row gap-4 mt-4">
          <select
            onChange={onYearChange}
            className="w-full p-2 rounded bg-white text-xl text-black"
          >
            <option value="">{isYearLoading ? "Loading..." : "Wheel Diameter"}</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            onChange={onMakeChange}
            className="w-full p-2 rounded bg-white text-xl text-black"
          >
            <option value="">{isMakeLoading ? "Loading..." : "Wheel Width"}</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
          <select
            onChange={onModelChange}
            className="w-full p-2 rounded bg-white text-xl text-black"
          >
            <option value="">{isModelLoading ? "Loading..." : "Bolt Pattern"}</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          <select
            onChange={onBodyTypeChange}
            className="w-full p-2 rounded bg-white text-xl text-black"
          >
            <option value="">
              {isBodyTypeLoading ? "Loading..." : "Wheel Brand"}
            </option>
            {bodyTypes.map((bodyType) => (
              <option key={bodyType} value={bodyType}>
                {bodyType}
              </option>
            ))}
          </select>
          {/* <select
            onChange={onSubModelChange}
            className="w-full p-2 rounded bg-white text-xl text-black"
          >
            <option value="">
              {isSubmodelLoading ? "Loading..." : "Submodel"}
            </option>
            {subModels.map((subModel) => (
              <option key={subModel.SubModel} value={subModel.SubModel}>
                {subModel.SubModel}
              </option>
            ))}
          </select> */}

        <div className="w-full p-4">
                <button
                onClick={onSubmit}
                disabled={isDisabledSubmit}
                className={cn(
                    "w-full bg-primary hover:bg-primary-hover  text-white py-3 text-lg uppercase cursor-pointer",
                    isDisabledSubmit ? "opacity-50 cursor-not-allowed" : ""
                )}
                >
                {shouldShowSubmit ? "Submit" : "Loading"}
                </button>
            </div>
        </form>
      </div>
      
    </>
  );
};

export default WheelsBySizeAndBrand;
