"use client";

import React, { useRef, useState, useEffect, createContext, useContext } from "react";


interface MessageModalProps {
    message: string;
    onClose: () => void;
    type?: 'success' | 'error' | 'info';
}

const MessageModal: React.FC<MessageModalProps> = ({ message, onClose, type = 'info' }) => {
    let bgColorClass = 'bg-blue-500'; // Default untuk info
    if (type === 'success') bgColorClass = 'bg-green-500';
    else if (type === 'error') bgColorClass = 'bg-red-500';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white shadow-xl p-6 max-w-sm w-full text-center rounded-xl">
                <div className={`p-3 rounded-full inline-flex items-center justify-center ${bgColorClass} text-white mb-4`}>
                    {type === 'success' && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                    {type === 'error' && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    )}
                    {type === 'info' && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    )}
                </div>
                <p className="text-gray-800 text-lg mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md rounded-xl"
                >
                    OKE
                </button>
            </div>
        </div>
    );
};

// =======================================================
// --- Konteks Aplikasi untuk manajemen state global dan tampilan ---
// =======================================================
// Konteks ini menyediakan status login dan fungsi untuk mengelola tampilan aplikasi
// ke seluruh komponen anak. Ini menghindari "prop drilling" (meneruskan prop secara manual
// melalui banyak tingkat komponen).
interface AppContextType {
    isLoggedIn: boolean;
    loginUser: () => void;
    logoutUser: () => void;
    setView: (view: 'todo' | 'signup' | 'login') => void;
    view: 'todo' | 'signup' | 'login';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Hook kustom untuk menggunakan AppContext. Memudahkan akses ke state dan fungsi global.
const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

// --- Antarmuka Item Tugas ---
// Mendefinisikan struktur data untuk setiap item tugas.
interface TodoItem {
    id: string; // ID unik untuk setiap tugas
    text: string; // Teks atau deskripsi tugas
    completed: boolean; // Status apakah tugas sudah selesai
    createdAt: number; // Timestamp pembuatan untuk pengurutan
}

function SignupPage() {
    const { loginUser, setView } = useAppContext(); // Mengambil fungsi login dan setView dari konteks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('info');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setModalMessage(null);

        if (!email || !password || !confirmPassword) {
            setModalMessage("Semua bidang wajib diisi.");
            setModalType('info');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setModalMessage("Kata sandi tidak cocok.");
            setModalType('error');
            setLoading(false);
            return;
        }

        // Simulasi pendaftaran berhasil: menampilkan pesan dan mengubah status login.
        setModalMessage("Akun berhasil dibuat! Anda sekarang masuk.");
        setModalType('success');
        loginUser(); // Mengatur status login ke true
        setLoading(false);
        setView('todo'); // Beralih ke halaman todo
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
            {modalMessage && <MessageModal message={modalMessage} type={modalType} onClose={() => setModalMessage(null)} />}
            <div className="bg-white p-8  shadow-lg w-full max-w-md rounded-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Daftar</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                            placeholder="Masukkan email Anda"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Kata Sandi
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                            placeholder="Masukkan kata sandi Anda"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Konfirmasi Kata Sandi
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                            placeholder="Konfirmasi kata sandi Anda"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50 rounded-xl"
                            disabled={loading}
                        >
                            {loading ? "Mendaftar..." : "Daftar"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setView('login')}
                            className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
                        >
                            Sudah punya akun? Masuk
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// =======================================================
// --- Komponen Halaman Masuk (Simulasi) ---
// =======================================================
// Menangani simulasi proses login pengguna. Mirip dengan SignupPage,
// ini hanya mengubah status login di frontend.
function LoginPage() {
    const { loginUser, setView } = useAppContext(); // Mengambil fungsi login dan setView dari konteks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('info');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setModalMessage(null);

        if (!email || !password) {
            setModalMessage("Email dan kata sandi wajib diisi.");
            setModalType('info');
            setLoading(false);
            return;
        }

        // Simulasi login berhasil: menampilkan pesan dan mengubah status login.
        setModalMessage("Berhasil masuk!");
        setModalType('success');
        loginUser(); // Mengatur status login ke true
        setLoading(false);
        setView('todo'); // Beralih ke halaman todo
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
            {modalMessage && <MessageModal message={modalMessage} type={modalType} onClose={() => setModalMessage(null)} />}
            <div className="bg-white p-8 shadow-lg w-full max-w-md rounded-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Masuk</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                            placeholder="Masukkan email Anda"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Kata Sandi
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                            placeholder="Masukkan kata sandi Anda"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50 rounded-xl"
                            disabled={loading}
                        >
                            {loading ? "Masuk..." : "Masuk"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setView('signup')}
                            className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
                        >
                            Belum punya akun? Daftar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;