// src/app/loginpage/page.tsx
"use client";

import React, { useState } from "react";
import Backendless from '../../lib/backendless';
import SignupPage from "./SignupPage";

interface LoginPageProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setShowLoginPage: (show: boolean) => void;
    setLoggedInUsername: (username: string | null) => void; // Harus string | null
    setShowLandingPage: (show: boolean) => void;
}

function LoginPage({ setIsLoggedIn, setShowLoginPage, setLoggedInUsername, setShowLandingPage }: LoginPageProps) {
    const [username, setUsername] = useState(''); // Ini harus email
    const [password, setPassword] = useState('');
    const [showSignupPage, setShowSignupPage] = useState(false);

    const handleLogin = async () => {
        if (username.trim() === '' || password.trim() === '') {
            alert("Email dan kata sandi tidak boleh kosong.");
            return;
        }

        try {
            // Kita cast user ke 'any' di sini untuk mengatasi masalah tipe 'name' dan 'email'
            const user = await Backendless.UserService.login(username, password, true) as any; // Cast ke 'any'

            setIsLoggedIn(true);
            setLoggedInUsername(user.name || user.email || null); // Mengatasi 'name' tidak ada dan menerima null
            setShowLoginPage(false);
            setShowLandingPage(false);
        } catch (error: any) {
            console.error("Kesalahan login:", error);
            alert("Nama pengguna atau kata sandi tidak valid atau belum di konfirmasi."); //
        }
    };

    if (showSignupPage) {
        return <SignupPage setShowLoginPage={setShowLoginPage} setShowSignupPage={setShowSignupPage} setShowLandingPage={setShowLandingPage} />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100/30 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md ">
                <h2 className="text-4xl font-bold text-center mb-8 text-purple-700">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Nama Pengguna (Email)
                    </label>
                    <input
                        type="email"
                        id="username"
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="Masukkan email Anda"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Kata Sandi
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-200"
                        placeholder="Masukkan kata sandi Anda"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-purple-400 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                    Masuk
                </button>
                <button
                    onClick={() => setShowSignupPage(true)}
                    className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                    Daftar Akun Baru
                </button>
                <button
                    onClick={() => setShowLoginPage(false)}
                    className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                    Batal
                </button>
            </div>
        </div>
    );
}

export default LoginPage;