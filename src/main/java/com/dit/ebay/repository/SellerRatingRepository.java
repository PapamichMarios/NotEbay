package com.dit.ebay.repository;

import com.dit.ebay.model.SellerRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface SellerRatingRepository extends JpaRepository<SellerRating, Long> {

    @Query("select avg(sl.rating) from SellerRating sl where sl.userSeller.id = :userId")
    Optional<BigDecimal> avgRatingByUserId(@Param("userId") Long userId);
}