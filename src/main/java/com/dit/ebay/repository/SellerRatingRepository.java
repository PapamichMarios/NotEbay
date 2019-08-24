package com.dit.ebay.repository;

import com.dit.ebay.model.SellerRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRatingRepository extends JpaRepository<SellerRating, Long> {

}