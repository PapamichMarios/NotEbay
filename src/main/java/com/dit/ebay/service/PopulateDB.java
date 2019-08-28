package com.dit.ebay.service;

import com.dit.ebay.csv_model.*;
import com.dit.ebay.model.*;
import com.dit.ebay.repository.*;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class PopulateDB {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SellerRatingRepository sellerRatingRepository;

    @Autowired
    private BidderRatingRepository bidderRatingRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(PopulateDB.class);

    private static final long FIRST_ID = 1;
    private static final long LAST_BID_ENDED_ID = 21;
    private static final String USERS_DATA_FILE = "my_data/user_data.csv";
    private static final String ITEMS_DATA_FILE = "my_data/item_data.csv";
    private static final String BIDS_DATA_FILE  = "my_data/bid_data.csv";
    private static final String RATINGS_DATA_FILE  = "my_data/rating_data.csv";
    private static final String ITEMS_ENDED_DATA_FILE = "my_data/item_ended_data.csv";
    private static final String BIDS_ENDED_DATA_FILE = "my_data/bid_ended_data.csv";

    public void populateUsers() throws IOException {
        try (Reader reader = Files.newBufferedReader(Paths.get(USERS_DATA_FILE))) {
            CsvToBean<CSVUser> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(CSVUser.class)
                    .withIgnoreLeadingWhiteSpace(true).build();

            for (CSVUser csvUser : csvToBean) {

                if (userRepository.findByUsername(csvUser.getUsername()).orElse(null) != null) continue;

                // Insert in db
                User user = new User(csvUser);

                // Encode password
                user.setPassword(passwordEncoder.encode(user.getPassword()));

                // Remember all these user have both roles
                user.addRole(new Role(RoleName.ROLE_SELLER));
                user.addRole(new Role(RoleName.ROLE_BIDDER));

                userRepository.save(user);
            }
        }
    }

    public void populateItems() throws IOException {
        try (Reader reader = Files.newBufferedReader(Paths.get(ITEMS_DATA_FILE))) {
            CsvToBean<CSVItem> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(CSVItem.class)
                    .withIgnoreLeadingWhiteSpace(true).build();

            if (itemRepository.findById(FIRST_ID).orElse(null) != null) return;

            for (CSVItem csvItem : csvToBean) {

                if (itemRepository.findByName(csvItem.getName()).orElse(null) != null) continue;

                // Get the user
                User user = userRepository.findByUsername(csvItem.getUsername()).orElse(null);
                if (user == null) continue;

                Item item = new Item(csvItem);
                item.setUser(user);
                Item result = itemRepository.save(item);

                // Insert categories
                String tempStr = csvItem.getCategoriesNames();
                if (!tempStr.isEmpty()) {
                    String[] categoriesNames = tempStr.split(",");
                    // Insert categories here
                    for (String categoryStr : categoriesNames) {
                        // safe check here
                        if (categoryRepository.findByItemIdAndCategoryStr(result.getId(), categoryStr).isEmpty()) {
                            Category category = new Category(categoryStr);
                            category.setItem(result);
                            categoryRepository.save(category);
                        }
                    }
                }
            }
        }
    }

    public void populateItemsEnded() throws IOException {
        try (Reader reader = Files.newBufferedReader(Paths.get(ITEMS_ENDED_DATA_FILE))) {
            CsvToBean<CSVItemEnded> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(CSVItemEnded.class)
                    .withIgnoreLeadingWhiteSpace(true).build();

            for (CSVItemEnded csvItemEnded : csvToBean) {
                // Get the user
                User user = userRepository.findByUsername(csvItemEnded.getUsername()).orElse(null);
                if (user == null) continue;

                if (itemRepository.findByName(csvItemEnded.getName()).orElse(null) != null)
                    continue;

                Item item = new Item(csvItemEnded);
                item.setTimeStarted(csvItemEnded.getTimeStarted());
                item.setUser(user);
                Item result = itemRepository.save(item);

                // Insert categories
                String tempStr = csvItemEnded.getCategoriesNames();
                if (!tempStr.isEmpty()) {
                    String[] categoriesNames = tempStr.split(",");
                    // Insert categories here
                    for (String categoryStr : categoriesNames) {
                        // safe check here
                        if (categoryRepository.findByItemIdAndCategoryStr(result.getId(), categoryStr).isEmpty()) {
                            Category category = new Category(categoryStr);
                            category.setItem(result);
                            categoryRepository.save(category);
                        }
                    }
                }
            }
        }
    }

    public void populateBids() throws IOException {
        try (Reader reader = Files.newBufferedReader(Paths.get(BIDS_DATA_FILE))) {
            CsvToBean<CSVBid> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(CSVBid.class)
                    .withIgnoreLeadingWhiteSpace(true).build();

            // insert only once (populate)
            if (bidRepository.findById(FIRST_ID).orElse(null) != null) return;

            for (CSVBid csvBid : csvToBean) {

                // Get the user
                User user = userRepository.findByUsername(csvBid.getUsername()).orElse(null);
                if (user == null) continue;

                // Get Item
                Item item = itemRepository.findByName(csvBid.getItemName()).orElse(null);
                if (item == null) continue;

                Bid bid = new Bid(csvBid);

                // Create bid
                bid.setUser(user);
                bid.setItem(item);
                Bid bidRes = bidRepository.save(bid);

                // increment the bids
                Bid bestBid = itemRepository.findBestBidByItemId(item.getId()).orElse(null);

                if (bestBid == null || bid.getBidAmount() > bestBid.getBidAmount()) {
                    item.setBestBid(bidRes);
                }

                // Update counter
                item.increaseNumOfBids();
                itemRepository.save(item);
            }
        }
    }

    public void populateBidsEnded() throws IOException {
        try (Reader reader = Files.newBufferedReader(Paths.get(BIDS_ENDED_DATA_FILE))) {
            CsvToBean<CSVBidEnded> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(CSVBidEnded.class)
                    .withIgnoreLeadingWhiteSpace(true).build();

            if (bidRepository.findById(LAST_BID_ENDED_ID).orElse(null) != null) return;

            for (CSVBidEnded csvBidEnded : csvToBean) {

                // Get the user
                User user = userRepository.findByUsername(csvBidEnded.getUsername()).orElse(null);
                if (user == null) continue;

                // Get Item
                Item item = itemRepository.findByName(csvBidEnded.getItemName()).orElse(null);
                if (item == null) continue;

                Bid bid = new Bid(csvBidEnded);
                System.out.println("---------------------------_" + csvBidEnded.getBidTime());
                bid.setBidTime(csvBidEnded.getBidTime());

                // Create bid
                bid.setUser(user);
                bid.setItem(item);
                Bid bidRes = bidRepository.save(bid);

                // increment the bids
                Bid bestBid = itemRepository.findBestBidByItemId(item.getId()).orElse(null);

                if (bestBid == null || bid.getBidAmount() > bestBid.getBidAmount()) {
                    item.setBestBid(bidRes);
                }

                // Update counter
                item.increaseNumOfBids();
                itemRepository.save(item);
            }
        }
    }

    public void populateRatings() throws IOException {
        try (Reader reader = Files.newBufferedReader(Paths.get(RATINGS_DATA_FILE))) {
            CsvToBean<CSVRating> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(CSVRating.class)
                    .withIgnoreLeadingWhiteSpace(true).build();

            if (sellerRatingRepository.findById(FIRST_ID).orElse(null) != null) return;

            for (CSVRating csvRating : csvToBean) {
                // Get the user
                User seller = userRepository.findByUsername(csvRating.getSellerUsername()).orElse(null);
                if (seller == null) continue;

                // Get the user
                User bidder = userRepository.findByUsername(csvRating.getBidderUsername()).orElse(null);
                if (bidder == null) continue;

                BidderRating bidderRating = new BidderRating(csvRating);
                bidderRating.setUserSeller(seller);
                bidderRating.setUserBidder(bidder);
                bidderRatingRepository.save(bidderRating);

                SellerRating sellerRating = new SellerRating(csvRating);
                sellerRating.setUserSeller(seller);
                sellerRating.setUserBidder(bidder);
                sellerRatingRepository.save(sellerRating);
            }
        }
    }
}
