import React from 'react';

const Select = ({className = "", children, ...props}: {className?:string, "children": React.ReactNode, [propKey: string]: any}) => {
    return (
        <select  className={`${className} w-full border border-btext px-3 py-3.5 foucs:outline-none focus-within:outline-none`} {...props}>
            {children}
        </select>
    );
};

export default Select;