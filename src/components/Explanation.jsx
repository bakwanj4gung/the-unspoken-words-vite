import { useState } from "react"
import OnBoarding from "./OnBoarding"

export default function Explanation() {
    const [showModal, setShowModal] = useState(false)
    return (
        <div className={`flex gap-4 flex-col lg:flex-row items-center justify-between mt-10`}>
            {showModal && <OnBoarding onClose={() => setShowModal(false)} />}
            <div className='flex flex-col items-center justify-center border p-5 rounded-lg w-full lg:h-60 lg:w-4/12 shadow-sm/0 transition-all duration-700 ease-in-out cursor-default hover:-translate-y-0.5 hover:shadow-lg/10'>
                <p className='mx-auto text-center font-extrabold'>Did you know?</p>
                <p className='text-center text-sm mt-2'>Writing can help <b className="underline">reduce stress and aid in healing from trauma and grief</b>. It’s also a great <b className="underline">alternative for people who feel uncomfortable expressing their emotions verbally</b>, whether due to personal or situational reasons.</p>
            </div>
            <div className='flex flex-col items-center justify-center border p-5 rounded-lg w-full lg:h-60 lg:w-4/12 shadow-sm/0 transition-all duration-700 ease-in-out cursor-default hover:-translate-y-0.5 hover:shadow-lg/10'>
                <p className='mx-auto text-center font-extrabold'>Who says a letter must be long? Isn’t it enough if I write it briefly?</p>
                <p className='text-sm text-center mt-2'> No one forbids you from writing something long or keeping it short and simple. As long as <b className="underline">the message is delivered</b>, <b className="underline">the writer feels relieved</b>, and <b className="underline">the recipient understands</b>, <b className="underline">that’s all that matters</b>.</p>
            </div>
            <a href="#up" onClick={() => {setShowModal(true)}} className='flex flex-col items-center justify-center border p-5 rounded-lg w-full lg:h-60 lg:w-4/12 shadow-sm/0 transition-all duration-700 ease-in-out cursor-pointer hover:-translate-y-0.5 hover:shadow-lg/10'>
                <p className='mx-auto w-9/12 text-center font-extrabold'>So tell me...</p>
                <p className='mx-auto w-9/12 text-center font-extrabold'>how do i start this?</p>
            </a>
        </div>
    )
}
