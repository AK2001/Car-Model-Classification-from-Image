import React from 'react';
import './App.css';
import './components/HeaderComponent/Header';
import Header from "./components/HeaderComponent/Header";
import MainContent from "./components/MainContent/MainContent";
import BackgroundPage from "./components/BackgroundPage/BackgroundPage";
import {Routes, Route} from "react-router-dom";

function App() {

    return (
        <div className="App">
            <header className="body-header">
                <Header/>
            </header>

            <main className="body-main">
                <Routes>

                    <Route path="/" element={
                        <>
                            <MainContent/>
                        </>
                    }>
                    </Route>

                    <Route path="/background" element={
                        <BackgroundPage/>
                    }>
                    </Route>
                </Routes>
            </main>
        </div>
    );
}

export default App;
