// LoginPage.tsx
"use client";

import React, { useState } from "react";

interface LoginPageProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setShowLoginPage: (show: boolean) => void;
    setLoggedInUsername: (username: string) => void;
}

function LoginPage({ setIsLoggedIn, setShowLoginPage, setLoggedInUsername }: LoginPageProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Simple login logic (no Firebase)
        if (username.trim() === '' || password.trim() === '') {
            alert("Nama pengguna dan kata sandi tidak boleh kosong.");
            return;
        }

        // For demonstration, let's assume any non-empty username/password is valid
        // In a real application, you'd validate against a backend or specific credentials.
        setIsLoggedIn(true);
        setLoggedInUsername(username);
        setShowLoginPage(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100/30 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md ">
                <h2 className="text-4xl font-bold text-center mb-8 text-purple-700">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Nama Pengguna
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="Masukkan nama pengguna Anda"
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
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-400"
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