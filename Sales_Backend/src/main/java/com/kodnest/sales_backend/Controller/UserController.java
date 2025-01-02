package com.kodnest.sales_backend.Controller;

import com.kodnest.sales_backend.Enitity.User;
import com.kodnest.sales_backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import java.util.Map;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(Map.of("message", "User registered successfully", "user", registeredUser));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody User user) {


        if (userService.isValid(user)) {
            User data =userService.getbyUsername(user.getUsername());

            return ResponseEntity.ok(Map.of("data", data));
        }
        return ResponseEntity.badRequest().body(Map.of("error", "invalid"));


    }
}