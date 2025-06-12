import React, { useState } from "react";
import { useLocation } from "react-router";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const {pathname} = useLocation();

    return (
        <div className="md:hidden">
            <div
                className={`
                    ${isOpen ? "fixed right-5" : "absolute right-1"}
                    flex flex-col top-10 z-50 gap-[4.5px] cursor-pointer`}
                onClick={() => setIsOpen((prev) => !prev)}>
                <div
                    className={`w-6 h-1 bg-slate-600 rounded-sm transition-all ease-in-out duration-300 ${
                        isOpen ? "rotate-45 origin-left" : ""
                    }`}
                />
                <div
                    className={`w-6 h-1 bg-slate-600 rounded-sm transition-all ease-in-out duration-300 ${
                        isOpen ? "opacity-0" : ""
                    }`}
                />
                <div
                    className={`w-6 h-1 bg-slate-600 rounded-sm transition-all ease-in-out duration-300 ${
                        isOpen ? "-rotate-45 origin-left" : ""
                    }`}
                />
            </div>
            <div
                className={`
                    ${
                        isOpen
                            ? "translate-x-0"
                            : "translate-x-[100%] shadow-transparent"
                    }
                    transition-all duration-300 shadow-2xl rounded-lg fixed right-0 top-0 pt-48 px-12 h-svh text-gray-500 font-semibold whitespace-nowrap bg-white flex flex-col items-center gap-8 text-xl z-10
            `}>
                <a
                    onClick={() => setIsOpen((prev) => !prev)}
                    href={pathname != "/" ? "/#write" : "#write"}
                    className={`transition-all underline underline-offset-3 decoration-2 
                        ${
                            pathname == "/#write"
                                ? "decoration-black text-black"
                                : "decoration-transparent hover:decoration-black hover:text-black"
                        }
                    `}>
                    Send a letter
                </a>
                <a
                    onClick={() => setIsOpen((prev) => !prev)}
                    href={"/search"}
                    className={`transition-all underline underline-offset-3 decoration-2 
                        ${
                            pathname == "/search"
                                ? "decoration-black text-black"
                                : "decoration-transparent hover:decoration-black hover:text-black"
                        }
                    `}>
                    Search a letter
                </a>
                <a
                    onClick={() => setIsOpen((prev) => !prev)}
                    href={"/"}
                    className={`transition-all underline underline-offset-3 decoration-2 
                        ${
                            pathname == "/about"
                                ? "decoration-black text-black"
                                : "decoration-transparent hover:decoration-black hover:text-black"
                        }
                    `}>
                    About
                </a>
            </div>
        </div>
    );
}
