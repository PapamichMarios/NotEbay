package com.dit.ebay.repository;

import com.dit.ebay.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("select c from Category c where c.name = :categoryName")
    List<Category> findByCategoryName(@Param("categoryName") String categoryName);

    @Query("select id from Category c where c.name = :categoryName")
    List<Long> findIdsByCategoryName(@Param("categoryName") String categoryName);

    @Query("select c from Category c where c.parentCategory.id is NULL")
    List<Category> findRootSubCategories();
}

