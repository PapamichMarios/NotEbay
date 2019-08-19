package com.dit.ebay.repository;

import com.dit.ebay.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("select c from Category c where c.item.id = :itemId and c.category = :categoryStr")
    List<Category> findByItemIdAndCategoryStr(@Param("itemId") Long itemId,
                                              @Param("categoryStr") String categoryStr);
}

