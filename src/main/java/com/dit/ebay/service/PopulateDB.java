package com.dit.ebay.service;

import com.dit.ebay.csv_model.CSVItem;
import com.dit.ebay.model.Item;
import com.dit.ebay.model.Role;
import com.dit.ebay.model.RoleName;
import com.dit.ebay.model.User;
import com.dit.ebay.csv_model.CSVUser;
import com.dit.ebay.repository.BidRepository;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.UserRepository;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
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
    UserRepository userRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    BidRepository bidRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    private static final String USERS_DATA_FILE = "my_data/user_data.csv";
    private static final String ITEMS_DATA_FILE = "my_data/item_data.csv";

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

            for (CSVItem csvItem : csvToBean) {

                if (itemRepository.findItemByName(csvItem.getName()).orElse(null) != null) continue;

                // Get the user
                User user = userRepository.findByUsername(csvItem.getUsername()).orElse(null);
                if (user == null) continue;

                Item item = new Item(csvItem);
                item.setUser(user);

                itemRepository.save(item);
            }
        }
    }
}
