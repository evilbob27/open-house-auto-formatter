"use client"

import {SubmitHandler, useForm, useFieldArray} from "react-hook-form";
import {useEffect} from "react";

type FieldsetData = {
    groupName: string;
    email: string;
    phoneNumber: string;
    isRealtor: string;
    realtor?: string;
}

type FormFields = {
    address: string;
    date: string;
    fieldsets: FieldsetData[];
}

const Form = () => {
    const {
        watch,
        register,
        handleSubmit,
        control,
        setValue,
        formState: {errors}
    } = useForm<FormFields>({
        defaultValues: {
            address: "",
            date: "",
            fieldsets: [{
                groupName: "",
                email: "",
                phoneNumber: "",
                isRealtor: "",
                realtor: ""
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "fieldsets"
    });

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setValue("date", today);
    }, [setValue]);

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log(data);
        alert('Form submitted! Check console for data.');
    };

    const validationPattern = {
        email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    };

    const addFieldset = () => {
        append({
            groupName: "",
            email: "",
            phoneNumber: "",
            isRealtor: "",
            realtor: ""
        });
    };

    return (
        <section className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-20 px-6 py-2">
                    <div className="flex flex-col my-2 items-start">
                        <label className="flex flex-col text-2xl font-semibold">
                            Address
                            <input className="text-lg font-normal border-2 border-gray-200 rounded-md px-1"
                                   {...register("address", {
                                       required: "Address is required",
                                   })}
                                   type="text"
                                   placeholder="Address"
                            />
                            {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address.message}</div>}
                        </label>
                        <label className="flex flex-col text-2xl font-semibold mt-2">
                            Date
                            <input className="text-lg px-1 border-2 border-gray-200 rounded-md"
                                   {...register("date")}
                                   type="date"
                            />
                        </label>
                    </div>

                    <div className="space-y-4">
                        {fields.map((field, index) => {
                            const isRealtorValue = watch(`fieldsets.${index}.isRealtor`);

                            return (
                                <div key={field.id} className="flex flex-col border-2 border-gray-300 rounded-md items-start my-2 px-6 py-4 relative">
                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
                                        >
                                            ✕
                                        </button>
                                    )}

                                    <label className="flex flex-col text-xl font-semibold">
                                        Group Name
                                        <input className="text-lg font-normal border-2 border-gray-200 rounded-md px-1"
                                               {...register(`fieldsets.${index}.groupName`, {
                                                   required: "Group Name is required",
                                               })}
                                               type="text"
                                               placeholder="Group Name"
                                        />
                                        {errors.fieldsets?.[index]?.groupName && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.fieldsets[index]?.groupName?.message}
                                            </div>
                                        )}
                                    </label>

                                    <div className="flex gap-2 mt-2 w-full">
                                        <label className="flex flex-col text-xl font-semibold flex-1">
                                            Email
                                            <input className="text-lg font-normal border-2 border-gray-200 rounded-md px-1"
                                                   {...register(`fieldsets.${index}.email`, {
                                                       required: "Email is required",
                                                       pattern: {
                                                           value: validationPattern.email,
                                                           message: "Invalid email format"
                                                       }
                                                   })}
                                                   type="email"
                                                   placeholder="Email"
                                            />
                                            {errors.fieldsets?.[index]?.email && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.fieldsets[index]?.email?.message}
                                                </div>
                                            )}
                                        </label>
                                        <label className="flex flex-col text-xl font-semibold flex-1">
                                            Phone Number
                                            <input className="text-lg font-normal border-2 border-gray-200 rounded-md px-1"
                                                   {...register(`fieldsets.${index}.phoneNumber`, {
                                                       required: "Phone number is required",
                                                   })}
                                                   type="tel"
                                                   placeholder="Phone Number"
                                            />
                                            {errors.fieldsets?.[index]?.phoneNumber && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.fieldsets[index]?.phoneNumber?.message}
                                                </div>
                                            )}
                                        </label>
                                    </div>

                                    <div className="flex flex-col text-xl font-semibold mt-2">
                                        <span>Realtor</span>
                                        <div className="flex gap-6 mt-1">
                                            <label className="text-lg font-normal">
                                                <input className="mx-2"
                                                       {...register(`fieldsets.${index}.isRealtor`, {
                                                           required: "Please select an option"
                                                       })}
                                                       type="radio"
                                                       value="yes"
                                                />
                                                Yes
                                            </label>
                                            <label className="text-lg font-normal">
                                                <input className="mx-2"
                                                       {...register(`fieldsets.${index}.isRealtor`, {
                                                           required: "Please select an option"
                                                       })}
                                                       type="radio"
                                                       value="no"
                                                />
                                                No
                                            </label>
                                        </div>
                                        {errors.fieldsets?.[index]?.isRealtor && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.fieldsets[index]?.isRealtor?.message}
                                            </div>
                                        )}
                                        {isRealtorValue === "yes" && (
                                            <input
                                                className="text-lg font-normal border-2 border-gray-200 rounded-md px-1 mt-2"
                                                {...register(`fieldsets.${index}.realtor`, {
                                                    required: isRealtorValue === "yes" ? "Realtor information is required" : false,
                                                })}
                                                type="text"
                                                placeholder="Realtor Name"
                                            />
                                        )}
                                        {errors.fieldsets?.[index]?.realtor && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.fieldsets[index]?.realtor?.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={addFieldset}
                            className="border-2 border-gray-200 rounded-md text-3xl font-bold px-[.75rem] hover:bg-gray-200 hover:text-slate-900"
                        >
                            +
                        </button>
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