import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import useYmm from "@/hooks/use-ymm";
import { cn } from "@/lib/utils";
import { apiBaseUrl } from "@/app/utils/api";
import useAuth from "@/hooks/useAuth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";

const AddMyTruckYMMFilters = () => {
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

  const auth = useAuth()
  const [isSaved, setIsSaved] = useState(false);
  const [openMake, setOpenMake] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openBodyType, setOpenBodyType] = useState(false);
  const [openSubModel, setOpenSubModel] = useState(false);

  useEffect(() => {
    if (year && !isMakeLoading && !isMakeDisabled && (makes?.length ?? 0) > 0 && !make) {
      setOpenMake(true);
    }
  }, [year, isMakeLoading, isMakeDisabled, makes?.length]);

  useEffect(() => {
    if (make && !isModelLoading && !isModelDisabled && (models?.length ?? 0) > 0 && !model) {
      setOpenModel(true);
    }
  }, [make, isModelLoading, isModelDisabled, models?.length]);

  useEffect(() => {
    if (model && !isBodyTypeLoading && !isBodyTypeDisabled && (bodyTypes?.length ?? 0) > 0 && !bodyType) {
      setOpenBodyType(true);
    }
  }, [model, isBodyTypeLoading, isBodyTypeDisabled, bodyTypes?.length]);

  useEffect(() => {
    if (bodyType && !isSubmodelLoading && !isSubmodelDisabled && (subModels?.length ?? 0) > 0 && !subModel?.SubModel) {
      setOpenSubModel(true);
    }
  }, [bodyType, isSubmodelLoading, isSubmodelDisabled, subModels?.length, subModel?.SubModel]);

  const saveVehicle = async () => {
    const metaRes = await fetch(`${apiBaseUrl}/auth/meta`, {
      method: "POST",
      headers: {
        "ContentType": "application/json",
        "Authorization": `Bearer ${auth.user?.accessToken}`
      },
      body: JSON.stringify({
        "meta": [
          {
            "key": "vehicle",
            "value": [
              {
                year,
                make,
                model,
                bodyType,
                subModel
              }
            ]
          }
        ]
      })
    });
    const meta = await metaRes.json();
    setIsSaved(true)
  }
  return (<>

    {isSaved && <Alert variant="default">
      <AlertTitle>Vehicle saved successfully</AlertTitle>
    </Alert>}
    <div className="w-full p-4">
      <div className="w-full flex flex-col gap-4 mt-4">
        <div className="w-full flex flex-row gap-2 items-center">
          <h2 className="hidden min-[400px]:block min-[400px]:w-28 text-base font-semibold text-btext">Year</h2>
          <div className="w-full">
            <Select onValueChange={onYearChange} value={year || undefined} disabled={isYearDisabled} >
              <SelectTrigger className="w-full p-2 rounded border border-gray-300 bg-white text-base text-black disabled:opacity-50">
                <SelectValue placeholder={isYearLoading ? "Loading..." : "Year"} />
              </SelectTrigger>
              <SelectContent>
                {years?.map((y) => (
                  <SelectItem key={`year-${y}`} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full flex flex-row gap-2 items-center">
          <h2 className="hidden min-[400px]:block min-[400px]:w-28 text-base font-semibold text-btext">Make</h2>
          <div className="w-full">
            <Select open={openMake} onOpenChange={setOpenMake} onValueChange={onMakeChange} value={make || undefined} disabled={isMakeDisabled} >
              <SelectTrigger className="w-full p-2 rounded border border-gray-300 bg-white text-base text-black disabled:opacity-50">
                <SelectValue placeholder={isMakeLoading ? "Loading..." : "Make"} />
              </SelectTrigger>
              <SelectContent>
                {makes?.map((m) => (
                  <SelectItem key={`make-${m}`} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full flex flex-row gap-2 items-center">
          <h2 className="hidden min-[400px]:block min-[400px]:w-28 text-base font-semibold text-btext">Model</h2>
          <div className="w-full">
            <Select open={openModel} onOpenChange={setOpenModel} onValueChange={onModelChange} value={model || undefined} disabled={isModelDisabled} >
              <SelectTrigger className="w-full p-2 rounded border border-gray-300 bg-white text-base text-black disabled:opacity-50">
                <SelectValue placeholder={isModelLoading ? "Loading..." : "Model"} />
              </SelectTrigger>
              <SelectContent>
                {models?.map((mdl) => (
                  <SelectItem key={`model-${mdl}`} value={mdl}>
                    {mdl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full flex flex-row gap-2 items-center">
          <h2 className="hidden min-[400px]:block min-[400px]:w-28 text-base font-semibold text-btext">Body Type</h2>
          <div className="w-full">
            <Select open={openBodyType} onOpenChange={setOpenBodyType} onValueChange={onBodyTypeChange} value={bodyType || undefined} disabled={isBodyTypeDisabled} >
              <SelectTrigger className="w-full p-2 rounded border border-gray-300 bg-white text-base text-black disabled:opacity-50">
                <SelectValue placeholder={isBodyTypeLoading ? "Loading..." : "Body Type"} />
              </SelectTrigger>
              <SelectContent>
                {bodyTypes?.map((bt) => (
                  <SelectItem key={`bodyType-${bt}`} value={bt}>
                    {bt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="w-full flex flex-row gap-2 items-center">
          <h2 className="hidden min-[400px]:block min-[400px]:w-28 text-base font-semibold text-btext">Sub Model</h2>
          <div className="w-full">
            <Select open={openSubModel} onOpenChange={setOpenSubModel} onValueChange={onSubModelChange} value={subModel?.SubModel} disabled={isSubmodelDisabled} >
              <SelectTrigger className="w-full p-2 rounded border border-gray-300 bg-white text-base text-black disabled:opacity-50">
                <SelectValue placeholder={isSubmodelLoading ? "Loading..." : "Submodel"} />
              </SelectTrigger>
              <SelectContent>
                {subModels?.map((sm) => (
                  <SelectItem key={`subModel-${sm.SubModel}`} value={sm.SubModel}>
                    {sm.SubModel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full p-4">
      <button onClick={saveVehicle} disabled={isDisabledSubmit} className={cn(
        "w-full bg-primary hover:bg-primary-hover  text-white py-3 text-lg uppercase cursor-pointer",
        isDisabledSubmit ? "opacity-50 cursor-not-allowed" : ""
      )}>
        {shouldShowSubmit ? "Submit" : "Loading"}
      </button>
    </div>
  </>)
};

export default AddMyTruckYMMFilters;
