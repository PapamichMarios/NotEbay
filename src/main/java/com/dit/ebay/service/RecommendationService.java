package com.dit.ebay.service;

import com.dit.ebay.model.Item;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.BidRepository;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private BidRepository bidRepository;

    public void Recommendaiton(User user) {
        List<User> usersList = userRepository.findAllExceptUserId(user.getId());
        List<Item> userItem = itemRepository.findAllByUserId(user.getId());
        List<Item> itemsList = itemRepository.findAlllItems();


    }


}