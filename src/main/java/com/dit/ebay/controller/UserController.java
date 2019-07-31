package com.dit.ebay.controller;

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
import java.util.Optional;

@RestController
@RequestMapping("/app")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("users")
    @ResponseBody
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        return userService.signUpUser(signUpRequest);
    }

    @PostMapping("signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequest signInRequest) {
        return userService.signInUser(signInRequest);
    }

    //we use SignUpRequest because it has the fields for the update
    @PutMapping("/users/{userId}")
    @PreAuthorize("hasRole('ROLE_VISITOR')")
    public User updateUserById(@PathVariable(value = "userId") Long userId,
                               @Valid @RequestBody SignUpRequest userRequest,
                               @Valid @CurrentUser UserDetailsImpl currentUser) {
        return userService.updateUserById(userId, userRequest, currentUser);
    }

    @GetMapping("/users/current")
    @PreAuthorize("hasRole('ROLE_VISITOR')")
    public Optional<User> getUserTest(@Valid @CurrentUser UserDetailsImpl currentUser) {
        return userRepository.findByUsername(currentUser.getUsername());
    }
}