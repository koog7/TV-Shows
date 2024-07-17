import './App.css'
import {NavLink, Route, Routes} from "react-router-dom";
import Home from "./containers/Home.tsx";
import NotFound from "./components/NotFound.tsx";

const App = () => {

    return(
        <>
            <div style={{backgroundColor: '#404040', width: '1000px', minHeight: '50px', padding: '2px'}}>
                <h2 style={{marginLeft: '10px'}}><NavLink className="nav-link" to="/" style={{textDecoration: 'none', color: 'white'}}>TV Shows</NavLink></h2>
            </div>
            <hr/>

            <Routes>
                <Route path="/" element={(
                    <Home/>
                )}/>
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </>
    )

};

export default App
