"use client"

import {useDataContext} from "@/context/DataContext";
import {useRef} from "react";

const OutputTable = () => {
    const {
        address,
        date,
        submittedOfferNumber,
        submittedOfferNumber2,
        offerPendingNumber,
        offerPendingNumber2,
        responsePendingNumber,
        responsePendingNumber2,
        notInterestedNumber,
        notInterestedNumber2,
        notes
    } = useDataContext();
    const tableRef = useRef<HTMLTableElement>(null);

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const dateObj = new Date(dateString + 'T00:00:00');
        return dateObj.toLocaleDateString('en-US');
    };


    const totalWithRealtor = Number(submittedOfferNumber) + Number(offerPendingNumber) + Number(responsePendingNumber) + Number(notInterestedNumber)
    const totalWithoutRealtor = Number(submittedOfferNumber2) + Number(offerPendingNumber2) + Number(responsePendingNumber2) + Number(notInterestedNumber2)

    const copyTableToClipboard = async () => {
        if (!tableRef.current) return;

        try {
            const tempDiv = document.createElement('div');

            const cleanTableHTML = tableRef.current ? tableRef.current.outerHTML.replace(
                /<(td|th)([^>]*)>/g,
                (match, tag, attributes) => {
                    const isHeaderCell = tag === 'th';
                    const fontWeight = isHeaderCell ? 'bold' : 'normal';

                    if (attributes.includes('style=')) {
                        return match.replace('style="', `style="font-weight: ${fontWeight}; `);
                    } else {
                        return `<${tag}${attributes} style="font-weight: ${fontWeight};">`;
                    }
                }
            ) : '';

            tempDiv.innerHTML = `
                <div style="font-family: Arial, sans-serif; margin: 20px; font-weight: normal !important;">
                    <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">${address}</div>
                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">${date}</div>
                    <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">Total Groups: ${totalWithRealtor + totalWithoutRealtor}</div>
                    ${cleanTableHTML}
                    ${notes ? `<div style="margin-top: 20px;"><div style="font-weight: bold;">Notes:</div><div style="font-weight: normal;">${notes}</div></div>` : ''}
                </div>
            `;

            if (navigator.clipboard && navigator.clipboard.write) {
                const htmlBlob = new Blob([tempDiv.innerHTML], {type: 'text/html'});
                const textBlob = new Blob([tempDiv.innerText], {type: 'text/plain'});

                const clipboardItem = new ClipboardItem({
                    'text/html': htmlBlob,
                    'text/plain': textBlob
                });

                await navigator.clipboard.write([clipboardItem]);
                console.log("Table copied to clipboard (HTML + text)");
            } else if (navigator.clipboard && navigator.clipboard.writeText) {
                const plainText = tempDiv.innerText;
                await navigator.clipboard.writeText(plainText);
                console.log("Table copied to clipboard (plain text only)");
            } else {
                const range = document.createRange();
                const selection = window.getSelection();

                if (!selection) return;

                document.body.appendChild(tempDiv);

                range.selectNodeContents(tempDiv);
                selection.removeAllRanges();
                selection.addRange(range);

                const successful = document.execCommand("copy");
                if (successful) {
                    console.log("Table copied to clipboard (selection method)");
                } else {
                    console.warn("Copy command failed");
                }

                selection.removeAllRanges();
                document.body.removeChild(tempDiv);
            }
        } catch (error) {
            console.error("Failed to copy table:", error);
            copyTableFallback();
        }
    };

    const copyTableFallback = () => {
        if (!tableRef.current) return;

        try {
            const range = document.createRange();
            const selection = window.getSelection();

            if (!selection) return;

            selection.removeAllRanges();
            range.selectNode(tableRef.current);
            selection.addRange(range);

            const successful = document.execCommand("copy");
            if (successful) {
                console.log("Table copied using fallback method");
            }

            selection.removeAllRanges();
        } catch (error) {
            console.error("Fallback copy also failed:", error);
        }
    };

    return (
        <section className="flex flex-col justify-center items-center mt-44">
            <div className="items-start">
                <div>
                    <h2 className="text-2xl font-semibold">
                        {address}
                    </h2>
                    <h3 className="text-2xl font-semibold">
                        {formatDate(date)}
                    </h3>
                    <h3 className="text-xl font-semibold">Total Groups: {totalWithRealtor + totalWithoutRealtor} </h3>
                </div>
                <table
                    ref={tableRef}
                    className="border-2 border-black border-collapse"
                    style={{border: '2px solid black', borderCollapse: 'collapse'}}
                >
                    <thead>
                    <tr className="border-2 border-black *:border-2 [&>th:nth-child(2)]:text-sm [&>th:nth-child(2)]:font-normal [&>th:nth-child(3)]:text-sm [&>th:nth-child(3)]:font-normal">
                        <th scope="col" className="font-bold w-48 whitespace-nowrap"
                            style={{border: '2px solid black', padding: '8px'}}>Response
                        </th>
                        <th scope="col" className="w-32" style={{border: '2px solid black', padding: '8px'}}>w/ <span
                            className="font-bold text-base">Realtor</span></th>
                        <th scope="col" className="w-32" style={{border: '2px solid black', padding: '8px'}}>w/o <span
                            className="font-bold text-base">Realtor</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="*:border-1 *:border-black">
                        <th className="text-left" style={{border: '1px solid black', padding: '8px'}}>Offer Submitted
                        </th>
                        <td style={{
                            border: '1px solid black',
                            padding: '8px',
                            textAlign: 'center'
                        }}>{submittedOfferNumber}</td>
                        <td style={{
                            border: '1px solid black',
                            padding: '8px',
                            textAlign: 'center'
                        }}>{submittedOfferNumber2}</td>
                    </tr>
                    <tr className="*:border-1 *:border-black">
                        <th className="text-left" style={{border: '1px solid black', padding: '8px'}}>Offer Pending</th>
                        <td style={{
                            border: '1px solid black',
                            padding: '8px',
                            textAlign: 'center'
                        }}>{offerPendingNumber}</td>
                        <td style={{
                            border: '1px solid black',
                            padding: '8px',
                            textAlign: 'center'
                        }}>{offerPendingNumber2}</td>
                    </tr>
                    <tr className="*:border-1 *:border-black">
                        <th className="text-left" style={{border: '1px solid black', padding: '8px'}}>Response Pending
                        </th>
                        <td style={{
                            border: '1px solid black',
                            padding: '8px',
                            textAlign: 'center'
                        }}>{responsePendingNumber}</td>
                        <td style={{
                            border: '1px solid black',
                            padding: '8px',
                            textAlign: 'center'
                        }}>{responsePendingNumber2}</td>
                    </tr>
                    <tr className="*:border-1 *:border-black">
                        <th className="text-left" style={{border: '1px solid black', padding: '8px'}}>Not Interested
                        </th>
                        <td style={{
                            border: '1px solid black',
                            padding: '8px',
                            textAlign: 'center'
                        }}>{notInterestedNumber}</td>
                        <td style={{
                            border: '1px solid black',
                            padding: '8px',
                            textAlign: 'center'
                        }}>{notInterestedNumber2}</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr className="*:border-2 *:border-black">
                        <th style={{border: '2px solid black', padding: '8px'}}>Totals</th>
                        <td style={{
                            border: '2px solid black',
                            padding: '8px',
                            textAlign: 'center'
                        }}>{totalWithRealtor}</td>
                        <td style={{
                            border: '2px solid black',
                            padding: '8px',
                            textAlign: 'center'
                        }}>{totalWithoutRealtor}</td>
                    </tr>
                    </tfoot>
                </table>
                <div className="flex flex-col">
                    <h4 className="font-semibold">
                        Notes:
                    </h4>
                    <div className="prose" dangerouslySetInnerHTML={{__html: notes}}/>
                </div>
            </div>
            <button
                onClick={copyTableToClipboard}
                type="button"
                className="mb-20 px-6 py-2 text-2xl font-bold mt-10 border-2 rounded-md border-gray-200 hover:bg-gray-200 hover:text-slate-900"
            >
                Copy to Clipboard
            </button>
        </section>
    );
}

export default OutputTable