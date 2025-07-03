import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center py-20">
            <div className="spinner border-t-4 border-primary rounded-full w-16 h-16 animate-spin"></div>
        </div>
    );
};

export default LoadingSpinner;