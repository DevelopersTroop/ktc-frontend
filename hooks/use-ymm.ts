"use client"
import { setYmm } from "@/app/globalRedux/features/year-make-model/year-make-model-slice";
import { useTypedSelector } from "@/app/globalRedux/store";
import { getBodyTypes, getMakes, getModels, getSubModels, getVehicleData, getYears, getUpStepWheels } from "@/lib/driver-right-api";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useYmm = () => {
    const router = useRouter();
    const dispatch = useDispatch();


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
        }
    }, [isLoading.year]);

    // fetch makes
    useEffect(() => {
        if (isLoading.make === true && ymm.year !== "") {
            getMakes(ymm.year).then((makes) => {
                dispatch(setYmm({ list: { makes } }))
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
    }, [JSON.stringify(ymm.year), isLoading.make]);

    // fetch model
    useEffect(() => {
        if (isLoading.model === true && ymm.year !== "" && ymm.make !== "") {
            getModels(ymm.year, ymm.make).then((models) => {
                dispatch(setYmm({ list: { models } }))
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
    }, [JSON.stringify(ymm.make), isLoading.model])

    // fetch getBodyTypes
    useEffect(() => {
        if (isLoading.bodyType === true && ymm.year !== "" && ymm.make !== "" && ymm.model !== "") {
            getBodyTypes(ymm.year, ymm.make, ymm.model).then((bodyTypes) => {
                dispatch(setYmm({ list: { bodyTypes } }))
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
    }, [JSON.stringify(ymm.model), isLoading.bodyType])

    // get getSubModels
    useEffect(() => {
        if (isLoading.subModel === true && ymm.year !== "" && ymm.make !== "" && ymm.model !== "" && ymm.bodyType !== "") {
            getSubModels(ymm.year, ymm.make, ymm.model, ymm.bodyType).then((subModels) => {
                dispatch(setYmm({ list: { subModels } }))
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

    }, [JSON.stringify(ymm.bodyType), isLoading.subModel]);

    //get getVehicleData
    useEffect(() => {
        if (ymm.subModel.DRChassisID !== "" && ymm.subModel.DRModelID !== "") {
            setIsDisabledSubmit(true);
            getVehicleData(ymm.subModel?.DRModelID ?? "", ymm.subModel?.DRChassisID ?? "").then((vehicleInformation) => {
                dispatch(setYmm({ vehicleInformation }));
            })
        }
    }, [JSON.stringify(ymm.subModel)]);

    // enable submit button when vehicleData (bolt pattern) is available
    useEffect(() => {
        if (ymm.vehicleInformation.boltPattern !== "") {
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
    }, [JSON.stringify(ymm.vehicleInformation)])



    const onYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setYmm({ year: e.target.value, make: "", model: "", bodyType: "", subModel: { SubModel: "", DRChassisID: "", DRModelID: "" } }));
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
    const onMakeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setYmm({ make: e.target.value, model: "", bodyType: "", subModel: { SubModel: "", DRChassisID: "", DRModelID: "" } }));
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
    const onModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setYmm({ model: e.target.value, bodyType: "", subModel: { SubModel: "", DRChassisID: "", DRModelID: "" } }));
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
    const onBodyTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setYmm({ bodyType: e.target.value, subModel: { SubModel: "", DRChassisID: "", DRModelID: "" } }));
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
    const onSubModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (ymm.list?.subModels) {
            dispatch(setYmm({ subModel: ymm.list.subModels.find(subModel => subModel.SubModel === e.target.value) as typeof ymm.list.subModels[0] }));
        }
    }

 
    const onSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        if (ymm.subModel.DRChassisID && !isLoading.vehicleData) {
            
            router.push("/collections/product-category/wheels?vehicle=selectedVehicleInformation");
        }
    }

    useEffect(() => {
        console.log(ymm.list.years)
    }, [ymm.list.years])

    return {
        isYearLoading: isLoading.year,
        isMakeLoading: ymm.year && !isLoading.year && isLoading.make,
        isModelLoading: ymm.make && !isLoading.make && isLoading.model,
        isBodyTypeLoading: ymm.model && !isLoading.model && isLoading.bodyType,
        isSubmodelLoading: ymm.bodyType && !isLoading.bodyType && isLoading.subModel,
        shouldShowSubmit: ymm.subModel.DRChassisID && !isLoading.vehicleData || !Boolean(ymm.subModel.DRChassisID),
        onYearChange,
        onMakeChange,
        onModelChange,
        onBodyTypeChange,
        onSubModelChange,
        onSubmit,
        isDisabledSubmit,
        ...ymm
    }

}

export default useYmm;