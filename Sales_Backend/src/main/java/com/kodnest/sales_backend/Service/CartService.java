package com.kodnest.sales_backend.Service;
import com.kodnest.sales_backend.Enitity.CartItem;
import com.kodnest.sales_backend.Enitity.Product;
import com.kodnest.sales_backend.Enitity.ProductImage;
import com.kodnest.sales_backend.Enitity.User;
import com.kodnest.sales_backend.Repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    // Get Cart Items for a User
    public Map<String, Object> getCartItems(int userId) {
        // Fetch the cart items for the user with product details
        List<CartItem> cartItems = cartRepository.findCartItemsWithProductDetails(userId);

        // Create a response map to hold the cart details
        Map<String, Object> response = new HashMap<>();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        response.put("username", user.getUsername());
        response.put("role", user.getRole().toString());

        // List to hold the product details
        List<Map<String, Object>> products = new ArrayList<>();
        int overallTotalPrice = 0;

        for (CartItem cartItem : cartItems) {
            Map<String, Object> productDetails = new HashMap<>();

            // Get product details
            Product product = cartItem.getProduct();

            // Fetch product images
            List<ProductImage> productImages = productImageRepository.findByProduct_ProductId(product.getProductId());
            String imageUrl = (productImages != null && !productImages.isEmpty())
                    ? productImages.get(0).getImageUrl()
                    : "default-image-url";

            // Populate product details
            productDetails.put("product_id", product.getProductId());
            productDetails.put("image_url", imageUrl);
            productDetails.put("name", product.getName());
            productDetails.put("description", product.getDescription());
            productDetails.put("price_per_unit", product.getPrice());
            productDetails.put("quantity", cartItem.getQuantity());
            productDetails.put("total_price", cartItem.getQuantity() * product.getPrice().doubleValue());

            // Add to products list
            products.add(productDetails);

            // Update overall total price
            overallTotalPrice += (int) (cartItem.getQuantity() * product.getPrice().doubleValue());
        }

        // Prepare the final cart response
        Map<String, Object> cart = new HashMap<>();
        cart.put("products", products);
        cart.put("overall_total_price", overallTotalPrice);

        response.put("cart", cart);

        return response;
    }

    public void addToCart(int userId, int productId, int quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

        Optional<CartItem> existingItem = cartRepository.findByUserAndProduct(user, product);

        if (existingItem.isPresent()) {
            CartItem cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartRepository.save(cartItem);
        } else {
            CartItem newItem = new CartItem(user, product, quantity);
            cartRepository.save(newItem);
        }
    }
}