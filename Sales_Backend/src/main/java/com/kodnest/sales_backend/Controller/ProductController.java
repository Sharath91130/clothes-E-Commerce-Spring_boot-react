package com.kodnest.sales_backend.Controller;

import com.kodnest.sales_backend.Enitity.Product;
import com.kodnest.sales_backend.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getProducts(@RequestParam(required = false) String category) {
        try {
            List<Product> products = productService.getProductsByCategory(category);

            List<Map<String, Object>> response = new ArrayList<>();
            for (Product product : products) {
                Map<String, Object> productDetails = new HashMap<>();
                productDetails.put("product_id", product.getProductId());
                productDetails.put("name", product.getName());
                productDetails.put("description", product.getDescription());
                productDetails.put("price", product.getPrice());
                productDetails.put("stock", product.getStock());

                List<String> images = productService.getProductImages(product.getProductId());
                productDetails.put("images", images);

                response.add(productDetails);
            }

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
