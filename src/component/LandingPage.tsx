// src/components/LandingPage.tsx
"use client";

import React from 'react';

interface LandingPageProps {
    setShowLoginPage: (show: boolean) => void;
    setShowSignupPage: (show: boolean) => void;
}

function LandingPage({ setShowLoginPage, setShowSignupPage }: LandingPageProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 text-white p-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-8 animate-fade-in-down drop-shadow-lg">
                Selamat Datang di TODO App
            </h1>
            <p className="text-xl md:text-2xl text-center mb-12 max-w-2xl animate-fade-in delay-200">
                Atur hidupmu, selesaikan tugasmu, raih tujuanmu.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                    onClick={() => {
                        console.log("Tombol Masuk diklik dari LandingPage. Mengatur showLoginPage ke true.");
                        setShowLoginPage(true);
                    }}
                    className="px-8 py-4 bg-white text-purple-700 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                >
                    Masuk
                </button>
                <button
                    onClick={() => {
                        console.log("Tombol Daftar Akun Baru diklik dari LandingPage. Mengatur showSignupPage ke true.");
                        setShowSignupPage(true);
                    }}
                    className="px-8 py-4 bg-purple-700 text-white rounded-full font-bold text-lg shadow-lg border-2 border-white hover:bg-purple-800 transform hover:scale-105 transition-all duration-300"
                >
                    Daftar Akun Baru
                </button>
            </div>
        </div>
    );
}

export default LandingPage; // PASTIKAN ADA DEFAULT EXPORT INI