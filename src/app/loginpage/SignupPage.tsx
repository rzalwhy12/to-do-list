// src/app/loginpage/SignupPage.tsx
"use client";

import React, { useState } from 'react';
import Backendless from '../../lib/backendless';

interface SignupPageProps {
    setShowLoginPage: (show: boolean) => void;
    setShowSignupPage: (show: boolean) => void;
    setShowLandingPage: (show: boolean) => void;
}

// HAPUS DEFINISI CustomBackendlessUser INI UNTUK SEMENTARA
// interface CustomBackendlessUser extends Backendless.User {
//     name?: string;
//     email?: string;
//     password?: string;
//     objectId?: string;
// }

function SignupPage({ setShowLoginPage, setShowSignupPage, setShowLandingPage }: SignupPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {
        if (email.trim() === '' || password.trim() === '') {
            alert("Email dan kata sandi tidak boleh kosong.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Konfirmasi kata sandi tidak cocok.");
            return;
        }

        try {
            const user = new Backendless.User();
            
            // PERBAIKAN: Pastikan Backendless.User() dapat menerima properti ini
            // Jika masih ada error 'password' atau 'email' tidak ada, cast 'user as any' di sini juga.
            // Namun, secara teori, Backendless.User harus memiliki email dan password.
            user.email = email;
            user.password = password;
            
            // PERBAIKAN: Cast 'user' ke 'any' saat menetapkan properti 'name'
            (user as any).name = email; // Ini mengatasi "Property 'name' does not exist on type 'User'."

            const registeredUser = await Backendless.UserService.register(user);
            console.log("Pendaftaran berhasil:", registeredUser);
            alert("Pendaftaran berhasil! Silakan masuk.");

            setShowSignupPage(false);
            setShowLoginPage(true);
        } catch (error: any) {
            console.error("Kesalahan pendaftaran:", error);
            alert("Pendaftaran gagal: " + (error.message || "Terjadi kesalahan."));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100/30 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md ">
                <h2 className="text-4xl font-bold text-center mb-8 text-green-700">Daftar Akun Baru</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="signup-email"
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Masukkan email Anda"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">
                        Kata Sandi
                    </label>
                    <input
                        type="password"
                        id="signup-password"
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Buat kata sandi"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                        Konfirmasi Kata Sandi
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-200"
                        placeholder="Konfirmasi kata sandi"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleSignup}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                    Daftar
                </button>
                <button
                    onClick={() => {
                        setShowSignupPage(false);
                        setShowLoginPage(true);
                    }}
                    className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                    Sudah punya akun? Masuk
                </button>
            </div>
        </div>
    );
}

export default SignupPage;