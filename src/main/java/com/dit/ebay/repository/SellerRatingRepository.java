package com.dit.ebay.repository;

import com.dit.ebay.model.BidderRating;
import com.dit.ebay.model.SellerRating;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface SellerRatingRepository extends JpaRepository<SellerRating, Long> {

    @Query("select sum(sl.rating) from SellerRating sl where sl.userSeller.id = :userId")
    Optional<Long> aggrRatingByUserId(@Param("userId") Long userId);

    @Query("select avg(sl.rating) from SellerRating sl where sl.userSeller.id = :userId")
    Optional<BigDecimal> avgRatingByUserId(@Param("userId") Long userId);

    @Query("select count(sl.id) from SellerRating sl where sl.userSeller.id = :userId")
    Optional<Long> reputationRatingByUserId(@Param("userId") Long userId);

    @Query("select sl from SellerRating sl where sl.userBidder.id = :bidderId and sl.userSeller.id = :sellerId " +
            " and sl.item.id = :itemId ")
    Optional<SellerRating> findAlreadyRating(@Param("sellerId") Long sellerId,
                                             @Param("bidderId") Long bidderId,
                                             @Param("itemId") Long itemId);

    @Query("select sl from SellerRating sl where sl.userSeller.id = :sellerId")
    Page<SellerRating> findBySellerId(@Param("sellerId") Long sellerId, Pageable pageable);
}