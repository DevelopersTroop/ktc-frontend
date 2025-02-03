"use client"
import { RootState } from '@/app/globalRedux/store';
import React from 'react';
import { useSelector } from 'react-redux';

const DesktopMenu = ({ children, className = "", isSubmenu=false }: { isSubmenu?: boolean, children: React.ReactNode, className?: string }) => {
    const { isMenuLock } = useSelector((state: RootState) => state.menu);
    return (
        <div className={`hidden ${isMenuLock ? "group-hover:hidden" : (isSubmenu ? "" : "group-hover:block")} ${className}`}>
            {children}
        </div>
    );
};

export default DesktopMenu;