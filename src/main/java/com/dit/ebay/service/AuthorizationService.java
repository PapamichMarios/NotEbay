package com.dit.ebay.service;

import com.dit.ebay.exception.NotAuthorizedException;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.MessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {

    private static final Logger logger = LoggerFactory.getLogger(AuthorizationService.class);

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private MessageRepository messageRepository;

    public void isSellerOfItem(Long userId, Long itemId) {
        if (!itemRepository.findSellerIdByItemId(itemId).equals(userId)) {
            throw new NotAuthorizedException("Sorry, You're not authorized to perform this action. " +
                                             "You are not the owner of the item with id = " + itemId + " ."
            );
        }
    }

    public void checkReceiverPerms(Long userId, Long messageId) {
        if (!messageRepository.findReceiverIdByMessageId(messageId).equals(userId)) {
            throw new NotAuthorizedException("Sorry, You're not authorized to perform this action. " +
                                             "You are not the receiver of the message with id = " + messageId + " ."
            );
        }
    }

    public void checkSenderPerms(Long userId, Long messageId) {
        if (!messageRepository.findSenderIdByMessageId(messageId).equals(userId)) {
            throw new NotAuthorizedException("Sorry, You're not authorized to perform this action. " +
                    "You are not the sender of the message with id = " + messageId + " ."
            );
        }
    }
}
