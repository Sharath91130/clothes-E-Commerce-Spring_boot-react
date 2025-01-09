import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart } from "react-icons/fa";
import {Button} from "react-bootstrap";
import {CategoryNavigation} from "./Components/CategoriesNavBar.jsx";
import './assets/style.css'// Importing the cart icon from react-icons

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("Sharath "); // Replace with dynamic username if needed
    const[count ,setCount]=useState(0)
    const inc=()=>{
        if(count<20) {
            setCount(count + 1)
        }
    }



    useEffect(() => {
        // Fetch data from API
        fetch("http://localhost:9090/api/products?category=Shirts")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container my-4" >
            <div style={{backgroundColor:"#ff69b4"}}>
            {/* Header with Amazon logo and Cart */}
            <header className="d-flex justify-content-between align-items-center mb-4">
                {/* Amazon Logo */}
                <div className="logo">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/022/663/459/non_2x/shopping-bag-logo-icon-design-template-isolated-vector.jpg" // Amazon logo URL
                        alt="Amazon Logo"
                        style={{ width: "120px", height: "auto", backgroundColor:"#ff69b4" }}
                    />
                </div>

                {/* Cart Icon with Badge */}
                <div className="d-flex align-items-center">
                    <FaShoppingCart size={24} />
                    <span className="badge bg-danger ms-2">   <h1 >{count}</h1></span> {/* Example for 3 items in the cart */}
                </div>

                {/* Dropdown for Username */}
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {username}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={() => alert("Profile clicked")}
                            >
                                Profile
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={() => alert("Settings clicked")}
                            >
                                Settings
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={() => alert("Logout clicked")}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>

            </header>
            </div>

            {/* Product grid */}
            <div><CategoryNavigation /></div>
            <div className="row">
                {products.map((product, index) => (
                    <div key={product.product_id} className="col-md-3 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="card-img-top"
                                style={{ height: "35rem", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text text-muted">{product.description}</p>
                                <p className="text-primary fw-bold">${product.price.toFixed(2)}</p>
                                <p className="text-muted">Stock: {product.stock}</p>
                                <Button onClick={inc}> Add Cart</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
