package com.dit.ebay.component;

import com.dit.ebay.exception.AppException;
import com.dit.ebay.model.Item;
import com.dit.ebay.repository.ItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;

/*
 * Real time checking database to see
 */

@Component
@EnableScheduling
public class ItemTimeScheduleComponent {

    private static final Logger log = LoggerFactory.getLogger(ItemTimeScheduleComponent.class);

    private static final String CRON_EVERY_20_MINS = "0 */20 * * * *";

    @Autowired
    private ItemRepository itemRepository;

    //@Async // uncomment for async call
    // check database every 20 minutes
    @Scheduled(cron = CRON_EVERY_20_MINS)
    public void checkEndTimesOfItem() {
        List<Item> itemsList = itemRepository.findAllActive();
        Timestamp currentTimeStamp = new Timestamp(System.currentTimeMillis());
        currentTimeStamp.setNanos(0); // don't count millis
        for (Item item : itemsList) {
            if (currentTimeStamp.after(item.getTimeEnds())) {
                // make it inactive
                item.setActive(false);
                itemRepository.save(item);
            }
        }
    }
}