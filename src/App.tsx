import React from 'react';
import './App.css';
import './components/HeaderComponent/Header';
import Header from "./components/HeaderComponent/Header";
import MainContent from "./components/MainContent/MainContent";

function App() {
    return (
        <div className="App">
            <header className="body-header">

                <Header/>
            </header>

            <main className="body-main">
                <MainContent/>
            </main>

        </div>
    );
}

export default App;
