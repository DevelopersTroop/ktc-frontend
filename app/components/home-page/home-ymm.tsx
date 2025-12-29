"use client";
import useYmm from "@/hooks/use-ymm";
import { cn } from "@/lib/utils";

const HomeYmm = () => {
    const {
        isYearLoading,
        isMakeLoading,
        isModelLoading,
        isBodyTypeLoading,
        isSubmodelLoading,
        isYearDisabled,
        isMakeDisabled,
        isModelDisabled,
        isBodyTypeDisabled,
        isSubmodelDisabled,
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

    return (<>
        <div className="w-full p-4">
            <div className="w-full flex flex-col md:flex-row gap-4 mt-4">
                <select disabled={isYearDisabled} value={year} onChange={onYearChange} className="w-full p-2 rounded bg-white text-xl text-black disabled:opacity-50">
                    <option value="">{isYearLoading ? "Loading..." : "Year"}</option>
                    {years?.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
                <select disabled={isMakeDisabled} value={make} onChange={onMakeChange} className="w-full p-2 rounded bg-white text-xl text-black disabled:opacity-50">
                    <option value="">{isMakeLoading ? "Loading..." : "Make"}</option>
                    {makes?.map(make => <option key={make} value={make}>{make}</option>)}
                </select>
                <select disabled={isModelDisabled} value={model} onChange={onModelChange} className="w-full p-2 rounded bg-white text-xl text-black disabled:opacity-50">
                    <option value="">{isModelLoading ? "Loading..." : "Model"}</option>
                    {models?.map(model => <option key={model} value={model}>{model}</option>)}
                </select>
                <select disabled={isBodyTypeDisabled} value={bodyType} onChange={onBodyTypeChange} className="w-full p-2 rounded bg-white text-xl text-black disabled:opacity-50">
                    <option value="">{isBodyTypeLoading ? "Loading..." : "Body Type"}</option>
                    {bodyTypes?.map(bodyType => <option key={bodyType} value={bodyType}>{bodyType}</option>)}
                </select>
                <select disabled={isSubmodelDisabled} value={subModel?.SubModel ?? ""} onChange={onSubModelChange} className="w-full p-2 rounded bg-white text-xl text-black disabled:opacity-50">
                    <option value="">{isSubmodelLoading ? "Loading..." : "Submodel"}</option>
                    {subModels?.map(subModel => <option key={subModel.SubModel} value={subModel.SubModel}>{subModel.SubModel}</option>)}
                </select>
            </div>
        </div>
        <div className="w-full p-4">
            <button onClick={onSubmit} disabled={isDisabledSubmit || !shouldShowSubmit} className={cn(
                "w-full bg-primary hover:bg-primary-hover  text-white py-3 text-lg uppercase cursor-pointer",
                isDisabledSubmit ? "opacity-50 cursor-not-allowed" : ""
            )}>
                {shouldShowSubmit ? "Submit" : "Loading"}
            </button>
        </div>
    </>)
}

export default HomeYmm;