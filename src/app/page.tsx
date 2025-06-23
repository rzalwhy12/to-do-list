"use client";
import React, { useRef, useState } from "react";

interface TodoItem {
    text: string;
    completed: boolean;
}

function Page() {
    const inTugasname = useRef<HTMLInputElement>(null);

    const [data, setData] = useState<TodoItem[]>([]);
    const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');

    function onBtSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" && inTugasname.current) {
            const newTodoText = inTugasname.current.value.trim();

            if (newTodoText === "") {
                alert("Todo cannot be empty!");
                return;
            }

            const isDuplicate = data.some(item => item.text === newTodoText);

            if (isDuplicate) {
                alert("This todo already exists!");
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

    function displayData() {
        const filteredTodos = getFilteredTodos();
        return filteredTodos.map((item: TodoItem, index: number) => {
            const originalIndex = data.findIndex(dItem => dItem.text === item.text && dItem.completed === item.completed);
            return (
                <label
                    key={`${item.text}-${index}`}
                    className="todo-item flex items-center p-4 border-b border-gray-300 text-xl text-gray-700 cursor-pointer"
                >
                    <input
                        type="checkbox"
                        className="peer opacity-0 absolute w-6 h-6 z-10 cursor-pointer appearance-none"
                        checked={item.completed}
                        onChange={() => toggleTodoCompletion(originalIndex)}
                    />
                    <div className="absolute checkbox-circle w-[25px] h-[25px] rounded-full border border-gray-300 flex justify-center items-center cursor-pointer shrink-0 z-10"></div>
                    <img src="/lalala.png" alt="" className="opacity-0 peer-checked:opacity-100 z-11" />
                    <span className={`todo-text ml-4 ${item.completed ? 'line-through' : ''}`}>{item.text}</span>
                </label>
            );
        });
    }

    const itemsLeft = data.filter(item => !item.completed).length;

    return (
        <div className="min-h-screen flex justify-center">
            <div className="container w-full max-w-xl px-5">
                <header className="relative h-72 w-full flex flex-col items-center justify-start pt-[400px] rounded-b-lg">
                    <div className="absolute top-0 left-0 w-full h-full "></div>
                    <div className="absolute top-36 w-full flex justify-between items-center px-4">
                        <h1 className="text-white text-shadow-2xs text-5xl font-bold tracking-[10px] m-0 ">TODO</h1>
                        <button className="bg-none text-shadow-2xs border-none text-white text-3xl cursor-pointer p-1 flex items-center justify-center" aria-label="Toggle theme">
                            &#9789;
                        </button>
                    </div>
                </header>

                <main className="todo-app mt-[-150px] relative z-10">
                    <div className="create-todo bg-white p-4 rounded-md flex items-center mb-5 shadow-lg">
                        <button className="checkbox-circle w-[25px] h-[25px] rounded-full border border-gray-300 flex justify-center items-center cursor-pointer shrink-0"></button>
                        <input
                            type="text"
                            placeholder="Create a new todo..."
                            className="flex-grow border-none outline-none bg-none text-xl pl-4 text-gray-700 font-josefin placeholder:text-gray-500"
                            ref={inTugasname}
                            onKeyDown={onBtSubmit}
                        />
                    </div>

                    <div className="todo-list bg-white rounded-md shadow-lg overflow-hidden">
                        {displayData()}

                        <div className="todo-footer flex justify-between items-center p-4 text-sm text-gray-500">
                            <span>{itemsLeft} items left</span>
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

                    <p className="drag-info text-center mt-12 text-sm text-gray-500">Drag and drop to reorder list</p>
                </main>
            </div>
        </div>
    );
}

export default Page;