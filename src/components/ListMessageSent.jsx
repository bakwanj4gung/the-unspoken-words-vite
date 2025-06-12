import { useState } from "react";

export default function ListMessageSent({ data }) {
    const baseUrl = import.meta.env.BASE_URL;
    const [copied, setCopied] = useState(null);

    function formatDate(par) {
        const date = new Date(par);
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Jakarta",
        }).format(date);
        return formattedDate;
    }

    const handleCopy = async (id, par) => {
        try {
            await navigator.clipboard.writeText(par);
            setCopied(id);
            setTimeout(() => {
                setCopied(null);
            }, 1000);
        } catch (err) {
            console.error("failed: " + err);
        }
    };
    return (
        <div className="flex flex-col gap-2 w-full">
            {data.map((letter) => {
                return (
                    <div
                        key={letter.id}
                        className="flex items-center justify-between w-full px-2 py-0.5 border rounded-lg">
                        <p className="w-full truncate">
                            Sent: {formatDate(letter.createdAt)} (UTC + 7)
                        </p>
                        <div className="flex items-center gap-2">
                            <a
                                href={`/message/${letter.id}`}
                                target="_blank"
                                className="flex items-center gap-2 whitespace-nowrap border px-1.5 py-0.5 rounded-lg cursor-pointer transition-all duration-300 text-slate-700 hover:bg-slate-700 hover:text-white">
                                <i className="fa-solid fa-arrow-up-right-from-square text-sm" />
                                <span className="hidden sm:inline">Open</span>
                            </a>
                            <button
                                type="button"
                                onClick={() =>
                                    handleCopy(
                                        letter.id,
                                        `${baseUrl}/message/${letter.id}`
                                    )
                                }
                                className="flex items-center gap-2 whitespace-nowrap border px-1.5 py-0.5 rounded-lg cursor-pointer transition-all duration-300 text-slate-700 hover:bg-slate-700 hover:text-white">
                                {copied == letter.id ? (
                                    <i className="fa-solid fa-circle-check text-sm" />
                                ) : (
                                    <i className="fa-solid fa-copy text-sm" />
                                )}
                                <span className="transition-all duration-300 hidden sm:inline">
                                    {copied == letter.id ? "Copied" : "Copy"}
                                </span>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
