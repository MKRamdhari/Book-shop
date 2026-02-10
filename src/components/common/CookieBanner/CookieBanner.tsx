"use client";

import Link from "next/link";
import React, { useState } from "react";

const CookieBanner: React.FC = () => {
    const [showBanner, setShowBanner] = useState(() => {
        if (typeof window !== "undefined") {
            return !localStorage.getItem("cookie-consent");
        }
        return false;
    });

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setShowBanner(false);
    };

    const declineCookies = () => {
        localStorage.setItem("cookie-consent", "declined");
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 bg-[#5c5c5c] text-white p-4 flex flex-col md:flex-row justify-between items-center z-50 gap-2"
        >
            <p className="text-sm max-w-xl">
                We use cookies to improve your experience on our website. By
                continuing, you agree to our{" "}
                <Link href="/legal#cookiepolicy" className="underline">
                    Cookie Policy
                </Link>.
            </p>

            <div className="flex gap-2">
                <button
                    className="bg-[#0b0b0b] hover:bg-[#0b0b0b] text-white px-4 py-2 rounded"
                    onClick={declineCookies}
                >
                    Decline
                </button>

                <button
                    className="bg-primary hover:bg-primary text-black px-4 py-2 rounded"
                    onClick={acceptCookies}
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;
