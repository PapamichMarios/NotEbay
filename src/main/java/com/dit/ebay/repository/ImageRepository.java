package com.dit.ebay.repository;

import com.dit.ebay.model.Image;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends PagingAndSortingRepository<Image, Long> {

    @Query("select im from Image im where im.item.id = :itemId")
    List<Image> findByItemId(@Param("itemId") Long itemId);



}