"use client"

import Form from "@/layout/Form";
import DataInput from '@/layout/DataInput';
import OutputTable from '@/layout/OutputTable';
import {DataProvider} from "@/context/DataContext";
import {useState} from "react";

export default function Home() {
    const [activeTab, setActiveTab] = useState("Form");

    return (
        <DataProvider>
            <section>
                <div className="mt-2 border-b-2 border-gray-200 *:mx-1 *:px-6 *:py-2 *:border-t-2 *:border-r-2 *:border-l-2 *:border-gray-200 *:hover:bg-gray-200 *:active:bg-gray-300 [&>button]:rounded-t-md">
                    <button
                        onClick={() => setActiveTab("Form")}
                        className={`font-semibold text-lg ${activeTab === "Form" ? "bg-gray-300" : ""}`}
                    >
                    Form
                    </button>
                    <button
                        onClick={() => setActiveTab("DataInput")}
                        className={`font-semibold text-lg ${activeTab === "DataInput" ? "bg-gray-300" : ""}`}
                    >
                    Ledger
                    </button>
                    <button
                        onClick={() => setActiveTab("OutputTable")}
                        className={`font-semibold text-lg ${activeTab === "OutputTable" ? "bg-gray-300" : ""}`}
                    >
                    Table
                    </button>
                </div>
                <div style={{display: activeTab === "Form" ? "block" : "none"}}>
                    <Form/>
                </div>
                <div style={{display: activeTab === "DataInput" ? "block" : "none"}}>
                    <DataInput/>
                </div>
                <div style={{display: activeTab === "OutputTable" ? "block" : "none"}}>
                    <OutputTable/>
                </div>
            </section>
        </DataProvider>
    );
}
