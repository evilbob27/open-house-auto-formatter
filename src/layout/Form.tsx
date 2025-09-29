"use client"

import {SubmitHandler, useForm} from "react-hook-form";

type FormFields = {
    groupName: string;
    realtor: string;
    email: string;
    phoneNumber: string;
}

const Form = () => {
    const {
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>
                    <input
                        {...register("groupName", {
                            required: "Group Name is required",
                        })}
                        type="text"
                        placeholder="Group Name"/>
                    {errors.groupName && <div className="text-red-500">{errors.groupName.message}</div>}
                </label>
                <label>
                    <input
                        {...register("realtor", {
                        required: "Realtor is required",
                        })}
                        type="text"
                        placeholder="Realtor"/>
                    {errors.realtor && <div className="text-red-500">{errors.realtor.message}</div>}
                </label>
                <label>
                    <input
                        {...register("email", {
                        required: "Email is required",
                        })}
                        type="text"
                        placeholder="Email"/>
                    {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                </label>
                <label>
                    <input
                        {...register("phoneNumber", {
                        required: "Phone number is required",
                        })}
                        type="text"
                        placeholder="Phone Number"/>
                    {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber.message}</div>}
                </label>
                <button type="submit">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default Form