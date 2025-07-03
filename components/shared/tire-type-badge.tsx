import { TInventoryItem } from '@/app/types/product';
import React, { useEffect } from 'react';

const TireTypeBadge = ({ products }: { products: TInventoryItem[] }) => {
    const [tireType, setTireType] = React.useState<{
        front: string[],
        rear: string[]
    }>({
        front: products[0]?.tire_type,
        rear: products[1]?.tire_type
    });


    // remove off-road from tire type from product card
    useEffect(() => {
        if (tireType?.front.includes('Off-Road / All Terrain')) {
            setTireType({
                ...tireType,
                front: tireType?.front?.filter(type => type !== 'Off-Road / All Terrain')
            })
        }
        if (tireType?.rear?.includes('Off-Road / All Terrain')) {
            setTireType({
                ...tireType,
                rear: tireType?.rear?.filter(type => type !== 'Off-Road / All Terrain')
            })
        }
    }, [products])
    return (
        <div className="flex gap-2 items-start relative">
            {tireType?.front.map((type, index) => (
                type && <div
                    key={products[0].sku + type + index}
                    className="rounded-[5px] px-2 py-1 flex gap-10 justify-center items-center relative bg-[#210203]">
                    <small className="text-sm leading-[17px] text-white">
                        <span className="text-white text-sm font-bold">{type}</span>
                    </small>
                </div>
            ))}
            <div
                className="rounded-[5px] px-2 py-1 flex gap-10 justify-center items-center relative bg-[#1e2ede]">
                <small className="text-sm leading-[17px] text-white">
                    <span className="text-white text-sm font-bold">Best seller</span>
                </small>
            </div>
        </div>
    );
};

export default TireTypeBadge;
