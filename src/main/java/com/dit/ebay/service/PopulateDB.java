package com.dit.ebay.service;

import com.dit.ebay.csv_model.*;
import com.dit.ebay.exception.AppException;
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

@Service
public class PopulateDB {

    @Autowired
    private RoleRepository roleRepository;

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
    private MessageRepository messageRepository;

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
    private static final String MESSAGES_DATA_FILE = "my_data/message_data.csv";

    public void populateStaticRoles() {
        if (roleRepository.findById(FIRST_ID).orElse(null) != null) return;
        roleRepository.save(new Role((RoleName.ROLE_ADMIN)));
        roleRepository.save(new Role(RoleName.ROLE_SELLER));
        roleRepository.save(new Role(RoleName.ROLE_BIDDER));
    }

    /*
     * Only admin will be created here
     */
    public void createAdmin() throws AppException {
        // if admin exists just return
        if (userRepository.findByUsername("ADM").orElse(null) != null) {
            return;
        }

        // Create admin
        User admin = new User("Tom", "McDonald", "ADM", passwordEncoder.encode("ADMIN123"), "adm@flo.com", true);
        // Avoid extra insertions
        Role userRoleAdmin = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new AppException("User Role Admin not set."));
        admin.addRole(userRoleAdmin);
        userRepository.save(admin);
    }

    public void populateUsers() throws IOException,AppException {
        try (Reader reader = Files.newBufferedReader(Paths.get(USERS_DATA_FILE))) {
            CsvToBean<CsvUser> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(CsvUser.class)
                    .withIgnoreLeadingWhiteSpace(true).build();

            for (CsvUser csvUser : csvToBean) {

                if (userRepository.findByUsername(csvUser.getUsername()).orElse(null) != null) continue;

                // Insert in db
                User user = new User(csvUser);

                // Encode password
                user.setPassword(passwordEncoder.encode(user.getPassword()));

                // Remember all these user have both roles
                /*
                user.addRole(new Role(RoleName.ROLE_SELLER));
                user.addRole(new Role(RoleName.ROLE_BIDDER));
                */
                // Avoid extra insertions
                Role userRoleSeller = roleRepository.findByName(RoleName.ROLE_SELLER)
                        .orElseThrow(() -> new AppException("User Role Seller not set."));
                Role userRoleBidder = roleRepository.findByName(RoleName.ROLE_BIDDER)
                        .orElseThrow(() -> new AppException("User Role Bidder not set."));
                user.addRole(userRoleSeller);
                user.addRole(userRoleBidder);

                userRepository.save(user);
            }
        }
    }

    public void populateItems() throws IOException {
        try (Reader reader = Files.newBufferedReader(Paths.get(ITEMS_DATA_FILE))) {
            CsvToBean<CsvItem> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(CsvItem.class)
                    .withIgnoreLeadingWhiteSpace(true).build();

            if (itemRepository.findById(FIRST_ID).orElse(null) != null) return;

            for (CsvItem csvItem : csvToBean) {

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
            CsvToBean<CsvItemEnded> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(CsvItemEnded.class)
                    .withIgnoreLeadingWhiteSpace(true).build();

            for (CsvItemEnded csvItemEnded : csvToBean) {
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
            CsvToBean<CsvBid> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(CsvBid.class)
                    .withIgnoreLeadingWhiteSpace(true).build();

            // insert only once (populate)
            if (bidRepository.findById(FIRST_ID).orElse(null) != null) return;

            for (CsvBid csvBid : csvToBean) {

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

                if (bestBid == null || bid.getBidAmount().compareTo(bestBid.getBidAmount()) > 0) {
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
            CsvToBean<CsvBidEnded> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(CsvBidEnded.class)
                    .withIgnoreLeadingWhiteSpace(true).build();

            if (bidRepository.findById(LAST_BID_ENDED_ID).orElse(null) != null) return;

            for (CsvBidEnded csvBidEnded : csvToBean) {

                // Get the user
                User user = userRepository.findByUsername(csvBidEnded.getUsername()).orElse(null);
                if (user == null) continue;

                // Get Item
                Item item = itemRepository.findByName(csvBidEnded.getItemName()).orElse(null);
                if (item == null) continue;

                Bid bid = new Bid(csvBidEnded);
                bid.setBidTime(csvBidEnded.getBidTime());

                // Create bid
                bid.setUser(user);
                bid.setItem(item);
                Bid bidRes = bidRepository.save(bid);

                // increment the bids
                Bid bestBid = itemRepository.findBestBidByItemId(item.getId()).orElse(null);

                if (bestBid == null || bid.getBidAmount().compareTo(bestBid.getBidAmount()) > 0) {
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
            CsvToBean<CsvRating> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(CsvRating.class)
                    .withIgnoreLeadingWhiteSpace(true).build();

            if (sellerRatingRepository.findById(FIRST_ID).orElse(null) != null) return;

            for (CsvRating csvRating : csvToBean) {
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

    public void populateMessages() throws IOException {
        try (Reader reader = Files.newBufferedReader(Paths.get(MESSAGES_DATA_FILE))) {
            CsvToBean<CsvMessage> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(CsvMessage.class)
                    .withIgnoreLeadingWhiteSpace(true).build();

            if (messageRepository.findById(FIRST_ID).orElse(null) != null) return;

            for (CsvMessage csvMessage : csvToBean) {
                // Get the user
                User sender = userRepository.findByUsername(csvMessage.getSenderUsername()).orElse(null);
                if (sender == null) continue;

                // Get the user
                User receiver = userRepository.findByUsername(csvMessage.getReceiverUsername()).orElse(null);
                if (receiver == null) continue;

                Message message = new Message(csvMessage);
                message.setUserSender(sender);
                message.setUserReceiver(receiver);

                messageRepository.save(message);
            }
        }
    }
}
