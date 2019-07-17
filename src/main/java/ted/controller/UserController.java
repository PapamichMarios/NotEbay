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
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    /*
     * This method handles POST requests issued to "/users",
     * which are used to register a new user.
     */
    @PostMapping("users")
    @ResponseBody
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        return userService.insertUser(signUpRequest);
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