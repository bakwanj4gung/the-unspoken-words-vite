import { useEffect, useState } from 'react';
import words from '../../lib/words';

export default function Hero() {
    const [randomIndex, setRandomIndex] = useState(2)
    const [animateKey, setAnimateKey] = useState(0);

    useEffect(() => {
        const changeWord = () => {
            const newIndex = Math.floor(Math.random() * words.length);
            setRandomIndex(newIndex);
            setAnimateKey(prev => prev + 1);
        };

        changeWord();
        
        const interval = setInterval(changeWord, 120000);

        return () => clearInterval(interval);
    }, [words]);

    if (!words || words.length === 0) {
        return <div>Loading...</div>;
    }

    const safeIndex = randomIndex >= words.length ? 0 : randomIndex;

    return (
        <div className="mansalva flex flex-col h-64 items-center justify-center lowercase md:mx-auto md:max-w-86">
            <p key={`text1-${animateKey}`} className='animate-fadeIn duration-500 text-5xl text-center w-full'>{words[safeIndex].words}{words[safeIndex].words2 ? ',' : ''} </p>
            <p key={`text2-${animateKey}`} className="animate-fadeIn duration-500 delay-100 text-xl text-center">{words[safeIndex].words2}</p>
        </div>
    )
}
