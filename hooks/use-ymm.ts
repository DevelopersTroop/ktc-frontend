"use client"
import { setYmm, submitYmm } from "@/app/globalRedux/features/year-make-model/year-make-model-slice";
import { useTypedSelector } from "@/app/globalRedux/store";
import { getBodyTypes, getMakes, getModels, getSubModels, getVehicleData, getYears, getUpStepWheels } from "@/lib/driver-right-api";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useYmm = (isWheel:boolean = true) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [selectedVehicle, setSelectedVehicle] = useState<{
        year?: string,
        make?: string,
        model?: string,
        bodyType?: string,
        subModel?: {
            SubModel?: string,
            DRChassisID?: string,
            DRModelID?: string
        },
        vehicleInformation?: {
            supportedWheels: {
                diameter: number;
                width: number;
                upStepType: string;
                minOffset: number;
                maxOffset: number;
                comments: string;
            }[];
            boltPattern: string;
            frontRimSize: string;
            rearRimSize: string;
            frontCenterBore: string;
            rearCenterBore: string;
            maxWheelLoad: string;
            tireSizes: Record<"front" | "rear", string>[];
            tireSizesList?: string[]
        }
    } | null>(null);

    const [isLoading, setIsLoading] = useState({
        year: true,
        make: true,
        model: true,
        bodyType: true,
        subModel: true,
        vehicleData: true
    })

    const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
    const ymm = useTypedSelector(state => state.yearMakeModel)

    // fetch year
    useEffect(() => {
        if (isLoading.year === true && ymm.list?.years?.length === 0 && ymm.year === "") {
            getYears().then((years) => {
                dispatch(setYmm({ list: { years } }))
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
        } else {
            setIsLoading({
                year: false,
                make: true,
                model: true,
                bodyType: true,
                subModel: true,
                vehicleData: true
            })
        }
    }, [isLoading.year]);

    // fetch makes
    useEffect(() => {
        if (isLoading.make === true && selectedVehicle && selectedVehicle?.year) {
            getMakes(selectedVehicle?.year).then((makes) => {
                dispatch(setYmm({ list: { makes } }))
            })
                .finally(() => {
                    if (selectedVehicle?.year) {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: false,
                            subModel: false,
                            vehicleData: false
                        })
                    } else {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: true,
                            bodyType: true,
                            subModel: true,
                            vehicleData: true
                        })
                    }
                })
        }
    }, [JSON.stringify(selectedVehicle?.year), isLoading.make]);

    // fetch model
    useEffect(() => {
        if (isLoading.model === true && selectedVehicle && selectedVehicle?.year && selectedVehicle?.make) {
            getModels(selectedVehicle?.year, selectedVehicle.make).then((models) => {
                dispatch(setYmm({ list: { models } }))
            })
                .finally(() => {
                    if (selectedVehicle?.make) {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: false,
                            subModel: false,
                            vehicleData: false
                        })
                    } else {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: true,
                            subModel: true,
                            vehicleData: true
                        })
                    }
                })
        }
    }, [JSON.stringify(selectedVehicle?.make), isLoading.model])

    // fetch getBodyTypes
    useEffect(() => {
        if (isLoading.bodyType === true && selectedVehicle && selectedVehicle?.year && selectedVehicle?.make && selectedVehicle?.model) {
            getBodyTypes(selectedVehicle?.year, selectedVehicle?.make, selectedVehicle?.model).then((bodyTypes) => {
                dispatch(setYmm({ list: { bodyTypes } }))
            })
                .finally(() => {
                    if (selectedVehicle?.model) {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: false,
                            subModel: false,
                            vehicleData: false
                        })
                    } else {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: false,
                            subModel: true,
                            vehicleData: true
                        })
                    }

                })
        }
    }, [JSON.stringify(selectedVehicle?.model), isLoading.bodyType])

    // get getSubModels
    useEffect(() => {
        if (isLoading.subModel === true && selectedVehicle && selectedVehicle?.year && selectedVehicle?.make && selectedVehicle?.model && selectedVehicle?.bodyType) {
            getSubModels(selectedVehicle?.year, selectedVehicle?.make, selectedVehicle?.model, selectedVehicle?.bodyType).then((subModels) => {
                dispatch(setYmm({ list: { subModels } }))
            })
                .finally(() => {
                    if (selectedVehicle?.bodyType) {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: false,
                            subModel: false,
                            vehicleData: false
                        })
                    } else {
                        setIsLoading({
                            year: false,
                            make: false,
                            model: false,
                            bodyType: false,
                            subModel: false,
                            vehicleData: true
                        })
                    }

                })
        }

    }, [JSON.stringify(selectedVehicle?.bodyType), isLoading.subModel]);

    //get getVehicleData
    useEffect(() => {
        if (selectedVehicle?.subModel?.DRChassisID && selectedVehicle?.subModel?.DRModelID) {
            setIsDisabledSubmit(true);
            getVehicleData(selectedVehicle?.subModel?.DRModelID ?? "", selectedVehicle?.subModel?.DRChassisID ?? "").then((vehicleInformation) => {
                setSelectedVehicle((prev) => ({
                    ...prev,
                    vehicleInformation: vehicleInformation
                }))
            })
        }
    }, [JSON.stringify(selectedVehicle?.subModel)]);

    // enable submit button when vehicleData (bolt pattern) is available
    useEffect(() => {
        if (selectedVehicle?.vehicleInformation?.boltPattern) {
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
    }, [JSON.stringify(selectedVehicle?.vehicleInformation)])



    const onYearChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
        setSelectedVehicle((prev) => ({
            ...prev,
            year: typeof data === 'string' ? data : data.target.value,
            make: "",
            model: "",
            bodyType: "",
        }))
        // empty all other list
        dispatch(setYmm({
            list: {
                makes: [],
                models: [],
                bodyTypes: [],
                subModels: []
            },
            vehicleInformation: {
                boltPattern: "",
                frontRimSize: "",
                rearRimSize: "",
                frontCenterBore: "",
                rearCenterBore: "",
                maxWheelLoad: "",
                tireSizes: [],
                supportedWheels: []
            }
        }))

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
    const onMakeChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
        setSelectedVehicle((prev) => ({
            ...prev,
            make: typeof data === 'string' ? data : data.target.value,
            model: "",
            bodyType: "",
        }))
        // empty all other list
        dispatch(setYmm({
            list: {
                models: [],
                bodyTypes: [],
                subModels: []
            },
            vehicleInformation: {
                boltPattern: "",
                frontRimSize: "",
                rearRimSize: "",
                frontCenterBore: "",
                rearCenterBore: "",
                maxWheelLoad: "",
                tireSizes: [],
                supportedWheels: []
            }
        }))

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
    const onModelChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
        setSelectedVehicle((prev) => ({
            ...prev,
            model: typeof data === 'string' ? data : data.target.value,
            bodyType: "",
        }))
        // empty all other list
        dispatch(setYmm({
            list: {
                bodyTypes: [],
                subModels: []
            },
            vehicleInformation: {
                boltPattern: "",
                frontRimSize: "",
                rearRimSize: "",
                frontCenterBore: "",
                rearCenterBore: "",
                maxWheelLoad: "",
                tireSizes: [],
                supportedWheels: []
            }
        }))

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
    const onBodyTypeChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
        setSelectedVehicle((prev) => ({
            ...prev,
            bodyType: typeof data === 'string' ? data : data.target.value,
        }))
        // empty all other list
        dispatch(setYmm({
            list: {
                subModels: []
            },
            vehicleInformation: {
                boltPattern: "",
                frontRimSize: "",
                rearRimSize: "",
                frontCenterBore: "",
                rearCenterBore: "",
                maxWheelLoad: "",
                tireSizes: [],
                supportedWheels: []
            }
        }))
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
    const onSubModelChange = (data: ChangeEvent<HTMLSelectElement> | string) => {
        const value = typeof data === 'string' ? data : data.target.value;
        if (ymm.list?.subModels) {
            setSelectedVehicle((prev) => ({
                ...prev,
                subModel: ymm.list.subModels?.find(subModel => subModel.SubModel === value) as typeof ymm.list.subModels[0]
            }))
        }
    }


    const onSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        if(!isWheel && selectedVehicle?.vehicleInformation){
            selectedVehicle.vehicleInformation.tireSizesList = Array.from(new Set(Object.values(selectedVehicle?.vehicleInformation?.tireSizes ?? {}).flatMap((sizes: Record<"front" | "rear", string>) => [sizes.front.replace(/(\/\d+)[A-Z]+(\d+)/, '$1-$2'), sizes.rear.replace(/(\/\d+)[A-Z]+(\d+)/, '$1-$2')])))
        }
        const vehicleInformation = isWheel ? { ...(selectedVehicle?.vehicleInformation ?? {}), tireSizes: [] } : { ...(selectedVehicle?.vehicleInformation ?? {}), supportedWheels: [] }
        dispatch(setYmm({
            year: selectedVehicle?.year,
            make: selectedVehicle?.make,
            model: selectedVehicle?.model,
            bodyType: selectedVehicle?.bodyType,
            subModel: selectedVehicle?.subModel,
            vehicleInformation
        }))
        if (selectedVehicle?.subModel?.DRChassisID && !isLoading.vehicleData) {
            dispatch(submitYmm({}));
            if(isWheel){
                router.push("/collections/product-category/wheels?vehicle=selectedVehicleInformation");
            } else {
                router.push("/collections/product-category/tires?tire_size="+selectedVehicle?.vehicleInformation?.tireSizesList?.join(','));
            }
        }
    }


    return {
        isYearLoading: isLoading.year,
        isMakeLoading: ymm.year && !isLoading.year && isLoading.make,
        isModelLoading: ymm.make && !isLoading.make && isLoading.model,
        isBodyTypeLoading: ymm.model && !isLoading.model && isLoading.bodyType,
        isSubmodelLoading: ymm.bodyType && !isLoading.bodyType && isLoading.subModel,
        shouldShowSubmit: selectedVehicle?.subModel?.DRChassisID && !isLoading.vehicleData || !Boolean(selectedVehicle?.subModel?.DRChassisID),
        onYearChange,
        onMakeChange,
        onModelChange,
        onBodyTypeChange,
        onSubModelChange,
        onSubmit,
        isDisabledSubmit,
        ...ymm,
        ...selectedVehicle
    }

}

export default useYmm;