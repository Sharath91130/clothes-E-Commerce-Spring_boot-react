import { useState } from 'react'


import './App.css'
import './index.css'
import RegistrationPage from "./Components/RegistrationPage.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import NavBar from "./Components/Nabar.jsx";
import LoginPage1 from "./Components/LoginPageAuth.jsx";
import SalesSavvy from "./Product1.jsx";
import Products from "./Product1.jsx";


function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <BrowserRouter>
                <NavBar />



                <Routes>
                    <Route path={"/"} element={<RegistrationPage/>}></Route>
                    <Route path={"/login"} element={<LoginPage1/>}></Route>
                    <Route path={"/customerhome"} element={<Products/>}></Route>


                </Routes>

            </BrowserRouter>
            {/*<h1>Hello Products</h1>*/}
            {/*<Products />*/}
        </>
    )
}

export default App