import React, { useState, useEffect } from 'react';

export function MobileProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch products from the API
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:9090/api/products?category=Mobiles');
            const data = await response.json();
            if (data.products) {
                setProducts(data.products);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Mobiles</h2>

            {/* Loading state */}
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {/* Products Display */}
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.product_id} className="col-md-4 mb-4">
                                <div className="card shadow-sm">
                                    {/* Display Product Image */}
                                    <img
                                        src={product.images[0]}
                                        className="card-img-top"
                                        alt={product.name}
                                        style={{ height: '250px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        {/* Product Name */}
                                        <h5 className="card-title">{product.name}</h5>
                                        {/* Product Description */}
                                        <p className="card-text">{product.description}</p>
                                        {/* Price and Stock Information */}
                                        <p className="card-text">
                                            <strong>Price:</strong> ${product.price}
                                        </p>
                                        <p className="card-text">
                                            <strong>Stock:</strong> {product.stock}
                                        </p>
                                        {/* Add to Cart Button */}
                                        <button className="btn btn-primary w-100">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No products found for Mobiles.</p>
                    )}
                </div>
            )}
        </div>
    );
}
