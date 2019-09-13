package com.dit.ebay.repository;

import com.dit.ebay.model.Bid;
import com.dit.ebay.model.Item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {
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

    @Query("select i from Item i where i.user.id = :userId")
    Page<Item> findByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("select i from Item i where i.bestBid.user.id = :userId")
    Page<Item> findBestBidItemsByUserId(@Param("userId") Long userId, Pageable pageable);

    // 1st time active is true then if date passes auction ends so it goes off then he wins
    @Query("select i from Item i where i.bestBid.user.id = :userId and i.timeEnds <= :currTime")
    Page<Item> findWonItemsByUserId(@Param("userId") Long userId, @Param("currTime") Timestamp currentTimeStamp, Pageable pageable);

    @Query("select i from Item i where i.active = true")
    List<Item> findAllActive();

    @Query("select i from Item i where i.user.id = :userId")
    List<Item> findAllByUserId(@Param("userId") Long userId);

    @Query("select i from Item i where lower(i.name) like lower(concat('%', :itemName,'%'))")
    Page<Item> findItemsByName(@Param("itemName") String itemName, Pageable pageable);

    @Query("select i from Item i where i.category.id = :categoryId")
    Page<Item> findItemsByCategoryId(@Param("categoryId") Long categoryId, Pageable pageable);
}

