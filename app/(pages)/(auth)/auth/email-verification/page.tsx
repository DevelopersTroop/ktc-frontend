"use client";

import { useEffect, useState } from 'react';
import {  useRouter, useSearchParams } from 'next/navigation';
import { apiBaseUrl } from '@/app/utils/api';

const EmailVerification = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [verificationStarted, setVerificationStarted] = useState(false);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const token = searchParams.get('token');
                const email = searchParams.get('email');
                const response = await fetch(`${apiBaseUrl}/auth/email-verification`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token, email }),
                });
                const result = await response.json();
                if (result.statusCode === 200) {
                    router.push("/");
                } else {
                    if(result.errors[0]?.message === "Email already verified"){
                        router.push("/");
                    }else {
                        router.push("/auth/email-verification-failed");
                    }
                }
            } catch (error) {
                router.push("/auth/email-verification-failed");
            }
        };
        if (searchParams.get('token') && !verificationStarted) {
            setVerificationStarted(true);
            verifyEmail();
        }
    }, []);

    return (
        <div className='py-56 text-center text-3xl'>
            Please wait...
        </div>
    );
};

export default EmailVerification;