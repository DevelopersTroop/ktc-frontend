import { addToCart } from "@/app/globalRedux/features/cart/cart-slice";
import store, { useAppDispatch } from "@/app/globalRedux/store";
import { TInventoryItem } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { YmmSelector } from "./ymm";

type NormalActionButtonProps = {
    setIsStaggered: React.Dispatch<React.SetStateAction<boolean>>
    product: TInventoryItem
}

export interface CartData {
    cartSerial: string;
    cartPackage: string;
}

export const NormalActionButton: React.FC<NormalActionButtonProps> = ({ setIsStaggered, product }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [ymm, setYmm] = useState<{
        year: string;
        make: string
        model: string
        trim: string
        showError?: boolean
        levelingKit: string
        finish: string
    }>({
        year: "",
        make: "",
        model: "",
        trim: "",
        showError: false,
        finish: "",
        levelingKit: ""
    })
    const [isFitmentNeeded, setIsFitmentNeeded] = useState(false)
    const [openFitmentModal, setOpenFitmentModal] = useState(false)
    const handleBuyWheels = () => {
        if (!isFitmentNeeded && (!ymm.year.length || !ymm.make.length || !ymm.model.length || !ymm.trim.length)) {
            setOpenFitmentModal(true)
            return
        }
        addProductToCart(ymm).then(res => {
            router.push(`/cart?cartPackage=${res.cartPackage}&cartSerial=${res.cartSerial}`)
        })
    }

    const addProductToCart = async (meta?: any) => {
        const data = await new Promise<CartData>((resolve, reject) => {
            try {
                const packageId = uuidv4();
                const cartSerial = uuidv4();
                const metaData = meta || {}
                dispatch(
                    addToCart({
                        product: {
                            ...product,
                            slug: product.slug,
                            title: product.title,
                            cartPackage: packageId,
                            cartSerial: cartSerial,
                            quantity: 4,
                            metaData
                        },
                    })
                );
                setTimeout(() => {
                    const updatedProducts = store.getState().persisted.cart.products;
                    const addedProduct = Object.values(updatedProducts).find(
                        (p) => p._id === product._id && JSON.stringify(p.metaData) === JSON.stringify(metaData)
                    );
                    resolve({ cartSerial: addedProduct?.cartSerial || cartSerial, cartPackage: addedProduct?.cartPackage || packageId })
                }, 1000)
            } catch (error) {
                reject(error)
            }
        })
        return data
    };
    const [addToCartText, setAddToCartText] = useState(
        "Add Tires & Save up to $81!"
    );
    return (
        <div className="flex flex-col gap-y-4">
            <YmmSelector setYmm={setYmm} ymm={ymm} />
            {/* <button
                onClick={() => {
                    setAddToCartText("Adding to cart...");
                    addProductToCart().then((res) => {
                        router.push(`/collections/product-category/tires?cartPackage=${res.cartPackage}&cartSerial=${res.cartSerial}`)
                    })

                }}
                className={"bg-emerald-500 py-3 text-white text-xl rounded w-full"}
            >
                {addToCartText}
            </button> */}
            <button
                onClick={handleBuyWheels}
                className={
                    " py-1 rounded outline outline-1 outline-emerald-500 w-full"
                }
            >
                Buy Wheels Only
            </button>
            <button
                onClick={() => setIsStaggered(true)}
                className={
                    " py-1 rounded outline outline-1 outline-gray-300 bg-gray-100 text-gray-600 w-full"
                }
            >
                Add Staggered Setup
            </button>
            <Dialog open={openFitmentModal} onOpenChange={setOpenFitmentModal}>
                <DialogContent className="max-w-6xl flex flex-col gap-y-12 py-12">
                    <DialogHeader className="mt-14">
                        <DialogTitle className="text-center text-xl text-gray-700">Enter your year, make, and model to confirm fitment</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button onClick={() => {
                            setOpenFitmentModal(false)
                            setYmm(prev => ({ ...prev, showError: true }))
                        }} className="bg-emerald-500 text-white border border-black hover:bg-emerald-500 font-bold text-xl h-10 capitalize">Confirm fitment with vehicle deatils</Button>
                        <Button onClick={() => {
                            addProductToCart().then((res) => {
                                router.push(`/cart?cartPackage=${res.cartPackage}&cartSerial=${res.cartSerial}`)
                            })
                        }} className="font-bold text-xl h-10 border-black hover:bg-transparent capitalize" variant={'outline'}>Proceed without confirming</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}