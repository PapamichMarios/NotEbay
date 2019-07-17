package ted.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ted.exception.BadRequestException;
import ted.model.User;
import ted.model.Role;
import ted.model.RoleName;
import ted.repository.UserRepository;
import ted.repository.RoleRepository;
import ted.exception.UserExistsException;
import ted.exception.AppException;
import ted.request.SignInRequest;
import ted.request.SignUpRequest;
import ted.response.ApiResponse;
import ted.response.SignInResponse;
import ted.security.CurrentUser;
import ted.security.JwtTokenProvider;
import ted.service.UserService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import ted.security.UserDetailsImpl;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    /*
     * This method handles POST requests issued to "/users",
     * which are used to register a new user.
     */
    @PostMapping("users")
    @ResponseBody
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
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

        Role userRole = roleRepository.findByName(RoleName.ROLE_VISITOR); // change it in the future
        if (userRole == null) {
            throw new AppException("User Role not set.");
        }
        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(uri).body(new ApiResponse(true, "User created successfully."));
    }

    @PostMapping("signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequest signInRequest) {
        // Check if the user exists
        User user = userRepository.findByUsername(signInRequest.getUsername()).orElse(null);
        if (user == null) {
            throw new BadRequestException("Invalid username or password.");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        signInRequest.getUsername(),
                        signInRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new SignInResponse(jwt, user.getUsername(), user.getFirstName(), user.getLastName()));
    }

    //we use SignUpRequest because it has the fields for the update
    @PutMapping("/users/{userId}")
    @PreAuthorize("hasRole('USER')")
    public User updateUserById(@PathVariable(value = "userId") Long userId,
                               @Valid @RequestBody SignUpRequest userRequest,
                               @Valid @CurrentUser UserDetailsImpl currentUser) {
        return userService.updateUserById(userId, userRequest, currentUser);
    }
}