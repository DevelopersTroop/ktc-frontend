import { useState } from "react";

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
          <select onChange={onYearChange} className="w-full p-2 rounded border border-gray-300 bg-white text-base text-black">
            <option value="">{isYearLoading ? "Loading..." : "Year"}</option>
            {years?.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>

        <div className="w-full flex flex-row gap-2 items-center">
          <h2 className="hidden min-[400px]:block min-[400px]:w-28 text-base font-semibold text-btext">Make</h2>
          <select onChange={onMakeChange} className="w-full p-2 rounded border border-gray-300 bg-white text-base text-black">
            <option value="">{isMakeLoading ? "Loading..." : "Make"}</option>
            {makes?.map(make => <option key={make} value={make}>{make}</option>)}
          </select>
        </div>

        <div className="w-full flex flex-row gap-2 items-center">
          <h2 className="hidden min-[400px]:block min-[400px]:w-28 text-base font-semibold text-btext">Model</h2>
          <select onChange={onModelChange} className="w-full p-2 rounded border border-gray-300 bg-white text-base text-black">
            <option value="">{isModelLoading ? "Loading..." : "Model"}</option>
            {models?.map(model => <option key={model} value={model}>{model}</option>)}
          </select>
        </div>

        <div className="w-full flex flex-row gap-2 items-center">
          <h2 className="hidden min-[400px]:block min-[400px]:w-28 text-base font-semibold text-btext">Body Type</h2>
          <select onChange={onBodyTypeChange} className="w-full p-2 rounded border border-gray-300 bg-white text-base text-black">
            <option value="">{isBodyTypeLoading ? "Loading..." : "Body Type"}</option>
            {bodyTypes?.map(bodyType => <option key={bodyType} value={bodyType}>{bodyType}</option>)}
          </select>
        </div>

        <div className="w-full flex flex-row gap-2 items-center">
          <h2 className="hidden min-[400px]:block min-[400px]:w-28 text-base font-semibold text-btext">Sub Model</h2>
          <select onChange={onSubModelChange} className="w-full p-2 rounded border border-gray-300 bg-white text-base text-black">
            <option value="">{isSubmodelLoading ? "Loading..." : "Submodel"}</option>
            {subModels?.map(subModel => <option key={subModel.SubModel} value={subModel.SubModel}>{subModel.SubModel}</option>)}
          </select>
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
