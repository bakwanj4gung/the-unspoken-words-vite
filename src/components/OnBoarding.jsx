import { useState } from 'react'
import CardInput from './CardInput'

export default function OnBoarding({onClose}) {
    const [tutorial, setTutorial] = useState(false)
    const [recipient, setRecipient] = useState('')
    const [message, setMessage] = useState('')
    const [step, setStep] = useState(1);

    const beforeFinish = () => {
        setStep(step+1)
        setTutorial(true)
        setRecipient('Hasan, my big brother')
        setMessage("Hey bro, I just wanna say sorry about yesterday. You know I didn’t mean it. I was in a hurry at that time, and I accidentally stepped on your toy. I tried to fix it, but I think it’s really broken. I wish I could say this to you directly, but I’m too shy. I hope this letter gets to you. Anyway, I’m really sorry again. 😢")
    }

    const handleClear = () => {
        onClose()
        setTutorial(false)
        setRecipient('')
        setMessage('')
        setStep(1)
    };

    return (
        <div className='fixed z-99 bg-gray-900/90 pt-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-full w-full top-0 bottom-0 left-0 right-0'>
            <div className='relative md:mx-auto md:max-w-xl mx-auto'>
                <div className='absolute z-50 bg-transparent w-full h-[90%] ' />
                <div className={`
                    ${step == 1 ? 'opacity-100 z-99' : 'opacity-0 z-0'} 
                    cursor-default transition-opacity duration-700 absolute left-1 right-1 top-5 py-9 md:py-8 px-4 border-4 rounded-lg border-gray-700 bg-gray-700/60
                `}>
                    <p className='text-2xl text-center text-white font-bold w-full'>Choose your color mood here</p>
                </div>
                <div className={`
                    ${step == 2 ? 'opacity-100 z-99' : 'opacity-0 z-0'}
                    cursor-default transition-opacity duration-700 absolute left-1 right-1 bottom-56 px-4 py-2 border-4 rounded-lg border-gray-700 bg-gray-700/60
                `}>
                    <p className='text-xl sm:text-2xl text-center w-full text-white font-bold'>Enter recipient's name here</p>
                </div>
                <div className={`
                    ${step == 3 ? 'opacity-100 z-99' : 'opacity-0 z-0'}
                    cursor-default transition-opacity duration-700 absolute left-1 right-1 bottom-32 px-4 py-8 border-4 rounded-lg border-gray-700 bg-gray-700/60
                `}>
                    <p className='text-xl md:text-2xl text-center w-full text-white font-bold'>Write your message here</p>
                </div>
                <div className={`
                    ${step == 5 ? 'opacity-100 z-99' : 'opacity-0 z-0'}
                    cursor-default transition-opacity duration-700 absolute left-1 right-1 top-1 bottom-11 flex flex-col gap-4 items-center justify-center border-4 rounded-lg border-gray-700 bg-gray-700/80
                `}>
                    <p className='text-xl md:text-2xl text-center w-full text-white font-bold'>Wanna see the message page?</p>
                    <a href="/message/1" target='_blank' className='hover:text-slate-800 font-semibold hover:bg-slate-200 border-2 hover:border-transparent transition-all border-slate-200 bg-slate-800 text-slate-200 px-2 py-1 cursor-pointer rounded-lg'>Click this</a>
                </div>
                <CardInput
                    open={true} 
                    newClass='pointer-events-none'
                    tutorial={tutorial}
                    recipientName={recipient}
                    message={message}
                />
                <div className={`${step >= 5 ? 'hidden' : 'flex'} items-center justify-between mt-2`}>
                    <button 
                        type='button' 
                        onClick={() => {step == 1 ? handleClear() : setStep(step - 1)}} 
                        className={`
                            ${step == 4 ? 'hidden' : 'block'}
                            text-slate-800 font-semibold bg-slate-200 border-2 border-transparent transition-all hover:border-slate-200 hover:bg-slate-800 hover:text-slate-200 px-2 py-1 cursor-pointer rounded-lg
                    `}>Back</button>
                    <button 
                        type='button' 
                        onClick={() => {
                            if (step === 3) {
                                beforeFinish();
                            } else {
                                setStep(step + 1);
                            }
                        }} 
                        className={`
                            ${step > 3 ? 'w-full' : 'w-fit'}
                            text-slate-800 font-semibold bg-slate-200 border-2 border-transparent transition-all hover:border-slate-200 hover:bg-slate-800 hover:text-slate-200 px-2 py-1 cursor-pointer rounded-lg`}
                    >{step <= 3 ? 'Next':'Finish'}</button>
                </div>
                <div className={`${step >= 5 ? 'flex' : 'hidden'} items-center mt-2`}>
                    <a href="#write" onClick={handleClear} className='text-slate-800 text-center font-semibold bg-slate-200 border-2 border-transparent transition-all hover:border-slate-200 hover:bg-slate-800 hover:text-slate-200 w-full py-1 cursor-pointer rounded-lg'>Understood! I will start right now!</a>
                </div>
            </div>
        </div>
    )
}
