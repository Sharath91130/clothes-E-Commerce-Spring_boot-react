import { useState } from "react";
import "./App.css";
import "./index.css";
import RegistrationPage from "./Components/RegistrationPage.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import NavBar from "./Components/Nabar.jsx";
import LoginPage1 from "./Components/LoginPageAuth.jsx";
import SalesSavvy from "./Product1.jsx";
import Products from "./Product1.jsx";
import ProductsCategories from "./Components/CategoriesNavBar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    const [count, setCount] = useState(0);

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage1 />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </Router>
    );
}

export default App;
