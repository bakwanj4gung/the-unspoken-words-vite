import { useEffect, useRef, useState } from "react";
import colors from "../../lib/colors";

export default function CardInput({
    newClass = "",
    open = false,
    tutorial = false,
    recipientName = "",
    message = "",
    cookie,
}) {
    const [selectedColor, setSelectedColor] = useState();
    const [effect, setEffect] = useState(colors[9].classEffect);
    const [showOption, setShowOption] = useState(open);
    const [recipient, setRecipient] = useState("");
    const [messageValue, setMessageValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalInfo, setModalInfo] = useState(null);

    const ref = useRef(null);

    useEffect(() => {
        if (tutorial) {
            setShowOption(false);
            setEffect(colors[4].classEffect);
            setRecipient(recipientName);
            setMessageValue(message);
        }
    }, [tutorial]);

    const handleInput = (e) => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${e.target.scrollHeight - 0}px`;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/generate-id/");
            const id = await res.json();

            const formData = new FormData(e.target);
            const data = {
                id,
                mood: parseInt(formData.get("mood")),
                recipient: formData.get("recipient"),
                message: formData.get("message"),
                username: cookie,
            };

            const response = await fetch("/api/letter/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            setModalInfo({
                message: result.message,
                code: response.status,
            });

            // RESET
            e.target.reset();
            setRecipient("");
            setMessageValue("");
            setShowOption(false);
        } catch (error) {
            console.error("Error:", error);
            setModalInfo({
                message: error.message || "Terjadi kesalahan",
                code: 500,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`${newClass} ${effect} relative transition-all duration-500 border flex flex-col gap-8 h-fit p-6 rounded-lg text-sm md:mx-auto md:max-w-xl shadow-lg`}>
            <div
                className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${showOption ? "max-h-[500px]" : "max-h-8"}
            `}>
                <button
                    type="button"
                    onClick={() => {
                        setShowOption(!showOption);
                    }}
                    className={`
                        flex items-center gap-4 px-4 py-1.5 rounded-lg cursor-pointer transition-all
                        ${
                            effect == "bg-white border-gray-700 text-gray-700"
                                ? "bg-slate-700 text-white"
                                : "bg-white text-slate-700"
                        }`}>
                    <span>Choose your mood</span>
                    <i
                        className={`fa-regular fa-square-caret-down transition-all duration-500 ${
                            showOption ? "rotate-180" : ""
                        }`}
                    />
                </button>
                <div
                    className={`mt-2 border flex items-center gap-4 bg-white rounded-lg p-2 flex-wrap`}>
                    {colors.map((color) => (
                        <label
                            title={color.name}
                            key={color.id}
                            htmlFor={color.name}
                            onClick={() => {
                                setSelectedColor(color.id);
                                setEffect(color.classEffect);
                            }}
                            className={`${color.class} cursor-pointer rounded-full p-4 ring-gray-300 ring-2`}>
                            <input
                                type="radio"
                                defaultChecked={color.id === 10}
                                id={color.name}
                                value={color.id}
                                className="hidden"
                                name="mood"
                            />
                        </label>
                    ))}
                </div>
            </div>
            <div
                className={`gaegu text-lg border flex items-center gap-2 bg-white transition-all duration-500 focus-within:bg-transparent px-2 rounded-lg 
                    ${
                        effect ==
                            "bg-slate-800 text-white border-transparent" ||
                        effect == "bg-amber-800 text-white border-transparent"
                            ? "text-black focus-within:text-white"
                            : ""
                    } 
                    ${
                        effect == "bg-white border-gray-700 text-gray-700"
                            ? "border-gray-700 focus-within:border-transparent"
                            : "border-transparent"
                    }`}>
                <label htmlFor="reciever" className="font-bold">
                    to:{" "}
                </label>
                <input
                    autoComplete="off"
                    required
                    type="text"
                    maxLength={30}
                    placeholder="Name of recipient"
                    name="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    readOnly={tutorial}
                    className="font-bold block w-full bg-transparent outline-none placeholder:opacity-55"
                />
            </div>
            <textarea
                required
                ref={ref}
                rows={1}
                onInput={handleInput}
                name="message"
                id="message"
                placeholder="Write your message here"
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                readOnly={tutorial}
                // gaegu
                className={`gaegu text-base border flex grow w-full min-h-20 h-auto overflow-hidden outline-none bg-white p-2 rounded-lg transition-all duration-500 focus:bg-transparent placeholder:opacity-55 
                    ${
                        effect == "bg-white border-gray-700 text-gray-700"
                            ? "border-gray-700 focus:border-transparent "
                            : "border-transparent "
                    }
                    ${
                        effect ==
                            "bg-slate-800 text-white border-transparent" ||
                        effect == "bg-amber-800 text-white border-transparent"
                            ? "text-black focus:text-white"
                            : ""
                    }
                `}
            />
            <button
                disabled={loading}
                type="submit"
                style={{ fontFamily: "inherit" }}
                className="disabled:bg-gray-200 disabled:pointer-events-none bg-gray-900 p-2 rounded-lg text-white font-medium cursor-pointer transition-all duration-300 hover:bg-slate-700">
                {loading ? "Loading..." : "Send"}
            </button>
            {modalInfo && (
                <ModalMessage
                    message={modalInfo.message}
                    code={modalInfo.code}
                    onClose={() => setModalInfo(null)}
                />
            )}
        </form>
    );
}

const ModalMessage = ({ message, code, onClose }) => {
    console.log(message);
    return (
        <div className="absolute right-1 left-1 top-1 bottom-1 flex flex-col items-center justify-center gap-4 rounded-lg bg-white border-4">
            <p
                className={`${
                    code == 200 ? "" : "text-red-500"
                } text-center text-2xl font-bold`}>
                {message}
            </p>
            <p
                className={`${
                    code == 200 ? "block" : "hidden"
                } text-center text-xl font-bold`}>
                You'll find the history right below.
            </p>
            <button
                onClick={() => onClose()}
                className={`${
                    code == 200
                        ? "bg-slate-700 text-white"
                        : "font-bold border-red-500 text-red-500 bg-white hover:bg-red-50"
                } border-2 px-4 py-2 rounded-lg cursor-pointer hover:opacity-90`}>
                Okay
            </button>
        </div>
    );
};
