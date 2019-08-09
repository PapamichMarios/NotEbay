package com.dit.ebay.controller;

import com.dit.ebay.request.EnableRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.request.SignInRequest;
import com.dit.ebay.request.SignUpRequest;
import com.dit.ebay.security.CurrentUser;
import com.dit.ebay.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import com.dit.ebay.security.UserDetailsImpl;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/app")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    /*
     * The following endpoints are for all Users
     */
    @PostMapping("users")
    @ResponseBody
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        return userService.signUpUser(signUpRequest);
    }

    @PostMapping("signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequest signInRequest) {
        return userService.signInUser(signInRequest);
    }


    /*
     * The following endpoints are for ADMIN Only
     */
    // Returns all Users in the database to display it
    // Maybe change it from /users/all => /users
    @GetMapping("/users/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<User> getAllUsers(@Valid @CurrentUser UserDetailsImpl currentUser) {
        return userService.getAllUsers(currentUser.getId());
    }

    // Given an Id of a user
    // Admin gets his profile
    @GetMapping("/users/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public User getUserById(@PathVariable(value = "userId") Long userId,
                            @Valid @CurrentUser UserDetailsImpl currentUser) {
        return userService.getUserById(userId);
    }

    // Given an Id
    // Admin enables or disables him
    @PutMapping("/users/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public User updateUserEnableById(@PathVariable(value = "userId") Long userId,
                                 @Valid @RequestBody EnableRequest enableRequest,
                                 @Valid @CurrentUser UserDetailsImpl currentUser) {
        return userService.updateUserEnableById(userId, enableRequest);
    }
}