package com.dit.ebay.repository;

import com.dit.ebay.model.BidderRating;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface BidderRatingRepository extends PagingAndSortingRepository<BidderRating, Long> {

    @Query("select sum(bd.rating) from BidderRating bd where bd.userBidder.id = :userId")
    Optional<Long> aggrRatingByUserId(@Param("userId") Long userId);

    @Query("select avg(bd.rating) from BidderRating bd where bd.userBidder.id = :userId")
    Optional<BigDecimal> avgRatingByUserId(@Param("userId") Long userId);

    @Query("select count(bd.id) from BidderRating bd where bd.userBidder.id = :userId")
    Optional<Long> reputationRatingByUserId(@Param("userId") Long userId);

    @Query("select bd from BidderRating bd where bd.userBidder.id = :bidderId and bd.userSeller.id = :sellerId" +
            " and bd.item.id = :itemId ")
    Optional<BidderRating> findAlreadyRating(@Param("bidderId") Long bidderId,
                                             @Param("sellerId") Long sellerId,
                                             @Param("itemId") Long itemId);


    @Query("select bd from BidderRating bd where bd.userBidder.id = :bidderId")
    Page<BidderRating> findByBidderId(@Param("bidderId") Long bidderId, Pageable pageable);
}
