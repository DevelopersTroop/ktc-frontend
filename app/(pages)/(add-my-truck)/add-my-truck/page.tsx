'use client';

import Container from "@/app/ui/container/container";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AddMyTruckYMMFilters from "./_components/add-my-truck-ymm-filter";

export default function Page() {

    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    return (
        <Container>
            <div className="w-full">
                <div className="w-full pt-3 pb-10">
                    <h3 className="w-full text-center text-2xl font-medium" >Vehicle</h3>
                </div>
                <AddMyTruckYMMFilters />
            </div>
        </Container>
    )
}
