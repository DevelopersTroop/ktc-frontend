"use client"
import { getBodyTypes, getMakes, getModels, getSubModels, getVehicleData, getYears } from "@/lib/driver-right-api";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

const useYmm = () => {
    const router = useRouter();
    const [years, setYears] = useState<string[]>([]);
    const [makes, setMakes] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [bodyTypes, setBodyTypes] = useState<string[]>([]);
    const [subModels, setSubModels] = useState<{
        SubModel: string;
        DRChassisID: string;
        DRModelID: string;
    }[]>([]);

    const [isLoading, setIsLoading] = useState({
        year: true,
        make: true,
        model: true,
        bodyType: true,
        subModel: true,
        vehicleData: true
    })

    const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

    const [selectedYear, setSelectedYear] = useState<string>("");
    const [selectedMake, setSelectedMake] = useState<string>("");
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [selectedBodyType, setSelectedBodyType] = useState<string>("");
    const [selectedSubModel, setSelectedSubModel] = useState<typeof subModels[0]>({
        SubModel: "",
        DRChassisID: "",
        DRModelID: ""
    });

    const [vehicleInformation, setVehicleInformation] = useState<{
        boltPattern: string;
        frontRimSize: string;
        rearRimSize: string;
        frontCenterBore: string;
        rearCenterBore: string;
        tireSizes: Record<"front" | "rear", string>[]
    }>({
        boltPattern: "",
        frontRimSize: "",
        rearRimSize: "",
        frontCenterBore: "",
        rearCenterBore: "",
        tireSizes: []
    })

    // fetch year
    useEffect(() => {
        if (isLoading.year === true) {
            getYears().then((years) => {
                setYears(years);
            })
                .finally(() => {
                    setIsLoading({
                        year: false,
                        make: true,
                        model: true,
                        bodyType: true,
                        subModel: true,
                        vehicleData: true
                    })
                })
        }
    }, [isLoading.year]);

    // fetch makes
    useEffect(() => {
        if (isLoading.make === true && selectedYear !== "") {
            getMakes(selectedYear).then((makes) => {
                setMakes(makes);
            })
                .finally(() => {
                    setIsLoading({
                        year: false,
                        make: false,
                        model: true,
                        bodyType: true,
                        subModel: true,
                        vehicleData: true
                    })
                })
        }
    }, [selectedYear, isLoading.make]);

    // fetch model
    useEffect(() => {
        if (isLoading.model === true && selectedYear !== "" && selectedMake !== "") {
            getModels(selectedYear, selectedMake).then((models) => {
                setModels(models);
            })
                .finally(() => {
                    setIsLoading({
                        year: false,
                        make: false,
                        model: false,
                        bodyType: true,
                        subModel: true,
                        vehicleData: true
                    })
                })
        }
    }, [selectedYear, selectedMake, isLoading.model])

    // fetch getBodyTypes
    useEffect(() => {
        if (isLoading.bodyType === true && selectedYear !== "" && selectedMake !== "" && selectedModel !== "") {
            getBodyTypes(selectedYear, selectedMake, selectedModel).then((bodyTypes) => {
                setBodyTypes(bodyTypes);
            })
                .finally(() => {
                    setIsLoading({
                        year: false,
                        make: false,
                        model: false,
                        bodyType: false,
                        subModel: true,
                        vehicleData: true
                    })
                })
        }
    }, [selectedYear, selectedMake, selectedModel, isLoading.bodyType])

    // get getSubModels
    useEffect(() => {
        if (isLoading.subModel === true && selectedYear !== "" && selectedMake !== "" && selectedModel !== "" && selectedBodyType !== "") {
            getSubModels(selectedYear, selectedMake, selectedModel, selectedBodyType).then((subModels) => {
                setSubModels(subModels);
            })
                .finally(() => {
                    setIsLoading({
                        year: false,
                        make: false,
                        model: false,
                        bodyType: false,
                        subModel: false,
                        vehicleData: true
                    })
                })
        }

    }, [selectedYear, selectedMake, selectedModel, selectedBodyType, isLoading.subModel]);

    //get getVehicleData
    useEffect(() => {
        if (selectedSubModel.DRChassisID !== "" && selectedSubModel.DRModelID !== "") {
            setIsDisabledSubmit(true);
            getVehicleData(selectedSubModel.DRModelID, selectedSubModel.DRChassisID).then((vehicleInformation) => {
                setVehicleInformation(vehicleInformation);
            })
        }
    }, [selectedSubModel]);

    // enable submit button when vehicleData (bolt pattern) is available
    useEffect(() => {
        if (vehicleInformation.boltPattern !== "") {
            setIsDisabledSubmit(false);
            setIsLoading({
                year: false,
                make: false,
                model: false,
                bodyType: false,
                subModel: false,
                vehicleData: false
            })
        }
    }, [vehicleInformation])



    const onYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(e.target.value);
        // empty all other selected value
        setSelectedMake("");
        setSelectedModel("");
        setSelectedBodyType("");
        setSelectedSubModel({
            SubModel: "",
            DRChassisID: "",
            DRModelID: ""
        });

        // empty all other list
        setMakes([]);
        setModels([]);
        setBodyTypes([]);
        setSubModels([]);
        setVehicleInformation({
            boltPattern: "",
            frontRimSize: "",
            rearRimSize: "",
            frontCenterBore: "",
            rearCenterBore: "",
            tireSizes: []
        })

        // make all other loading to true
        setIsLoading({
            year: false,
            make: true,
            model: true,
            bodyType: true,
            subModel: true,
            vehicleData: true
        })
        setIsDisabledSubmit(true);
    }
    const onMakeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedMake(e.target.value);
        // empty all other selected value
        setSelectedModel("");
        setSelectedBodyType("");
        setSelectedSubModel({
            SubModel: "",
            DRChassisID: "",
            DRModelID: ""
        });
        // empty all other list
        setModels([]);
        setBodyTypes([]);
        setSubModels([]);
        setVehicleInformation({
            boltPattern: "",
            frontRimSize: "",
            rearRimSize: "",
            frontCenterBore: "",
            rearCenterBore: "",
            tireSizes: []
        })

        // make all other loading to true
        setIsLoading({
            year: false,
            make: false,
            model: true,
            bodyType: true,
            subModel: true,
            vehicleData: true
        })
        setIsDisabledSubmit(true);
    }
    const onModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedModel(e.target.value);
        // empty all other selected value
        setSelectedBodyType("");
        setSelectedSubModel({
            SubModel: "",
            DRChassisID: "",
            DRModelID: ""
        });
        // empty all other list
        setBodyTypes([]);
        setSubModels([]);
        setVehicleInformation({
            boltPattern: "",
            frontRimSize: "",
            rearRimSize: "",
            frontCenterBore: "",
            rearCenterBore: "",
            tireSizes: []
        })
        // make all other loading to true
        setIsLoading({
            year: false,
            make: false,
            model: false,
            bodyType: true,
            subModel: true,
            vehicleData: true
        })
        setIsDisabledSubmit(true);

    }
    const onBodyTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedBodyType(e.target.value);
        // empty all other selected value
        setSelectedSubModel({
            SubModel: "",
            DRChassisID: "",
            DRModelID: ""
        });
        // empty all other list
        setSubModels([]);
        setVehicleInformation({
            boltPattern: "",
            frontRimSize: "",
            rearRimSize: "",
            frontCenterBore: "",
            rearCenterBore: "",
            tireSizes: []
        })
        // make all other loading to true
        setIsLoading({
            year: false,
            make: false,
            model: false,
            bodyType: false,
            subModel: true,
            vehicleData: true   
        })
        setIsDisabledSubmit(true);
    }
    const onSubModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubModel(subModels.find(subModel => subModel.SubModel === e.target.value) as typeof subModels[0]);
    }


    const onSubmit = (e:  MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        if(selectedSubModel.DRChassisID && !isLoading.vehicleData){
            router.push("/collections/product-category/wheels?bolt_pattern_metric=" + vehicleInformation.boltPattern);
        }
    }

    return {
        isYearLoading: isLoading.year,
        isMakeLoading: selectedYear && !isLoading.year && isLoading.make,
        isModelLoading: selectedMake && !isLoading.make && isLoading.model,
        isBodyTypeLoading: selectedModel && !isLoading.model && isLoading.bodyType,
        isSubmodelLoading: selectedBodyType && !isLoading.bodyType && isLoading.subModel,
        shouldShowSubmit: selectedSubModel.DRChassisID && !isLoading.vehicleData || !Boolean(selectedSubModel.DRChassisID),
        years,
        makes,
        models,
        bodyTypes,
        subModels,
        vehicleInformation,
        onYearChange,
        onMakeChange,
        onModelChange,
        onBodyTypeChange,
        onSubModelChange,
        onSubmit,
        isDisabledSubmit
    }
    
}

export default useYmm;