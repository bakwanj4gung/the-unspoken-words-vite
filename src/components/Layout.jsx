import CookieBanner from "./CookieBanner"
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({children}) {
	const allCookies = Cookies.get();
    
    return (
        <>
            <div className="w-full bg-slate-100 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
                <Navbar />
            </div>
            <div className="bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 min-h-[calc(100vh-192px)]">
                {children}
                {allCookies.unspoken_words_choice || allCookies.unspoken_words 
                    ? '' 
                    : <CookieBanner />
                }
            </div>
            <div className="w-full bg-slate-100 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
                <Footer />
            </div>
        </>
    )
}

export default Layout