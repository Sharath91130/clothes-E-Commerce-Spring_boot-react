import { useState } from 'react'


import './App.css'
import RegistrationPage from "./Components/RegistrationPage.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import NavBar from "./Components/Nabar.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
            <NavBar />



            <Routes>
                <Route path={"/"} element={<RegistrationPage/>}></Route>
                <Route path={"/login"} element={<LoginPage/>}></Route>


            </Routes>

        </BrowserRouter>
    </>
  )
}

export default App
