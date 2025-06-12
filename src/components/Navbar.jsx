import React from 'react'
import { useLocation } from 'react-router';
import MobileMenu from './MobileMenu';

export default function Navbar() {
    const { pathname } = useLocation();
    return (
        <div id="up" className='relative z-50 flex h-24 items-center justify-between'>
			{/* LEFT */}
			<div className=''>
				<a href={"/"} className='satisfy text-slate-800 text-xl underline decoration-2 underline-offset-3 decoration-transparent transition-all hover:decoration-slate-800'>The Unspoken Words</a>
			</div>
            {/* RIGHT */}
            <div className='hidden md:flex items-center gap-8 text-gray-500 font-semibold whitespace-nowrap'>
                <a 
                    href={pathname != "/" ? "/#write" : "#write"} 
                    className={`transition-all underline underline-offset-3 decoration-2 
                        ${pathname == '/#write' ? 'decoration-black text-black' : 'decoration-transparent hover:decoration-black hover:text-black'}
                    `}
                >
					Send a letter
				</a>
                <a 
                    href={"/search"} 
                    className={`transition-all underline underline-offset-3 decoration-2 
                        ${pathname == '/search' ? 'decoration-black text-black' : 'decoration-transparent hover:decoration-black hover:text-black'}
                    `}
                >
					Search a letter
				</a>
                <a 
                    href={"/about"} 
                    className={`transition-all underline underline-offset-3 decoration-2 
                        ${pathname == '/about' ? 'decoration-black text-black' : 'decoration-transparent hover:decoration-black hover:text-black'}
                    `}
                >
					About
				</a>
            </div>
            <MobileMenu />
        </div>
    )
}
