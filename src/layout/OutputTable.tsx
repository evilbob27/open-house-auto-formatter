"use client"

import { useDataContext} from "@/context/DataContext";

const OutputTable = () => {
    const {address, date, submittedOfferNumber, submittedOfferNumber2, offerPendingNumber, offerPendingNumber2, responsePendingNumber, responsePendingNumber2, notInterestedNumber, notInterestedNumber2, notes} = useDataContext();
    const totalWithRealtor = Number(submittedOfferNumber) + Number(offerPendingNumber) + Number(responsePendingNumber) + Number(notInterestedNumber)
    const totalWithoutRealtor = Number(submittedOfferNumber2) + Number(offerPendingNumber2) + Number(responsePendingNumber2) + Number(notInterestedNumber2)

    return (
        <section className="flex flex-col justify-center items-center w-full mt-44">
            <h2 className="text-2xl font-semibold">
                 {address}
            </h2>
            <h3 className="text-2xl font-semibold">
                {date}
            </h3>
            <table className="border-2 border-black border-collapse">
                <thead>
                <tr className="border-2 border-black *:border-2 [&>th:nth-child(2)]:text-sm [&>th:nth-child(2)]:font-normal [&>th:nth-child(3)]:text-sm [&>th:nth-child(3)]:font-normal">
                    <th scope="col" className="font-bold w-40">Response</th>
                    <th scope="col" className="w-32">w/ <span className="font-bold text-base">Realtor</span></th>
                    <th scope="col" className="w-32">w/o <span className="font-bold text-base">Realtor</span></th>
                </tr>
                </thead>
                <tbody>
                <tr className="*:border-1 *:border-black">
                    <th className="text-left">Offer Submitted</th>
                    <td>{submittedOfferNumber}</td>
                    <td>{submittedOfferNumber2}</td>
                </tr>
                <tr className="*:border-1 *:border-black">
                    <th className="text-left">Offer Pending</th>
                    <td>{offerPendingNumber}</td>
                    <td>{offerPendingNumber2}</td>
                </tr>
                <tr className="*:border-1 *:border-black">
                    <th className="text-left">Response Pending</th>
                    <td>{responsePendingNumber}</td>
                    <td>{responsePendingNumber2}</td>
                </tr>
                <tr className="*:border-1 *:border-black">
                    <th className="text-left">Not Interested</th>
                    <td>{notInterestedNumber}</td>
                    <td>{notInterestedNumber2}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr className="*:border-2 *:border-black">
                    <th>Totals</th>
                    <td>{totalWithRealtor}</td>
                    <td>{totalWithoutRealtor}</td>
                </tr>
                </tfoot>
            </table>
            <h3>Total Groups: {totalWithRealtor+totalWithoutRealtor} </h3>
            <div>
                <h4>
                    Notes:
                </h4>
                <p>
                    {notes}
                </p>
            </div>
            <button type="button"
                    className="mb-20 px-6 py-2 text-2xl font-bold mt-10 border-2 rounded-md border-gray-200 hover:bg-gray-200 hover:text-slate-900">
                Copy to Clipboard
            </button>
        </section>
    );
}

export default OutputTable