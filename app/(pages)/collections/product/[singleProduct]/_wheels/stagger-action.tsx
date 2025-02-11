import { addToCart } from "@/app/globalRedux/features/cart/cart-slice"
import { useAppDispatch } from "@/app/globalRedux/store"
import { TInventoryItem } from "@/app/types/product"
import { Button } from "@/components/ui/button"
import { v4 } from 'uuid'
export const StaggeredActionButton: React.FC<{ product: TInventoryItem }> = ({ product }) => {
    const dispatch = useAppDispatch()

    const handleSquareSetup = () => {
        const cartSerial = v4()
        const cartPackage = v4()
        dispatch(addToCart({
            product: {
                ...product,
                cartPackage,
                cartSerial,
                quantity: 4,
                metaData: {
                    isSquare: true
                }
            }
        }))
    }
    return (
        <div className="flex flex-col gap-y-4">
            <div>
                <div className="flex items-center justify-center gap-2">
                    <hr className="w-6 border-gray-700 border-[1.5px]" />
                    <h2 className="uppercase font-bold text-gray-700 text-lg">Square Setup</h2>
                    <hr className="w-6 border-gray-700 border-[1.5px]" />
                </div>
                <Button className="w-full uppercase font-medium h-12 text-lg bg-emerald-500 hover:bg-emerald-500">buy all (4) of this size</Button>
            </div>
            <div>
                <div className="flex items-center justify-center gap-2">
                    <hr className="w-6 border-gray-700 border-[1.5px]" />
                    <h2 className="uppercase font-bold text-gray-700 text-lg">STAGGERED SETUP</h2>
                    <hr className="w-6 border-gray-700 border-[1.5px]" />
                </div>
                <Button className="w-full uppercase font-medium h-12 text-lg bg-emerald-500 hover:bg-emerald-500">buy as front wheels</Button>
            </div>
            <div>
                <div className="flex items-center justify-center gap-2">
                    <hr className="w-6 border-gray-700 border-[1.5px]" />
                    <h2 className="uppercase font-bold text-gray-700 text-lg">STAGGERED SETUP</h2>
                    <hr className="w-6 border-gray-700 border-[1.5px]" />
                </div>
                <Button className="w-full uppercase font-medium h-12 text-lg bg-emerald-500 hover:bg-emerald-500">buy as rear wheels</Button>
            </div>
        </div>
    )
}