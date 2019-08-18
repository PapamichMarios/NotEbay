package com.dit.ebay.service;

import com.dit.ebay.exception.NotAuthorizedException;
import com.dit.ebay.repository.ItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {

    private static final Logger logger = LoggerFactory.getLogger(AuthorizationService.class);

    @Autowired
    private ItemRepository itemRepository;

    public void isSellerOfItem(Long userId, Long itemId) {
        if (!itemRepository.findSellerIdByItemId(itemId).equals(userId)) {
            throw new NotAuthorizedException("Sorry, You're not authorized to perform this action. " +
                                             "You are not the owner of the item."
            );
        }
    }
}
