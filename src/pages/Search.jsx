import Layout from '../components/Layout'
import LetterSearch from '../components/LetterSearch'

function Search() {
  
    return (
        <Layout>
            <div className="bg-white py-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
                <p className="textlg md:text-xl text-center">
                    Someone may have written to you
                </p>
                <p className="textlg md:text-xl text-center">
                    try searching your name!
                </p>
                <LetterSearch />
            </div>
        </Layout>
    )
}

export default Search