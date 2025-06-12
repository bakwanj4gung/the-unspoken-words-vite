import React from 'react'

function NotFound() {
    return (
        <div className='min-h-screen bg-yellow-400 flex flex-col items-center justify-center text-center'>
            <h1 className='kablammo'>404</h1>
            <p className='text-xs -mt-5'>- Not Found</p>
            <h2 className='text-sm mt-6 md:text-base'>Oops... You caught us.</h2>
            <p className='text-xs mt-4'>
                Let us take you
                <button 
                    type='button' 
                    onClick={() => {window.history.back()}}
                    className='bg-gray-200 py-0.5 px-2 rounded-lg font-bold mx-1 underline decoration-transparent underline-offset-2 decoration-2 cursor-pointer hover:decoration-black'>
                    back
                </button>, 
                you shouldn't be here.
            </p>
        </div>
    )
}

export default NotFound