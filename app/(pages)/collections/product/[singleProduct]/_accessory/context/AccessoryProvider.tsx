"use client"
import React from 'react';

export type TAccessoryContext = {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const AccessoryContext = React.createContext({} as TAccessoryContext);

const AccessoryProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [quantity, setQuantity] = React.useState(1);
    const value: TAccessoryContext = { quantity, setQuantity }

    return (
        <AccessoryContext.Provider value={value}>
            {children}
        </AccessoryContext.Provider>
    );
};


export default AccessoryProvider;