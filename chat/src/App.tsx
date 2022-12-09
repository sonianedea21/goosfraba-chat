import React from 'react';
import './App.css';
import {BarGraph} from "./components/BarGraph";
import {useDataHook} from "./components/useDataHook";


function App() {
    const {loading, error} = useDataHook();

    if (error) return <p>Error :(</p>;

    if (loading) return <p>Loading...</p>;

    return (
        <div className="App">
            <BarGraph/>
        </div>
    );
}

export default App;
