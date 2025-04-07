import useYmm from "@/hooks/use-ymm";
import { cn } from "@/lib/utils";

const WheelYMMFilters = () => {
  const {
    isYearLoading,
    isMakeLoading,
    isModelLoading,
    isBodyTypeLoading,
    isSubmodelLoading,
    shouldShowSubmit,
    list: { years,
      makes,
      models,
      bodyTypes,
      subModels },
    onYearChange,
    onMakeChange,
    onModelChange,
    onBodyTypeChange,
    onSubModelChange,
    onSubmit,
    isDisabledSubmit,
    year, make, model, bodyType, subModel
  } = useYmm();

  return (
    <div className={"filter-shadow bg-gray-200"}>
      <div
        className={
          "flex justify-between items-center font-medium text-gray-900 hover:text-gray-600 transition-colors pr-5 pb-3 border-y"
        }
      >
        <div className="uppercase bg-primary hover:bg-primary-hover text-white pl-3 pr-7 py-1">
          <p className="text-xs">Search by</p>
          <h2 className="text-base">Vehicle</h2>
        </div>
        <p className="text-xs text-primary cursor-pointer">
          New Vehicle Search
        </p>
      </div>

      <div className="px-10 pb-10 pt-2 border-y">
        <div className="w-full flex flex-col gap-1 mt-4">
          <select
            value={year}
            onChange={onYearChange}
            className="w-full p-2 rounded bg-white text-base text-black"
          >
            <option value="">{isYearLoading ? "Loading..." : "Year"}</option>
            {years?.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={make}
            onChange={onMakeChange}
            className="w-full p-2 rounded bg-white text-base text-black"
          >
            <option value="">{isMakeLoading ? "Loading..." : "Make"}</option>
            {makes?.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
          <select
            value={model}
            onChange={onModelChange}
            className="w-full p-2 rounded bg-white text-base text-black"
          >
            <option value="">{isModelLoading ? "Loading..." : "Model"}</option>
            {models?.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          <select
            value={bodyType}
            onChange={onBodyTypeChange}
            className="w-full p-2 rounded bg-white text-base text-black"
          >
            <option value="">
              {isBodyTypeLoading ? "Loading..." : "Body Type"}
            </option>
            {bodyTypes?.map((bodyType) => (
              <option key={bodyType} value={bodyType}>
                {bodyType}
              </option>
            ))}
          </select>
          <select
            value={subModel.SubModel}
            onChange={onSubModelChange}
            className="w-full p-2 rounded bg-white text-base text-black"
          >
            <option value="">
              {isSubmodelLoading ? "Loading..." : "Submodel"}
            </option>
            {subModels?.map((subModel) => (
              <option key={subModel.SubModel} value={subModel.SubModel}>
                {subModel.SubModel}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full p-4">
          <button
            onClick={onSubmit}
            disabled={isDisabledSubmit && !shouldShowSubmit}
            className={cn(
              "w-full bg-primary hover:bg-primary-hover  text-white py-1 text-base uppercase cursor-pointer",
              isDisabledSubmit ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            {shouldShowSubmit ? "Submit" : "Loading"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WheelYMMFilters;
