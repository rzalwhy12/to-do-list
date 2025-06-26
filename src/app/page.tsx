// src/app/page.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";

// PASTIKAN SEMUA INI ADALAH DEFAULT EXPORT DARI FILE MASING-MASING
import LoginPage from "./loginpage/page"; // Ini seharusnya komponen LoginPage Anda
import LandingPage from "../component/LandingPage"; // Ini seharusnya komponen LandingPage Anda
import SignupPage from "./loginpage/SignupPage"; // Ini seharusnya komponen SignupPage Anda

// --- Interfaces (Tidak berubah, atau sesuaikan jika ada kebutuhan spesifik) ---
interface TodoItem {
    text: string;
    completed: boolean;
}

interface ConfirmationModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmationModal({ message, onConfirm, onCancel }: ConfirmationModalProps) {
    return (
        <div className="fixed inset-0 bg-gray-900/55 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
                <p className="text-lg mb-6 text-gray-800">{message}</p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                    >
                        Ya
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200"
                    >
                        Tidak
                    </button>
                </div>
            </div>
        </div>
    );
}

function Page() {
    const inTugasname = useRef<HTMLInputElement>(null);

    const [data, setData] = useState<TodoItem[]>([]);
    const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUsername, setLoggedInUsername] = useState<string | null>(null); // Jaga agar bisa null

    // Kontrol tampilan halaman utama
    const [showLoginPage, setShowLoginPage] = useState(false);
    const [showSignupPage, setShowSignupPage] = useState(false);
    const [showLandingPage, setShowLandingPage] = useState(true); // Default: tampilkan landing page dulu

    const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedText, setEditedText] = useState<string>('');

    // --- useEffect: Memuat data dari sessionStorage saat komponen dimuat ---
    useEffect(() => {
        const storedLoginStatus = sessionStorage.getItem('isLoggedIn');
        const storedUsername = sessionStorage.getItem('loggedInUsername');

        if (storedLoginStatus === 'true' && storedUsername) {
            setIsLoggedIn(true);
            setLoggedInUsername(storedUsername);
            setShowLandingPage(false);
            setShowLoginPage(false);
            setShowSignupPage(false);
        } else {
            setIsLoggedIn(false); // Pastikan ini false jika tidak login
            setLoggedInUsername(null); // Pastikan ini null jika tidak login
            setShowLandingPage(true);
            setShowLoginPage(false);
            setShowSignupPage(false);
        }

        const simpan = sessionStorage.getItem('todo');
        if (simpan) {
            try {
                const parsed = JSON.parse(simpan);
                if (Array.isArray(parsed)) {
                    setData(parsed);
                } else {
                    console.error("Data 'todo' bukan array, menghapus penyimpanan.");
                    sessionStorage.removeItem('todo');
                    setData([]);
                }
            } catch (error) {
                console.error("Kesalahan parsing data dari sessionStorage:", error);
                sessionStorage.removeItem('todo');
                setData([]);
            }
        }
    }, []);

    // --- useEffect: Menyimpan data ke sessionStorage saat state relevan berubah ---
    useEffect(() => {
        sessionStorage.setItem('todo', JSON.stringify(data));
        sessionStorage.setItem('isLoggedIn', String(isLoggedIn));
        if (loggedInUsername) {
            sessionStorage.setItem('loggedInUsername', loggedInUsername);
        } else {
            sessionStorage.removeItem('loggedInUsername');
        }

        console.log(
            'State updated - isLoggedIn:', isLoggedIn,
            'loggedInUsername:', loggedInUsername,
            'showLandingPage:', showLandingPage,
            'showLoginPage:', showLoginPage,
            'showSignupPage:', showSignupPage
        );
    }, [data, isLoggedIn, loggedInUsername, showLandingPage, showLoginPage, showSignupPage]);


    // --- Fungsi Handler untuk Aplikasi Todo (tidak ada perubahan signifikan) ---
    function onBtSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
        if (!isLoggedIn) {
            alert("Silakan masuk untuk menambahkan tugas.");
            return;
        }

        if (event.key === "Enter" && inTugasname.current) {
            const newTodoText = inTugasname.current.value.trim();

            if (newTodoText === "") {
                alert("Todo cannot be empty!");
                return;
            }

            const isDuplicate = data.some(item => item.text === newTodoText);

            if (isDuplicate) {
                alert("Tugas ini sudah ada bree!");
            } else {
                setData([...data, { text: newTodoText, completed: false }]);
                inTugasname.current.value = "";
            }
        }
    }

    function toggleTodoCompletion(index: number) {
        const newData = [...data];
        newData[index].completed = !newData[index].completed;
        setData(newData);
    }

    function getFilteredTodos() {
        if (filter === 'Active') {
            return data.filter(item => !item.completed);
        } else if (filter === 'Completed') {
            return data.filter(item => item.completed);
        }
        return data;
    }

    function clearCompletedTodos() {
        setData(data.filter(item => !item.completed));
    }

    function confirmLogout() {
        setShowConfirmLogoutModal(true);
    }

    function handleLogoutConfirmed() {
        setIsLoggedIn(false);
        setLoggedInUsername(null);
        setData([]); // Clear todos on logout
        sessionStorage.removeItem('todo');
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('loggedInUsername');
        setShowLoginPage(false);
        setShowConfirmLogoutModal(false);
        setShowLandingPage(true); // Kembali ke landing page setelah logout
    }

    const handleEditClick = (index: number, text: string) => {
        setEditingIndex(index);
        setEditedText(text);
    };

    const handleSaveEdit = (originalIndex: number) => {
        if (editedText.trim() === "") {
            alert("Todo tidak boleh kosong!");
            return;
        }
        const newData = [...data];
        const isDuplicate = newData.some((item: TodoItem, idx: number) => idx !== originalIndex && item.text.toLowerCase() === editedText.trim().toLowerCase());
        if (isDuplicate) {
            alert("Tugas ini sudah ada bree!");
            return;
        }

        newData[originalIndex].text = editedText.trim();
        setData(newData);
        setEditingIndex(null);
        setEditedText('');
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditedText('');
    };

    function displayData() {
        const filteredTodos = getFilteredTodos();
        return filteredTodos.map((item: TodoItem, index: number) => {
            const originalIndex = data.findIndex(dItem => dItem.text === item.text && dItem.completed === item.completed);
            const isEditing = editingIndex === originalIndex;

            return (
                <div
                    key={`${item.text}-${index}-wrapper`}
                    className="flex items-center p-4 border-b border-gray-300 text-xl text-gray-700 last:border-b-0"
                >
                    <label className="todo-item flex items-center flex-grow cursor-pointer">
                        <input
                            type="checkbox"
                            className="peer opacity-0 absolute w-6 h-6 z-10 cursor-pointer appearance-none"
                            checked={item.completed}
                            onChange={() => toggleTodoCompletion(originalIndex)}
                        />
                        <div className="absolute checkbox-circle w-[25px] h-[25px] rounded-full border border-gray-300 flex justify-center items-center cursor-pointer shrink-0 z-10"></div>
                        <img src="/lalala.png" alt="" className="opacity-0 peer-checked:opacity-100 z-11" />

                        {isEditing ? (
                            <input
                                type="text"
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                className="flex-grow ml-4 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveEdit(originalIndex);
                                    if (e.key === 'Escape') handleCancelEdit();
                                }}
                            />
                        ) : (
                            <span className={`todo-text ml-4 ${item.completed ? 'line-through' : ''}`}>{item.text}</span>
                        )}
                    </label>
                    {isLoggedIn && !isEditing && (
                        <button
                            onClick={() => handleEditClick(originalIndex, item.text)}
                            className="ml-4 px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-200 text-sm shadow-sm"
                        >
                            Edit
                        </button>
                    )}
                    {isEditing && (
                        <div className="ml-4 flex space-x-2">
                            <button
                                onClick={() => handleSaveEdit(originalIndex)}
                                className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-200 text-sm shadow-sm"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="px-3 py-1 bg-gray-400 text-gray-800 rounded-md hover:bg-gray-500 transition-colors duration-200 text-sm shadow-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            );
        });
    }

    const itemsLeft = data.filter(item => !item.completed).length;

    // --- CONDITIONAL RENDERING UTAMA ---
    // Pastikan hanya satu dari ini yang dieksekusi berdasarkan kondisi
    if (showLoginPage) {
        console.log("Rendering LoginPage...");
        return (
            <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setShowLoginPage={setShowLoginPage}
                setLoggedInUsername={setLoggedInUsername} // Langsung passing fungsi state
                setShowLandingPage={setShowLandingPage}
            />
        );
    }

    if (showSignupPage) {
        console.log("Rendering SignupPage...");
        return (
            <SignupPage
                setShowLoginPage={setShowLoginPage}
                setShowSignupPage={setShowSignupPage}
                setShowLandingPage={setShowLandingPage}
            />
        );
    }

    if (showLandingPage) {
        console.log("Rendering LandingPage...");
        return <LandingPage setShowLoginPage={setShowLoginPage} setShowSignupPage={setShowSignupPage} />;
    }

    // Default: Jika tidak ada kondisi di atas yang terpenuhi, tampilkan Todo App (saat sudah login)
    // Ini adalah fallback jika isLogged menjadi true tetapi tidak ada showPage yang true
    console.log("Rendering Todo App (Logged In)...");
    return (
        <div className="min-h-screen flex justify-center">
            <div className="container w-full max-w-xl px-5">
                <header className="relative h-72 w-full flex flex-col items-center justify-start rounded-b-lg ">
                    <div className="absolute top-0 left-0 w-full h-full rounded-b-lg p-7"></div>
                    <div className="relative z-20 w-full flex justify-between items-start pt-8 px-4 mt-30">
                        <div>
                            <h1 className="text-white text-shadow-2xs text-5xl font-bold tracking-[10px] m-0 ">TODO</h1>
                            {isLoggedIn && loggedInUsername && (
                                <p className="text-white text-lg mt-2 ml-1 text-shadow-xs">Selamat datang, {loggedInUsername}!</p>
                            )}
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="bg-none text-shadow-2xs border-none text-white text-3xl cursor-pointer p-1 flex items-center justify-center" aria-label="Toggle theme">
                                &#9789;
                            </button>
                            {isLoggedIn ? (
                                <button
                                    onClick={confirmLogout}
                                    className="px-4 py-2 bg-purple-600 text-white text-sm font-bold text-shadow-amber-500 rounded-md hover:bg-purple-700 transition-colors duration-200 shadow-md"
                                >
                                    Keluar
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowLoginPage(true)}
                                    className="px-4 py-2 bg-white text-purple-600 text-sm rounded-md hover:bg-purple-300 transition-colors duration-200 shadow-md"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                <main className="todo-app mt-[-150px] relative z-10">
                    <div className="create-todo bg-white p-4 rounded-md flex items-center mb-5 mt-30 shadow-lg">
                        <button className="checkbox-circle w-[25px] h-[25px] rounded-full border border-gray-300 flex justify-center items-center cursor-pointer shrink-0"></button>
                        <input
                            type="text"
                            placeholder="Create new todo..."
                            className="flex-grow border-none outline-none bg-none text-xl pl-4 text-gray-700 font-josefin placeholder:text-gray-500"
                            ref={inTugasname}
                            onKeyDown={onBtSubmit}
                            disabled={!isLoggedIn}
                        />
                    </div>

                    <div className="todo-list bg-white rounded-md shadow-lg overflow-hidden">
                        {displayData()}

                        <div className="todo-footer flex justify-between items-center p-4 text-sm text-gray-500">
                            <span>{itemsLeft} Item Left</span>
                            <div className="filter-buttons flex gap-4">
                                <button
                                    className={`bg-none border-none text-gray-500 cursor-pointer font-josefin text-sm ${filter === 'All' ? 'font-bold text-blue-600' : ''}`}
                                    onClick={() => setFilter('All')}
                                >
                                    All
                                </button>
                                <button
                                    className={`bg-none border-none text-gray-500 cursor-pointer font-josefin text-sm ${filter === 'Active' ? 'font-bold text-blue-600' : ''}`}
                                    onClick={() => setFilter('Active')}
                                >
                                    Active
                                </button>
                                <button
                                    className={`bg-none border-none text-gray-500 cursor-pointer font-josefin text-sm ${filter === 'Completed' ? 'font-bold text-blue-600' : ''}`}
                                    onClick={() => setFilter('Completed')}
                                >
                                    Completed
                                </button>
                            </div>
                            <button
                                className="clear-completed-button bg-none border-none text-gray-500 cursor-pointer font-josefin text-sm"
                                onClick={clearCompletedTodos}
                            >
                                Clear Completed
                            </button>
                        </div>
                    </div>

                    <p className="drag-info text-center mt-12 text-sm text-gray-500">Drag and drop to reorder the list</p>
                </main>
            </div>
            {showConfirmLogoutModal && (
                <ConfirmationModal
                    message="Apakah Anda yakin ingin keluar?"
                    onConfirm={handleLogoutConfirmed}
                    onCancel={() => setShowConfirmLogoutModal(false)}
                />
            )}
        </div>
    );
}

export default Page;