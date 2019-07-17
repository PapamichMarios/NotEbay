package ted.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ted.exception.ResourceNotFoundException;
import ted.exception.UserExistsException;
import ted.model.*;
//import ted.repository.RoleRepository;
import ted.repository.UserRepository;
import ted.request.SignUpRequest;
import ted.response.ApiResponse;
import ted.security.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.util.Collections;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    //@Autowired
    //private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public ResponseEntity<?> insertUser(SignUpRequest signUpRequest) {

        // Check if the user already exists
        userRepository.findByUsername(signUpRequest.getUsername())
                .ifPresent((s) -> {
                    throw new UserExistsException("A user with the same username already exists.");
                });

        userRepository.findByEmail(signUpRequest.getEmail())
                .ifPresent((s) -> {
                    throw new UserExistsException("A user with the same email already exists.");
                });

        // Create a user object from the request
        User user = new User(
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getUsername(),
                signUpRequest.getPassword(),
                signUpRequest.getEmail(),
                true
        );

        // Encrypt the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = new Role(signUpRequest.getRole(), user);
        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();
        return ResponseEntity.created(uri).body(new ApiResponse(true, "User created successfully."));
    }

    public User updateUserById(Long userId, SignUpRequest userRequest, UserDetailsImpl currentUser) {

        if(!currentUser.getId().equals(userId)) { throw new ResourceNotFoundException("User", "id", userId); }

        // Check if the user already exists
        userRepository.findByUsername(userRequest.getUsername())
                .ifPresent((s) -> { throw new UserExistsException("A user with the same username already exists."); });

        userRepository.findByEmail(userRequest.getEmail())
                .ifPresent((s) -> { throw new UserExistsException("A user with the same email already exists."); });

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setUsername(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));

        return userRepository.save(user);
    }
}
