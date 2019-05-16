package com.dit.ebay.repositories;

import com.dit.ebay.models.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {

}