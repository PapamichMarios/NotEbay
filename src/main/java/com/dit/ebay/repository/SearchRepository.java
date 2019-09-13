package com.dit.ebay.repository;

import com.dit.ebay.model.Item;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchRepository extends PagingAndSortingRepository<Item, Long>, JpaSpecificationExecutor<Item> {

}

