"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";

type FormFields = {
    address: string;
    date: string;
    groupName: string;
    isRealtor: string;  // Added this
    realtor?: string;   // Made optional
    email: string;
    phoneNumber: string;
}

const Form = () => {
    const [date, setDate] = useState("");

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setDate(today);
    }, []);

    const {
        watch,
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log(data);
    };

    const validationPattern = {
        email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    };

    const isRealtorValue = watch("isRealtor");

    return (
        <section className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-8 px-6 py-2">
                    <div className="flex flex-col my-2 items-start">
                        <label className="flex flex-col text-xl font-semibold">
                            Address
                            <input className="text-lg font-normal border-2 border-gray-200 rounded-md px-2 py-1"
                                   {...register("address", {
                                       required: "Address is required",
                                   })}
                                   type="text"
                                   placeholder="Address"
                            />
                            {errors.address && <div className="text-red-500">{errors.address.message}</div>}
                        </label>
                        <label className="flex flex-col text-xl font-semibold mt-2">
                            Date
                            <input className="text-lg px-2 py-1"
                                {...register("date")}
                                type="date"
                                value={date}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col border-2 border-gray-300 rounded-md items-start my-2 px-6 py-4">
                        <label className="flex flex-col text-xl font-semibold">
                            Group Name
                            <input className="text-lg font-normal border-2 border-gray-200 rounded-md px-2 py-1"
                                   {...register("groupName", {
                                       required: "Group Name is required",
                                   })}
                                   type="text"
                                   placeholder="Group Name"
                            />
                            {errors.groupName && <div className="text-red-500">{errors.groupName.message}</div>}
                        </label>

                        <div className="flex gap-2 mt-2">
                            <label className="flex flex-col text-xl font-semibold">
                                Email
                                <input className="text-lg font-normal border-2 border-gray-200 rounded-md px-2 py-1"
                                       {...register("email", {
                                           required: "Email is required",
                                           pattern: {
                                               value: validationPattern.email,
                                               message: "Invalid email format"
                                           }
                                       })}
                                       type="email"
                                       placeholder="Email"
                                />
                                {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                            </label>
                            <label className="flex flex-col text-xl font-semibold">
                                Phone Number
                                <input className="text-lg font-normal border-2 border-gray-200 rounded-md px-2 py-1"
                                       {...register("phoneNumber", {
                                           required: "Phone number is required",
                                       })}
                                       type="tel"
                                       placeholder="Phone Number"
                                />
                                {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber.message}</div>}
                            </label>
                        </div>

                        <div className="flex flex-col text-xl font-semibold mt-2">
                            <span>Realtor</span>
                            <div className="flex gap-6 mt-1">
                                <label className="text-lg font-normal">
                                    <input className="mx-2"
                                           {...register("isRealtor", {
                                               required: "Please select an option"
                                           })}
                                           type="radio"
                                           value="yes"
                                    />
                                    Yes
                                </label>
                                <label className="text-lg font-normal">
                                    <input className="mx-2"
                                           {...register("isRealtor", {
                                               required: "Please select an option"
                                           })}
                                           type="radio"
                                           value="no"
                                    />
                                    No
                                </label>
                            </div>
                            {errors.isRealtor && <div className="text-red-500">{errors.isRealtor.message}</div>}

                            {/* Conditional Realtor Input */}
                            {isRealtorValue === "yes" && (
                                <input
                                    className="text-lg font-normal border-2 border-gray-200 rounded-md px-2 py-1 mt-2"
                                    {...register("realtor", {
                                        required: isRealtorValue === "yes" ? "Realtor information is required" : false,
                                    })}
                                    type="text"
                                    placeholder="Realtor Name"
                                />
                            )}
                            {errors.realtor && <div className="text-red-500">{errors.realtor.message}</div>}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className="px-6 py-2 text-2xl font-bold mt-10 border-2 rounded-md border-gray-200 hover:bg-gray-200 hover:text-slate-900"
                        type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Form