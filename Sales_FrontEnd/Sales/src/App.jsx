import { useState } from 'react'


import './App.css'
import RegistrationPage from "./Components/RegistrationPage.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import NavBar from "./Components/Nabar.jsx";
import LoginPage1 from "./Components/LoginPageAuth.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
            <NavBar />



            <Routes>
                <Route path={"/register"} element={<RegistrationPage/>}></Route>
                <Route path={"/login"} element={<LoginPage1/>}></Route>


            </Routes>

        </BrowserRouter>
    </>
  )
}

export default App
