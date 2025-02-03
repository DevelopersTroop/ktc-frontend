"use client"
import Link from 'next/link';
import React from 'react';

const PaginationItem = ({disabled=false, active=false, href="#", children}: {disabled?: boolean, children: React.ReactNode, href?: string, active?:boolean}) => {
    return (
        !active ?
       ( <li>
            <Link {...!disabled ? {href} : {href: "#"}} 
               className="flex items-center justify-center px-3 rounded-sm h-9 leading-tight font-semibold text-gray-900 text-sm bg-gray-200 hover:bg-gray-300">{children}</Link>
        </li>) :
            (<li>
                <Link href={href} aria-current="page"
                   className="flex items-center justify-center px-3 rounded-sm h-9 leading-tight font-semibold text-white text-sm bg-primary hover:bg-white hover:text-primary hover:outline hover:outline-1">{children}</Link>
            </li>)
    );
};

export default PaginationItem;