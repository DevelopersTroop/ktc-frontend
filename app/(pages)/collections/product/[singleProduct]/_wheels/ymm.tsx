import { useState } from "react";

import {
    FormControl
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const YmmSelector: React.FC<{
    setYmm: React.Dispatch<React.SetStateAction<{
        year: string;
        make: string;
        model: string;
        trim: string;
        showError?: boolean
    }>>,
    ymm: {
        year: string;
        make: string;
        model: string;
        trim: string;
        showError?: boolean
    }
}> = ({
    setYmm,
    ymm
}) => {
        const [years, setYears] = useState<string[]>(["2020", "2021", "2022"]);
        const [makes, setMakes] = useState<string[]>([]);
        const [models, setModels] = useState<string[]>([]);
        const [trims, setTrims] = useState<string[]>([]);
        const [drives, setDrives] = useState<string[]>([]);
        const [loadingMakes, setLoadingMakes] = useState(false);
        const [loadingModels, setLoadingModels] = useState(false);
        const [loadingTrims, setLoadingTrims] = useState(false);
        const [loadingDrives, setLoadingDrives] = useState(false);


        const onYearChange = (value: string) => {
            setYmm(prev => ({
                ...prev,
                year: value
            }))
            setLoadingMakes(true);
            setTimeout(() => {
                setMakes(["Toyota", "Honda", "Ford"]);
                setLoadingMakes(false);
            }, 1000);
        };

        const onMakeChange = (value: string) => {
            setLoadingModels(true);
            setYmm(prev => ({ ...prev, make: value }))
            setTimeout(() => {
                setModels(["Corolla", "Camry", "Accord"]);
                setLoadingModels(false);
            }, 1000);
        };

        const onModelChange = (value: string) => {
            setLoadingTrims(true);
            console.log("onModelChange", value);
            setYmm(prev => ({ ...prev, model: value }))
            setTimeout(() => {
                setTrims(["LT", "RS"]);
                setLoadingTrims(false);
            }, 1000);
        };

        const onTrimChange = (value: string) => {
            setYmm(prev => ({ ...prev, trim: value }))
            setLoadingDrives(true);
            setTimeout(() => {
                setDrives(["RWD"]);
                setLoadingDrives(false);
            }, 1000);
        };
        return (
            <div className="pt-2 flex flex-col gap-2">
                <div>
                    <Select onValueChange={onYearChange} value={ymm.year}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={`year-${year}`} value={year}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {
                        (ymm.showError && !ymm.year.length) ? <p className="text-primary">Required</p> : null
                    }
                </div>

                <div>
                    <Select
                        onValueChange={onMakeChange}
                        value={ymm.make}
                        disabled={!ymm.year.length || loadingMakes}
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder={
                                    loadingMakes ? "Loading..." : "Select Make"
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {makes.map((make) => (
                                <SelectItem key={`make-${make}`} value={make}>
                                    {make}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {
                        (ymm.showError && !ymm.make.length) ? <p className="text-primary">Required</p> : null
                    }
                </div>

                <div>
                    <Select
                        onValueChange={onModelChange}
                        value={ymm.model}
                        disabled={!ymm.make.length || loadingModels}
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder={
                                    loadingModels ? "Loading..." : "Select Model"
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {models.map((model) => (
                                <SelectItem key={`model-${model}`} value={model}>
                                    {model}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {
                        (ymm.showError && !ymm.model.length) ? <p className="text-primary">Required</p> : null
                    }
                </div>


                <div>
                    <Select
                        onValueChange={onTrimChange}
                        value={ymm.trim}
                        disabled={!ymm.model.length || loadingTrims}
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder={
                                    loadingTrims ? "Loading..." : "Select Trim"
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {trims.map((trim) => (
                                <SelectItem key={`trim-${trim}`} value={trim}>
                                    {trim}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {
                        (ymm.showError && !ymm.trim.length) ? <p className="text-primary">Required</p> : null
                    }
                </div>
            </div>
        );
    };
