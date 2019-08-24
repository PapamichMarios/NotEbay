package com.dit.ebay.repository;

import com.dit.ebay.model.BidderRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BidderRatingRepository extends JpaRepository<BidderRating, Long> {

}
