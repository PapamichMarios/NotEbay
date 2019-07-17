package ted.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ted.exception.ResourceNotFoundException;
import ted.exception.UserExistsException;
import ted.model.*;
import ted.repository.UserRepository;
import ted.request.SignUpRequest;
import ted.security.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
