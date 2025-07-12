import { useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useYmm from "@/hooks/use-ymm";

export const YmmSelector: React.FC<{ymm: ReturnType<typeof useYmm>}> = ({ymm}) => {

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
    } = ymm;


    return (
        <div className="pt-2 flex flex-col gap-2">
            <div>
                <Select onValueChange={onYearChange} value={year} disabled={isYearLoading} >
                    <SelectTrigger>
                        <SelectValue placeholder={isYearLoading ? "Loading" : "Select Year"} />
                    </SelectTrigger>
                    <SelectContent>
                        {years?.map((year) => (
                            <SelectItem key={`year-${year}`} value={year}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Select
                    onValueChange={onMakeChange}
                    value={make}
                    disabled={!!isMakeLoading}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder={
                                isMakeLoading ? "Loading" : "Select Make"
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {makes?.map((make) => (
                            <SelectItem key={`make-${make}`} value={make}>
                                {make}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Select
                    onValueChange={onModelChange}
                    value={model}
                    disabled={!!isModelLoading}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder={
                                isModelLoading ? "Loading" : "Select Model"
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {models?.map((model) => (
                            <SelectItem key={`model-${model}`} value={model}>
                                {model}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Select
                    onValueChange={onBodyTypeChange}
                    value={bodyType}
                    disabled={!!isBodyTypeLoading}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder={
                                isBodyTypeLoading ? "Loading" : "Select Bodytype"
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {bodyTypes?.map((bodyType) => (
                            <SelectItem key={`bodyType-${bodyType}`} value={bodyType}>
                                {bodyType}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Select
                    onValueChange={onSubModelChange}
                    value={subModel.SubModel}
                    disabled={!!isSubmodelLoading}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder={
                                isSubmodelLoading ? "Loading" : "Select Submodel"
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {subModels?.map((subModelData) => (
                            <SelectItem key={`bodyType-${subModelData?.SubModel}`} value={subModelData?.SubModel}>
                                {subModelData?.SubModel}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
