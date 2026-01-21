import { useEffect, useRef, useState } from "react";

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
        isYearDisabled,
        isMakeDisabled,
        isModelDisabled,
        isBodyTypeDisabled,
        isSubmodelDisabled,
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
        year, make, model, bodyType, subModel
    } = ymm;

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const handleOpenChange = (key: string) => (open: boolean) => {
    if (open) {
      setActiveDropdown(key);
    } else {
      setActiveDropdown((prev) => (prev === key ? null : prev));
    }
  };

  useEffect(() => {
    if (isFirstRender.current) return;
    let timeoutId: NodeJS.Timeout;
    if (
      year &&
      !isMakeLoading &&
      !isMakeDisabled &&
      (makes?.length ?? 0) > 0 &&
      (!make || make === "__DEFAULT_MAKE__")
    ) {
      timeoutId = setTimeout(() => {
        if (containerRef.current?.offsetParent) {
          setActiveDropdown("make");
        }
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [year, isMakeLoading, isMakeDisabled, makes?.length, make]);

  useEffect(() => {
    if (isFirstRender.current) return;
    let timeoutId: NodeJS.Timeout;
    if (
      make &&
      !isModelLoading &&
      !isModelDisabled &&
      (models?.length ?? 0) > 0 &&
      (!model || model === "__DEFAULT_MODEL__")
    ) {
      timeoutId = setTimeout(() => {
        if (containerRef.current?.offsetParent) {
          setActiveDropdown("model");
        }
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [make, isModelLoading, isModelDisabled, models?.length, model]);

  useEffect(() => {
    if (isFirstRender.current) return;
    let timeoutId: NodeJS.Timeout;
    if (
      model &&
      !isBodyTypeLoading &&
      !isBodyTypeDisabled &&
      (bodyTypes?.length ?? 0) > 0 &&
      (!bodyType || bodyType === "__DEFAULT_BODYTYPE__")
    ) {
      timeoutId = setTimeout(() => {
        if (containerRef.current?.offsetParent) {
          setActiveDropdown("bodyType");
        }
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [model, isBodyTypeLoading, isBodyTypeDisabled, bodyTypes?.length, bodyType]);

  useEffect(() => {
    if (isFirstRender.current) return;
    let timeoutId: NodeJS.Timeout;
    if (
      bodyType &&
      !isSubmodelLoading &&
      !isSubmodelDisabled &&
      (subModels?.length ?? 0) > 0 &&
      (!subModel?.SubModel || subModel?.SubModel === "__DEFAULT_SUBMODEL__")
    ) {
      timeoutId = setTimeout(() => {
        if (containerRef.current?.offsetParent) {
          setActiveDropdown("subModel");
        }
      }, 200);
    }
    return () => clearTimeout(timeoutId);
  }, [bodyType, isSubmodelLoading, isSubmodelDisabled, subModels?.length, subModel?.SubModel]);

    return (
        <div ref={containerRef} className="pt-2 flex flex-col gap-2">
            <div>
                <Select onValueChange={onYearChange} value={year || undefined} disabled={isYearDisabled} >
                    <SelectTrigger>
                        <SelectValue placeholder={isYearLoading ? "Loading" : "Select Year"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="__DEFAULT_YEAR__" className="hidden" disabled>
                            Year
                        </SelectItem>
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
                    open={activeDropdown === "make"}
                    onOpenChange={handleOpenChange("make")}
                    onValueChange={onMakeChange}
                    value={make || "__DEFAULT_MAKE__"}
                    disabled={isMakeDisabled}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder={
                                isMakeLoading ? "Loading" : "Select Make"
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="__DEFAULT_MAKE__" className="hidden" disabled>
                            {isMakeLoading ? "Loading" : "Make"}
                        </SelectItem>
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
                    open={activeDropdown === "model"}
                    onOpenChange={handleOpenChange("model")}
                    onValueChange={onModelChange}
                    value={model || "__DEFAULT_MODEL__"}
                    disabled={isModelDisabled}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder={
                                isModelLoading ? "Loading" : "Select Model"
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="__DEFAULT_MODEL__" className="hidden" disabled>
                            {isModelLoading ? "Loading" : "Model"}
                        </SelectItem>
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
                    open={activeDropdown === "bodyType"}
                    onOpenChange={handleOpenChange("bodyType")}
                    onValueChange={onBodyTypeChange}
                    value={bodyType || "__DEFAULT_BODYTYPE__"}
                    disabled={isBodyTypeDisabled}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder={
                                isBodyTypeLoading ? "Loading" : "Select Bodytype"
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="__DEFAULT_BODYTYPE__" className="hidden" disabled>
                            {isBodyTypeLoading ? "Loading" : "Body Type"}
                        </SelectItem>
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
                    open={activeDropdown === "subModel"}
                    onOpenChange={handleOpenChange("subModel")}
                    onValueChange={onSubModelChange}
                    value={subModel?.SubModel || "__DEFAULT_SUBMODEL__"}
                    disabled={isSubmodelDisabled}
                >
                    <SelectTrigger>
                        <SelectValue
                            placeholder={
                                isSubmodelLoading ? "Loading" : "Select Submodel"
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="__DEFAULT_SUBMODEL__" className="hidden" disabled>
                            {isSubmodelLoading ? "Loading" : "Submodel"}
                        </SelectItem>
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
