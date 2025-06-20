import React from "react";

function Page() {
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
            <div className="checkbox-circle w-[25px] h-[25px] rounded-full border border-gray-300 flex justify-center items-center cursor-pointer shrink-0"></div>
            <input
            type="text"
            placeholder="Create a new todo..."
            className="flex-grow border-none outline-none bg-none text-xl pl-4 text-gray-700 font-josefin placeholder:text-gray-500"
            />
        </div>

        <div className="todo-list bg-white rounded-md shadow-lg overflow-hidden">
            <div className="todo-item flex items-center p-4 border-b border-gray-300 text-xl text-gray-700 cursor-pointer completed">
            <div className="checkbox-circle w-[25px] h-[25px] rounded-full border-none flex justify-center items-center shrink-0 bg-gradient-to-br from-[#57DDFF] to-[#C058F3]">
                <span className="text-white text-sm">✔</span>
            </div>
            <span className="todo-text flex-grow line-through text-gray-500 ml-4">Complete online JavaScript course</span>
            </div>
            <div className="todo-item flex items-center p-4 border-b border-gray-300 text-xl text-gray-700 cursor-pointer">
            <div className="checkbox-circle w-[25px] h-[25px] rounded-full border border-gray-300 flex justify-center items-center shrink-0"></div>
            <span className="todo-text ml-4">Jog around the park 3x</span>
            </div>
            <div className="todo-item flex items-center p-4 border-b border-gray-300 text-xl text-gray-700 cursor-pointer">
            <div className="checkbox-circle w-[25px] h-[25px] rounded-full border border-gray-300 flex justify-center items-center shrink-0"></div>
            <span className="todo-text ml-4">10 minutes meditation</span>
            </div>
            <div className="todo-item flex items-center p-4 border-b border-gray-300 text-xl text-gray-700 cursor-pointer">
            <div className="checkbox-circle w-[25px] h-[25px] rounded-full border border-gray-300 flex justify-center items-center shrink-0"></div>
            <span className="todo-text ml-4">Read for 1 hour</span>
            </div>
            <div className="todo-item flex items-center p-4 border-b border-gray-300 text-xl text-gray-700 cursor-pointer">
            <div className="checkbox-circle w-[25px] h-[25px] rounded-full border border-gray-300 flex justify-center items-center shrink-0"></div>
            <span className="todo-text ml-4">Pick up groceries</span>
            </div>
            <div className="todo-item flex items-center p-4 text-xl text-gray-700 cursor-pointer">
            <div className="checkbox-circle w-[25px] h-[25px] rounded-full border border-gray-300 flex justify-center items-center shrink-0"></div>
            <span className="todo-text ml-4">Complete Todo App on Frontend Mentor</span>
            </div>

            <div className="todo-footer flex justify-between items-center p-4 text-sm text-gray-500">
            <span>5 items left</span>
            <div className="filter-buttons flex gap-4">
                <button className="bg-none border-none text-gray-500 cursor-pointer font-josefin text-sm font-bold ">All</button>
                <button className="bg-none border-none text-gray-500 cursor-pointer font-josefin text-sm">Active</button>
                <button className="bg-none border-none text-gray-500 cursor-pointer font-josefin text-sm">Completed</button>
            </div>
            <button className="clear-completed-button bg-none border-none text-gray-500 cursor-pointer font-josefin text-sm">Clear Completed</button>
            </div>
        </div>

        <p className="drag-info text-center mt-12 text-sm text-gray-500">Drag and drop to reorder list</p>
        </main>
    </div>
    </div>
);
}

export default Page;