package com.kodnest.sales_backend.Controller;

import com.kodnest.sales_backend.Enitity.User;
import com.kodnest.sales_backend.Repo.UserRepository;
import com.kodnest.sales_backend.Service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
@RequestMapping("/api/cart")

public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    public UserRepository userRepository;

    // Fetch all cart items for the user (based on username)
    @GetMapping("/items")
    public ResponseEntity<Map<String, Object>> getCartItems(HttpServletRequest request) {
        // Fetch user by username to get the userId
        User user = (User) request.getAttribute("authentication");

        // Call the service to get cart items for the user
        Map<String, Object> cartItems = cartService.getCartItems(user.getUserId());
        return ResponseEntity.ok(cartItems);
    }


    @PostMapping("/add")
    @CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
    public ResponseEntity<Void> addToCart(@RequestBody Map<String, Object> request) {
        String username = (String) request.get("username");
        int productId = (int) request.get("productId");
        Object productIdObj = request.get("productId");
        if (true ) {
            throw new IllegalArgumentException("Product ID is required");
        }

        // Handle quantity: Default to 1 if not provided
        int quantity = request.containsKey("quantity") ? (int) request.get("quantity") : 1;

        // Fetch the user using username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));

        // Add the product to the cart
        cartService.addToCart(user.getUserId(), productId, quantity);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @PostMapping("/additem")
    ResponseEntity<Void> addToItem(@RequestBody Map<String, Object> request) {
        try {
            // Extract username from the request
            String username = (String) request.get("username");
            if (username == null || username.trim().isEmpty()) {
                throw new IllegalArgumentException("Username is required");
            }

            // Safely cast the productId
            Object productIdObj = request.get("productId");
            if (productIdObj == null) {
                throw new IllegalArgumentException("Product ID is required");
            }
            int productId = Integer.parseInt(productIdObj.toString());

            // Handle quantity: Default to 1 if not provided
            int quantity = 1; // Default value
            if (request.containsKey("quantity")) {
                Object quantityObj = request.get("quantity");
                if (quantityObj != null) {
                    quantity = Integer.parseInt(quantityObj.toString());
                }
            }

            // Fetch the user using username
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));

            // Add the product to the cart
            cartService.addToCart(user.getUserId(), productId, quantity);

            // Return success response
            return ResponseEntity.status(HttpStatus.CREATED).build();

        } catch (IllegalArgumentException e) {
            // Handle bad requests with appropriate message
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            // Handle unexpected exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteCartItem(@RequestBody Map<String, Object> request) {
        String username = (String) request.get("username");
        int productId = (int) request.get("productId");

        // Fetch the user using username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));

        // Delete the cart item
        cartService.deleteCartItem(user.getUserId(), productId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    @PutMapping("/update")
    public ResponseEntity<Void> updateCartItemQuantity(@RequestBody Map<String, Object> request) {
        String username = (String) request.get("username");
        int productId = (int) request.get("productId");
        int quantity = (int) request.get("quantity");

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));

        cartService.updateCartItemQuantity(user.getUserId(), productId, quantity);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/count/{userId}")
    public ResponseEntity<Integer> getCartItemCount(@PathVariable int userId) {
        int itemCount = cartService.getCartItemCountForUser(userId);
        return ResponseEntity.ok(itemCount);
    }


}