import { useEffect, useState } from "react";

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const cookies = Object.fromEntries(
            document.cookie.split(";").map((c) => c.trim().split("="))
        );

        const hasUserId = !!cookies.unspoken_words;
        const hasCookieChoice = !!cookies.unspoken_words_choice;

        if (!hasUserId) {
            const userId = crypto.randomUUID();
            document.cookie = `unspoken_words=${userId}; path=/; max-age=${
                60 * 60 * 24 * 365
            }; SameSite=Lax`;
        }

        if (!hasCookieChoice) {
            setShowBanner(true);
        }
    }, []);

    function handleGotIt() {
        document.cookie = `unspoken_words_choice=accepted; path=/; max-age=${
            60 * 60 * 24 * 365
        }; SameSite=Lax`;
        setShowBanner(false);
    }

    function handleNoThanks() {
        document.cookie = "unspoken_words=; path=/; max-age=0; SameSite=Lax";
        document.cookie = `unspoken_words_choice=rejected; path=/; max-age=${
            60 * 60 * 24 * 365
        }; SameSite=Lax`;
        setShowBanner(false);
    }

    if (!showBanner) return null;

    return (
        <div className="fixed w-full bottom-0 right-0 left-0 bg-white border py-4 px-4 md:px-8 lg:px-16 xl:px-32">
            <p className="text-center w-full">
                <i className="fa-solid fa-cookie-bite text-lg text-slate-800 inline-block me-4" />
                We use cookies to remember you when you visit our site again.
                Don't worry, we don't store any personal information.
            </p>
            <div className="flex items-center gap-16 justify-center mt-4 w-full text-sm">
                <button
                    onClick={handleNoThanks}
                    className="block cursor-pointer border px-2 py-1 rounded-lg underline underline-offset-2 decoration-2 decoration-transparent transition-all hover:decoration-slate-800">
                    No, thanks
                </button>
                <button
                    onClick={handleGotIt}
                    className="block cursor-pointer border px-2 py-1 rounded-lg underline underline-offset-2 decoration-2 decoration-transparent transition-all hover:decoration-slate-800">
                    Got it
                </button>
            </div>
        </div>
    );
}
