import '../App.css'
import AutocompleteBlock from "../components/AutocompleteBlock.tsx";
const Home = () => {
    return (
        <div>
            <div className={'search-block'}>
                <label>Search by name</label>
                <input placeholder={'Enter a name of tv show'}/>
            </div>
            <AutocompleteBlock />
        </div>
    );
};

export default Home;