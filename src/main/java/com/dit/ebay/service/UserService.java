package com.dit.ebay.service;

import com.dit.ebay.exception.BadRequestException;
import com.dit.ebay.model.Role;
import com.dit.ebay.model.RoleName;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.request.SignInRequest;
import com.dit.ebay.request.SignUpRequest;
import com.dit.ebay.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.exception.UserExistsException;
import com.dit.ebay.model.*;
import com.dit.ebay.response.SignInResponse;
import com.dit.ebay.security.JwtTokenProvider;
import com.dit.ebay.security.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public void insertRandomUsers() {

        // If we find 1 just return
        if (userRepository.findByUsername("michas").orElse(null) != null) {
            return;
        }

        User user = new User("George", "Michas", "michas", passwordEncoder.encode("michas"), "michas@flo.com", true);
        Role ad_role = new Role(RoleName.ROLE_SELLER);
        user.addRole(ad_role);
        userRepository.save(user);

        user = new User("Marios", "Papas", "papas", passwordEncoder.encode("papas"), "papas@flo.com", true);
        ad_role = new Role(RoleName.ROLE_SELLER);
        user.addRole(ad_role);
        userRepository.save(user);

        user = new User("Kostas", "Liotos", "liotos", passwordEncoder.encode("liotos"), "liotos@flo.com", true);
        ad_role = new Role(RoleName.ROLE_BIDDER);
        user.addRole(ad_role);
        userRepository.save(user);

        user = new User("Tasos", "Mantas", "mantas", passwordEncoder.encode("mantas"), "fake_student@flo.com", true);
        ad_role = new Role(RoleName.ROLE_BIDDER);
        user.addRole(ad_role);
        userRepository.save(user);
    }

    public void createAdmin() {
        // if admin exists just return
        if (userRepository.findByUsername("ADM").orElse(null) != null) {
            return;
        }

        // Create admin
        User admin = new User("Tom", "McDonald", "ADM", passwordEncoder.encode("ADMIN123"), "adm@flo.com", true);
        Role ad_role = new Role(RoleName.ROLE_ADMIN);
        admin.addRole(ad_role);
        User result = userRepository.save(admin);
    }

    public ResponseEntity<?> signUpUser(SignUpRequest signUpRequest) {

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
                true,
                signUpRequest.getTin(),
                signUpRequest.getStreetAddress(),
                signUpRequest.getGeo_location(),
                signUpRequest.getPostalCode(),
                signUpRequest.getCountry(),
                signUpRequest.getCity(),
                signUpRequest.getPhone()
        );

        // Encrypt the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = new Role(signUpRequest.getRole(), user);
        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();
        return ResponseEntity.created(uri).body(new ApiResponse(true, "User created successfully.", user));
    }

    public ResponseEntity<?> signInUser(SignInRequest signInRequest) {
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
        //System.out.println("all went ok maybe");
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new SignInResponse(jwt, user.getUsername(), user.getFirstName(), user.getLastName()));
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

    /*
     * ADMIN : get all the users
     */
    public List<User> getAllUsers(Long adminId) {
        return userRepository.findAllUsersAdmin(adminId);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }
}
