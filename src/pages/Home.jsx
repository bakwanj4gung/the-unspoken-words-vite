import Layout from "../components/Layout"
import Hero from "../components/Hero";
import Cookies from "js-cookie";
import CardInput from "../components/CardInput";
import Explanation from "../components/Explanation";

function Home() {
	const allCookies = Cookies.get();
	const cookieUser = allCookies.unspoken_words;
	return (
		<Layout>
            <div className="py-4">
                <Hero />
                <div id="write" className="pt-8">
                    <CardInput cookie={cookieUser ? cookieUser : null} />
                </div>
                {/* <CardMessageSent
                    cookie={cookieUser ? cookieUser : "unknown"}
                /> */}
                <Explanation />
            </div>
		</Layout>
	)
}

export default Home
