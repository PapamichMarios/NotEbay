package com.dit.ebay.repository;

import com.dit.ebay.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String username);


    // Return all users in the database, except admins info
    @Query("select u from User u where u.id != :adminId")
    List<User> findAllUsersAdmin(@Param("adminId") Long adminId);
}