package com.dit.ebay.repository;

import com.dit.ebay.model.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

/*
 * 1) when we create message we insert it as DEL_NON
 * 2) if (sender deletes) => DEL_SEN, if (receiver deletes) => DEL_REC
 * 3) if we get a new delete request and message table has state DEL_SEN or DEL_REC then we remove the entry
 */
public interface MessageRepository extends PagingAndSortingRepository<Message, Long> {

    @Query("select m.userReceiver.id from Message m where m.id = :messageId")
    Long findReceiverIdByMessageId(@Param("messageId") Long messageId);

    @Query("select m.userSender.id from Message m where m.id = :messageId")
    Long findSenderIdByMessageId(@Param("messageId") Long messageId);

    @Query("select m from Message m where m.id = :messageId and m.messageDeleteState != 'DEL_SEN'")
    Optional<Message> findSentByMessageId(@Param("messageId") Long messageId);

    @Query("select m from Message m where m.id = :messageId and m.messageDeleteState != 'DEL_REC'")
    Optional<Message> findReceivedByMessageId(@Param("messageId") Long messageId);

    @Query("select m from Message m where m.userSender.id = :senderId and m.messageDeleteState != 'DEL_SEN'")
    Page<Message> findSentByUserId(@Param("senderId") Long senderId, Pageable pageable);

    @Query("select m from Message m where m.userReceiver.id = :receiverId and m.messageDeleteState != 'DEL_REC'")
    Page<Message> findReceivedByUserId(@Param("receiverId") Long receiverId, Pageable pageable);
}
