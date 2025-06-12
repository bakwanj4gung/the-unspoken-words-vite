import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router';

function LetterSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentQuery = searchParams.get("q") || "";
    const [inputValue, setInputValue] = useState(currentQuery);
    const [letters, setLetters] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const loaderRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmed = inputValue.trim();

        if (trimmed) {
            setSearchParams({ q: trimmed });
        } else {
            setSearchParams({});
        }
    };

    useEffect(() => {
        setInputValue(currentQuery);
    }, [currentQuery]);

    return (
        <>
            <form
                onSubmit={handleSearch}
                className="flex gap-4 w-full mt-8"
            >
                <input
                    autoComplete="off"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    type="text"
                    name="search"
                    className="min-w-0 flex-1 border px-4 py-2 sm:text-lg rounded-lg outline-none"
                />
                <button
                    type="submit"
                    className="bg-slate-800 px-4 py-2 rounded-lg text-sm text-white cursor-pointer transition-all hover:opacity-85"
                >
                    Search
                </button>
            </form>
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8"
            >
                {/* LOOPING */}
                {letters && letters.map((letter) => (
                    <CardMessage data={letter} />
                ))}
            </div>
            {/* Error Message */}
            {error && <Error />}

            {/* Message */}
            {!error && (
                <Message loadRef={loaderRef} loading={loading} more={hasMore} />
            )}
        </>
    )
}

export default LetterSearch


const CardMessage = ({ data }) => {
    if (!data) return;
    return (
        <Link
            key={data.id}
            s
            href={`/message/${data.id}`}
            target="_blank"
            className={`gaegu border ${data.addClass} flex flex-col items-center gap-4 p-4 w-full rounded-lg h-[150px] overflow-hidden transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl`}>
            <p className="w-full truncate font-bold text-2xl">
                to: {data.recipient}
            </p>
            <p className="w-full line-clamp-3 text-base">{data.message}</p>
        </Link>
    );
};

const Error = () => {
    return (
        <div className="mx-auto w-fit mt-8 text-center">
            <p>Something just happened, we're going to fix it.</p>
            <p>😅😅</p>
        </div>
    );
};

const Message = ({ loadRef, loading, more=false }) => {
    return (
        <div ref={loadRef} className="p-4 text-center">
            {loading && <p>Loading...</p>}
            {!more && <p>No more letters.</p>}
        </div>
    );
};