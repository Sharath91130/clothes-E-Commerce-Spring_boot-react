import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "react-bootstrap";


const ProductsCategories = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("Sharath"); // Replace with dynamic username if needed
    const [count, setCount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("Shirts");

    const categories = ["Shirts", "Mobile", "Accessories", "Pants"];

    const incrementCart = () => {
        if (count < 20) {
            setCount(count + 1);
        }
    };

    const fetchProducts = async (category) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:9090/api/products?category=${category}`);
            const data = await response.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="container my-4">
            <div style={{ backgroundColor: "#ff69b4" }}>
                {/* Header */}
                <header className="d-flex justify-content-between align-items-center mb-4">
                    {/* Logo */}
                    <div className="logo">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/022/663/459/non_2x/shopping-bag-logo-icon-design-template-isolated-vector.jpg"
                            alt="Amazon Logo"
                            style={{ width: "120px", height: "auto", backgroundColor: "#ff69b4" }}
                        />
                    </div>
                    {/* Cart */}
                    <div className="d-flex align-items-center">
                        <FaShoppingCart size={24} />
                        <span className="badge bg-danger ms-2">
                            <h1>{count}</h1>
                        </span>
                    </div>
                    {/* Username Dropdown */}
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

            {/* Category Buttons */}
            <div className="text-center mb-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`btn ${selectedCategory === category ? "btn-primary" : "btn-outline-primary"} mx-2`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Loading Spinner */}
            {loading ? (
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                // Product Grid
                <div className="row">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.product_id} className="col-md-3 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="card-img-top"
                                        style={{ height: "250px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text text-muted">{product.description}</p>
                                        <p className="text-primary fw-bold">${product.price.toFixed(2)}</p>
                                        <p className="text-muted">Stock: {product.stock}</p>
                                        <Button onClick={incrementCart}>Add to Cart</Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No products found for {selectedCategory}.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductsCategories;
