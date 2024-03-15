import { Route, Routes } from "react-router-dom";

import ErrorPage from "./Routes/Error/Error";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Home from "./Routes/Home/Home";
import Login from "./Routes/Login/Login";
import Art from "./Routes/Art/Art";
import About from "./Routes/About/About";

import { useContext } from 'react';
import { AuthorizedContext } from './Utils/Authorized';

import "./Assets/App.css";
import Admin from "./Routes/Admin/Admin";

export function App() {
  const { auth } = useContext(AuthorizedContext);

  return (
    <div>
        <Header/>

        <Routes>
            <Route path="*" element={<ErrorPage/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/art" element={<Art/>}/>
            <Route path="/about" element={<About/>}/>

            {auth && (<Route path="/admin" element={<Admin/>}/>)}
        </Routes>

        <Footer/>
    </div>
  );
}
