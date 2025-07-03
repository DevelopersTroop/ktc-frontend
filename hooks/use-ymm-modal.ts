"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/globalRedux/store";
import { closeModal, openModal } from "@/app/globalRedux/features/year-make-model-modal/year-make-model-modal-slice";
import { clearYearMakeModel, setYmm } from "@/app/globalRedux/features/year-make-model/year-make-model-slice";
import { apiBaseUrl } from "../app/utils/api";


const useYmmModal = () => {
    const yearMakeMode = useSelector((state: RootState) => state.yearMakeModel);
    const dispatch = useDispatch();
    const hasYmm = () => {
        return yearMakeMode.year !== "";
    };
    const closeYmmModal = () => {
        dispatch(closeModal())
    }
    const openYmmModal = () => {
        dispatch(openModal())
    }
    const clearYmmModal = () => {
        dispatch(clearYearMakeModel())
    }

    const getSavedYmmFromUserMeta = async (accessToken: string) => {
        const res = await fetch(`${apiBaseUrl}/auth/meta?key=ymm`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        })
        const result = await res.json();
        if (result.statusCode === 200) {
            const ymm = result.data.meta?.[0]?.value?.[0] as { year: string, make: string, model: string } ?? null;
            if (ymm) {
                return {
                    year: ymm.year,
                    make: ymm.make,
                    model: ymm.model
                }
            } else {
                return {
                    year: "",
                    make: "",
                    model: ""
                }
            }

        } else {
            return {
                year: "",
                make: "",
                model: ""
            }
        }
    }

    const setSavedYmmDataFromUserMetaToStore = async (accessToken: string) => {
        const ymm = await getSavedYmmFromUserMeta(accessToken);
        if (Object.values(ymm).every(data => data === "")) {
            return clearYmmModal()
        }
        dispatch(setYmm(ymm))
    }

    const setYmmUserMeta = async ({
        accessToken,
        year,
        make,
        model
    }:
        {
            accessToken: string,
            year: string,
            make: string,
            model: string
        }
    ) => {
        if (year === "" && make === "" && model === "") {
            clearYmmModal();
        } else {
            dispatch(setYmm({
                year,
                make,
                model
            }));
        }
        const res = await fetch(`${apiBaseUrl}/auth/meta`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                "meta": [
                    {
                        "key": "ymm",
                        "value": [
                            {
                                "year": year,
                                "make": make,
                                "model": model
                            }
                        ]
                    }
                ]
            })
        })
        const result = await res.json();
        if (result.statusCode === 200) {
            const ymm = result.data.meta?.[0]?.value?.[0] as { year: string, make: string, model: string } ?? null;
            if (ymm) {
                const structuredYmm = {
                    year: ymm.year,
                    make: ymm.make,
                    model: ymm.model
                }
                return structuredYmm;
            } else {
                return {
                    year: "",
                    make: "",
                    model: ""
                };
            }

        } else {
            return {
                year: "",
                make: "",
                model: ""
            }
        }
    }


    return { hasYmm, closeYmmModal, setYmmUserMeta, openYmmModal, clearYmmModal, setSavedYmmDataFromUserMetaToStore, getSavedYmmFromUserMeta }
};
export default useYmmModal;

