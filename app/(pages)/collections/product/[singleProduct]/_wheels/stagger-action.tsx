import { addToCart } from "@/app/globalRedux/features/cart/cart-slice"
import store, { RootState, useAppDispatch } from "@/app/globalRedux/store"
import { Button } from "@/components/ui/button"
import { TInventoryItem } from "@/types/product"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from 'uuid'
import { CartData } from "./normal-action"
export const StaggeredActionButton: React.FC<{ product: TInventoryItem }> = ({ product }) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const addProductToCart = async (quantity: number, meta?: RootState['persisted']['cart']['products'][string]['metaData']) => {
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
                            quantity,
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

    const handleSquareSetup = () => {
        addProductToCart(4, { isSquare: true }).then(res => {
            router.push(`/cart?cartPackage=${res.cartPackage}&cartSerial=${res.cartSerial}`)
        })
    }
    const handleFrontWheel = () => {
        addProductToCart(2, { isFrontWheel: true }).then(res => {
            router.push(`/cart?cartPackage=${res.cartPackage}&cartSerial=${res.cartSerial}`)
        })
    }

    const handleRearWheel = () => {
        addProductToCart(2, { isRearWheel: true }).then(res => {
            router.push(`/cart?cartPackage=${res.cartPackage}&cartSerial=${res.cartSerial}`)
        })
    }
    return (
        <div className="flex flex-col gap-y-4">
            <div>
                <div className="flex items-center justify-center gap-2">
                    <hr className="w-6 border-gray-700 border-[1.5px]" />
                    <h2 className="uppercase font-bold text-gray-700 text-lg">Square Setup</h2>
                    <hr className="w-6 border-gray-700 border-[1.5px]" />
                </div>
                <Button onClick={handleSquareSetup} className="w-full uppercase font-medium h-12 text-lg bg-primary hover:bg-primary-hover">buy all (4) of this size</Button>
            </div>
            <div>
                <div className="flex items-center justify-center gap-2">
                    <hr className="w-6 border-gray-700 border-[1.5px]" />
                    <h2 className="uppercase font-bold text-gray-700 text-lg">STAGGERED SETUP</h2>
                    <hr className="w-6 border-gray-700 border-[1.5px]" />
                </div>
                <Button onClick={handleFrontWheel} className="w-full uppercase font-medium h-12 text-lg bg-primary hover:bg-primary-hover">buy as front wheels</Button>
            </div>
            <div>
                <div className="flex items-center justify-center gap-2">
                    <hr className="w-6 border-gray-700 border-[1.5px]" />
                    <h2 className="uppercase font-bold text-gray-700 text-lg">STAGGERED SETUP</h2>
                    <hr className="w-6 border-gray-700 border-[1.5px]" />
                </div>
                <Button onClick={handleRearWheel} className="w-full uppercase font-medium h-12 text-lg bg-primary hover:bg-primary-hover">buy as rear wheels</Button>
            </div>
        </div>
    )
}
