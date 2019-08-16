package com.dit.ebay.repository;

import com.dit.ebay.model.Bid;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query("select case when count(i) > 0 then true else false end " +
            "from Item i inner join i.bids " +
            "where i.id = :itemId"
    )
    boolean findItemsBidsByItemId(@Param("itemId") Long itemId);

}
