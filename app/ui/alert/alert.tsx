import React from 'react';

const Alert = ({ children, type }: { children: React.ReactNode, type: "success" | "failed" }) => {
    const colors = type === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700";
    return (
        <div className={`mt-3 border  px-4 py-3 relative ${colors}`} role="alert">
            <span className={'block sm:inline'}>{children}</span>
        </div>
    );
};

export default Alert;