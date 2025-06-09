"use client";

import {inputTableHeaders} from "@/data";
import {useState, useEffect} from "react";
import {useDataContext} from "@/context/DataContext";
import TextEditor from "@/components/TextEditor";

const DataInput = () => {
    const [date, setDate] = useState("");
    const {handleSubmit} = useDataContext();

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setDate(today);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault();
                const currentInput = event.target as HTMLInputElement | null;
                if (currentInput && currentInput instanceof HTMLInputElement) {
                    const index = parseFloat(currentInput.dataset.index || "0");
                    const nextInput = document.querySelector(`[data-index="${index + 1}"]`) as HTMLInputElement | null;
                    if (nextInput) {
                        nextInput.focus();
                    }
                }
            }
        };

        const form = document.getElementById("inputForm");
        if (form) {
            form.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            if (form) {
                form.removeEventListener("keydown", handleKeyDown);
            }
        };
    }, []);


    return (
        <section className="flex flex-col items-center justify-center w-full">
            <form id="inputForm" className="mt-20" onSubmit={handleSubmit}>
                <div className="my-4 flex flex-col">
                    <label className="text-xl font-semibold">Address</label>
                    <input type="text"
                           name="address"
                           required placeholder="Enter address"
                           data-index="1"
                           className="text-lg"
                    />
                </div>
                <div className="my-4 flex flex-col">
                    <label className="text-xl font-semibold">Date</label>
                    <input type="date"
                           id="dateInput"
                           name="date"
                           value={date}
                           onChange={(e) => setDate(e.target.value)}
                           data-index="2"
                           className="text-lg"
                    />
                </div>
                {inputTableHeaders.map(({label, index, inputName}, key) => (
                    <div key={key} className="my-4 flex flex-col">
                        <label className="text-xl font-semibold">
                            {label}
                        </label>
                        <div className="*:px-1">
                            <input type="number"
                                   name={inputName}
                                   placeholder="w/ Realtor"
                                   data-index={index}
                                   className="text-lg"
                            />
                            <input type="number"
                                   name={inputName + "2"}
                                   placeholder="w/o Realtor"
                                   data-index={index + 1}
                                   className="text-lg"
                            />
                        </div>
                    </div>
                ))}
                <div className="flex flex-col overflow-auto">
                    <label className="text-xl font-semibold mb-2">Notes</label>
                        <TextEditor/>
                </div>
                <button type="submit"
                        className="mx-52 px-6 py-2 text-2xl font-bold mt-10 border-2 rounded-md border-gray-200 hover:bg-gray-200 hover:text-slate-900">
                    Format
                </button>
            </form>
        </section>
    );
}

export default DataInput