package com.dit.ebay.repository;

import com.dit.ebay.model.BidderRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface BidderRatingRepository extends JpaRepository<BidderRating, Long> {

    @Query("select sum(sl.rating) from SellerRating sl where sl.userBidder.id = :userId")
    Optional<Long> aggrRatingByUserId(@Param("userId") Long userId);

    @Query("select avg(sl.rating) from SellerRating sl where sl.userBidder.id = :userId")
    Optional<BigDecimal> avgRatingByUserId(@Param("userId") Long userId);

    @Query("select count(sl.id) from SellerRating sl where sl.userBidder.id = :userId")
    Optional<Long> reputationRatingByUserId(@Param("userId") Long userId);
}
