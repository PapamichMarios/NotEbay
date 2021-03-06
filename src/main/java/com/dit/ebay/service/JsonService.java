package com.dit.ebay.service;

import com.dit.ebay.json_model.*;
import com.dit.ebay.model.Bid;
import com.dit.ebay.model.Category;
import com.dit.ebay.model.Item;
import com.dit.ebay.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JsonService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private SellerRatingRepository sellerRatingRepository;

    @Autowired
    private BidderRatingRepository bidderRatingRepository;

    @Autowired
    private ItemService itemService;

    @Autowired
    private CategoryService categoryService;

    //@Transactional
    public JsonItems getJsonItems(Long userId) {
        List<Item> itemsList = itemRepository.findAllByUserId(userId);
        JsonItems jsonItems = new JsonItems();

        for (Item item : itemsList) {
            JsonItem jsonItem = new JsonItem(item);
            List<String> categories = categoryService.getCategoriesReversedNames(item);
            if (!categories.isEmpty()) jsonItem.setCategory(categories);
            jsonItem.setSeller(new JsonSeller(item.getUser().getUsername(),
                    sellerRatingRepository.aggrRatingByUserId(userId).orElse(null)));
            List<Bid> bidsList = bidRepository.findByItemId(item.getId());
            for (Bid bid : bidsList) {
                JsonBid jsonBid = new JsonBid(bid);
                jsonBid.setBidder(new JsonBidder(bid.getUser(),
                        bidderRatingRepository.aggrRatingByUserId(bid.getUser().getId()).orElse(null)));
                jsonItem.addBid(jsonBid);
            }
            jsonItems.addItem(jsonItem);
        }
        return jsonItems;
    }

    //@Transactional
    public JsonItems getAllJsonItems() {

        Iterable<Item> itemsList = itemRepository.findAll();
        JsonItems jsonItems = new JsonItems();

        for (Item item : itemsList) {
            JsonItem jsonItem = new JsonItem(item);
            List<String> categories = categoryService.getCategoriesReversedNames(item);
            if (!categories.isEmpty()) jsonItem.setCategory(categories);
            jsonItem.setSeller(new JsonSeller(item.getUser().getUsername(),
                    sellerRatingRepository.aggrRatingByUserId(item.getUser().getId()).orElse(null)));
            List<Bid> bidsList = bidRepository.findByItemId(item.getId());
            for (Bid bid : bidsList) {
                JsonBid jsonBid = new JsonBid(bid);
                jsonBid.setBidder(new JsonBidder(bid.getUser(),
                        bidderRatingRepository.aggrRatingByUserId(bid.getUser().getId()).orElse(null)));
                jsonItem.addBid(jsonBid);
            }
            jsonItems.addItem(jsonItem);
        }
        return jsonItems;
    }
}
