package com.dit.ebay.service;

import com.dit.ebay.exception.AppException;
import com.dit.ebay.exception.BadRequestException;
import com.dit.ebay.model.*;
import com.dit.ebay.repository.BidderRatingRepository;
import com.dit.ebay.repository.RoleRepository;
import com.dit.ebay.repository.SellerRatingRepository;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.request.EnableRequest;
import com.dit.ebay.request.SignInRequest;
import com.dit.ebay.request.SignUpRequest;
import com.dit.ebay.response.*;
import com.dit.ebay.util.JsonGeoPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.exception.UserExistsException;
import com.dit.ebay.security.JwtTokenProvider;
import com.dit.ebay.security.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ValidatePageParametersService validatePageParametersService;

    @Autowired
    private ItemService itemService;

    @Autowired
    private BidService bidService;

    @Autowired
    private SellerRatingRepository sellerRatingRepository;

    @Autowired
    private BidderRatingRepository bidderRatingRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

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
        User user = new User(signUpRequest);

        // Encrypt the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Insert always with both roles (Seller, Bidder)
        // Extra entries
        /*
        user.addRole(new Role(RoleName.ROLE_BIDDER, user));
        user.addRole(new Role(RoleName.ROLE_SELLER, user));
        */

        // Avoid extra insertions
        Role userRoleSeller = roleRepository.findByName(RoleName.ROLE_SELLER)
                .orElseThrow(() -> new AppException("User Role Seller not set."));
        Role userRoleBidder = roleRepository.findByName(RoleName.ROLE_BIDDER)
                .orElseThrow(() -> new AppException("User Role Bidder not set."));
        user.addRole(userRoleSeller);
        user.addRole(userRoleBidder);

        User result = userRepository.save(user);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(uri).body(new ApiResponse(true, "User created successfully.", user));
    }

    public ResponseEntity<?> signInUser(SignInRequest signInRequest) {
        // Check if the user exists
        User user = userRepository.findByUsername(signInRequest.getUsername()).
                orElseThrow(() -> new AppException("Invalid username or password."));

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        signInRequest.getUsername(),
                        signInRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new SignInResponse(jwt, user.getUsername(),
                                user.getFirstName(), user.getLastName(),
                                roleRepository.findRoleAdminById(user.getId())));
    }

    //@Transactional
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

    public CompositePagedResponse<ItemResponse, BidResponse> getUserActivity(Long userId, int page, int size) {
        // safe check the ids
        /*
        if (!userId.equals(currentUser.getId())) {
            throw new AppException("Error on activity, path doesn't match with the logged in user.");
        }
        */
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return new CompositePagedResponse<>(itemService.getSellerItems(currentUser, page, size),
                                            bidService.getUserBids(currentUser, page, size));
    }

    //@Transactional
    // constructs paged response
    // will only be used inside this class
    public PagedResponse<User> createPagedResponse(Page<User> usersPaged) {
        if (usersPaged.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), usersPaged.getNumber(),
                    usersPaged.getSize(), usersPaged.getTotalElements(),
                    usersPaged.getTotalPages(), usersPaged.isLast());
        }

        List<User> usersResponses = new ArrayList<>();
        for (User user : usersPaged) {
            usersResponses.add(user);
        }

        return new PagedResponse<>(usersResponses, usersPaged.getNumber(),
                usersPaged.getSize(), usersPaged.getTotalElements(),
                usersPaged.getTotalPages(), usersPaged.isLast());
    }

    /*
     * ADMIN : get all the users
     */
    public PagedResponse<User> getAllUsers(Long adminId, int page, int size) {
        validatePageParametersService.validate(page, size);
        Page<User> pagedUsers = userRepository.findAllUsersAdmin(adminId, PageRequest.of(page, size, Sort.by("id").descending()));
        return createPagedResponse(pagedUsers);
    }

    public ProfileResponse getUserById(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        Long sellerRating = sellerRatingRepository.reputationRatingByUserId(userId).orElse(null);
        BigDecimal avgRatingSeller = sellerRatingRepository.avgRatingByUserId(userId).orElse(null);

        Long bidderRating = bidderRatingRepository.reputationRatingByUserId(userId).orElse(null);
        BigDecimal avgRatingBidder = bidderRatingRepository.avgRatingByUserId(userId).orElse(null);

        return new ProfileResponse(user, sellerRating, avgRatingSeller, bidderRating, avgRatingBidder);
    }

    public User updateUserEnableById(Long userId, EnableRequest enableRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        user.setEnabled(enableRequest.isEnable());

        return userRepository.save(user);
    }

    public ResponseEntity<?> deleteUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        userRepository.delete(user);

        return ResponseEntity.ok().body(new ApiResponse(true, "User Deleted Successfully."));
    }

    /*
     * For signed up users both seller/bidders
     */
    public User getLoggedInUserProfile(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
}
