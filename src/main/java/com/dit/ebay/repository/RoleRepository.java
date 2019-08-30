package com.dit.ebay.repository;

import com.dit.ebay.model.Role;
import com.dit.ebay.model.RoleName;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/*
 * r.name = {'ROLE_ADMIN','ROLE_SELLER','ROLE_BIDDER'}
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleName roleName);

    // Check if current user is admin
    @Query("select case when count(r) > 0 then true else false end " +
            "from Role r " +
            "where r.id = :userId and r.name = 'ROLE_ADMIN'")
    boolean findRoleAdminById(@Param("userId") Long userId);
}