import React from 'react';
import './App.css';
import {BarGraph} from "./components/BarGraph";


function App() {
    // const {loading, error} = useDataHook();
    //
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;

    return (
        <div className="App">
            <BarGraph/>
        </div>
    );
}

export default App;
