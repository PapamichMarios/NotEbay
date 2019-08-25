package com.dit.ebay.repository;

import com.dit.ebay.model.Bid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BidRepository extends PagingAndSortingRepository<Bid, Long> {

    /*@Query("select b.id, b.user, b.bidAmount, b.bidTime, b.accepted " +
            "from Bid b " +
            "where b.item.id = :itemId")
    */
    @Query("select b from Bid b where b.item.id = :itemId")
    Page<Bid> findByItemId(@Param("itemId") Long itemId, Pageable pageable);

    @Query("select b from Bid b where b.user.id = :userId")
    Page<Bid> findByUserId(@Param("userId") Long userId, Pageable pageable);
}
