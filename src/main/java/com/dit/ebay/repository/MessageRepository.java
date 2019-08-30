package com.dit.ebay.repository;

import com.dit.ebay.model.Message;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface MessageRepository extends PagingAndSortingRepository<Message, Long> {

    @Query("select m.userReceiver.id from Message m where m.id = :messageId")
    Long findReceiverIdByMessageId(@Param("messageId") Long messageId);

    @Query("select m.userSender.id from Message m where m.id = :messageId")
    Long findSenderIdByMessageId(@Param("messageId") Long messageId);
}
