package com.dit.ebay.repository;

import com.dit.ebay.model.Bid;
import com.dit.ebay.model.Item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // Returns the id of item's owner (with role of SELLER)
    @Query("select u.id " +
            "from Item i inner join i.user as u " +
            "where i.id = :itemId"
    )
    Long findSellerIdByItemId(@Param("itemId") Long itemId);

    // We can remove the count (extra computation) but wanted to make the result boolean
    @Query("select case when count(i) > 0 then true else false end " +
            "from Item i inner join i.bids " +
            "where i.id = :itemId"
    )
    boolean countBidsByItemId(@Param("itemId") Long itemId);

    @Query("select i from Item i where i.name = :itemName")
    Optional<Item> findByName(@Param("itemName") String itemName);

    @Query("select i.bestBid from Item i where i.id = :itemId")
    Optional<Bid> findBestBidByItemId(@Param("itemId") Long itemId);
}

