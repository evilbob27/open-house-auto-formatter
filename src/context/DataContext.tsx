"use client"

import React, {createContext, useContext, useState, ReactNode} from "react";

type DataContextType = {
    address: string;
    date: string;
    submittedOfferNumber: number;
    submittedOfferNumber2: number;
    offerPendingNumber: number;
    offerPendingNumber2: number;
    responsePendingNumber: number;
    responsePendingNumber2: number;
    notInterestedNumber: number
    notInterestedNumber2: number;
    notes: string;
    handleSubmit: (e: React.FormEvent) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within the context");
    }
    return context;
};

export const DataProvider = ({children}: { children: ReactNode }) => {
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [submittedOfferNumber, setSubmittedOfferNumber] = useState(0);
    const [submittedOfferNumber2, setSubmittedOfferNumber2] = useState(0);
    const [offerPendingNumber, setOfferPendingNumber] = useState(0);
    const [offerPendingNumber2, setOfferPendingNumber2] = useState(0);
    const [responsePendingNumber, setResponsePendingNumber] = useState(0);
    const [responsePendingNumber2, setResponsePendingNumber2] = useState(0);
    const [notInterestedNumber, setNotInterestedNumber] = useState(0);
    const [notInterestedNumber2, setNotInterestedNumber2] = useState(0);
    const [notes, setNotes] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        setAddress(formData.get("address") as string);
        setDate(formData.get("date") as string);
        setSubmittedOfferNumber(formData.get("submittedOfferNumber") as unknown as number);
        setSubmittedOfferNumber2(formData.get("submittedOfferNumber2") as unknown as number);
        setOfferPendingNumber(formData.get("offerPendingNumber") as unknown as number);
        setOfferPendingNumber2(formData.get("offerPendingNumber2") as unknown as number);
        setResponsePendingNumber(formData.get("responsePendingNumber") as unknown as number);
        setResponsePendingNumber2(formData.get("responsePendingNumber2") as unknown as number);
        setNotInterestedNumber(formData.get("notInterestedNumber") as unknown as number);
        setNotInterestedNumber2(formData.get("notInterestedNumber2") as unknown as number);
        setNotes(formData.get("notes") as string);

        console.log("Form submitted", {
            address: formData.get("address"),
            date: formData.get("date"),
            submittedOfferNumber: formData.get("submittedOfferNumber"),
            submittedOfferNumber2: formData.get("submittedOfferNumber2"),
            offerPendingNumber: formData.get("offerPendingNumber"),
            offerPendingNumber2: formData.get("offerPendingNumber2"),
            responsePendingNumber: formData.get("responsePendingNumber"),
            responsePendingNumber2: formData.get("responsePendingNumber2"),
            notInterestedNumber: formData.get("notInterestedNumber"),
            notInterestedNumber2: formData.get("notInterestedNumber2"),
            notes: formData.get("notes"),
        });
    };

    return (
        <DataContext.Provider value={{ address, date, submittedOfferNumber, submittedOfferNumber2, offerPendingNumber, offerPendingNumber2, responsePendingNumber, responsePendingNumber2, notInterestedNumber, notInterestedNumber2, notes, handleSubmit }}>
            {children}
        </DataContext.Provider>
    );
};