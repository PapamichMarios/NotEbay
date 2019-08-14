package com.dit.ebay.repository;

import com.dit.ebay.model.Item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // Returns the id of item's owner (with role of SELLER)
    @Query("select u.id " +
            "from Item i inner join i.user as u " +
            "where i.id = :itemId"
    )
    Long findSellerIdByItemId(@Param("itemId") Long itemId);
}

