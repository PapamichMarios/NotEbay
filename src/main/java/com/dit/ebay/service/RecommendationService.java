package com.dit.ebay.service;

import com.dit.ebay.lsh.HashTable;
import com.dit.ebay.model.Bid;
import com.dit.ebay.model.Item;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.BidRepository;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.List;

@Service
public class RecommendationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private BidRepository bidRepository;

    private final static int K = 5; // hyperplanes
    private final static int L = 4; // number of hashtables


    public void Recommendation(User user) {
        int tableSize = (int) Math.pow(2, K);
        List<User> usersList = userRepository.findAllExceptUserId((user.getId()));
        List<Item> itemsList = itemRepository.findAlllItems(Sort.by(Sort.Direction.ASC, "id"));

        //find out number of items from db [dimensions]
        int itemNumber = itemsList.size();
        double[] userVector = new double[itemNumber];

        //create LSH
        HashTable[] lsh = new HashTable[L];
        for (int i = 0; i < L; i++) {
            lsh[i] = new HashTable(tableSize, K, itemNumber);
        }

        // init array with zeroes
        for (int i = 0; i < itemNumber; i++) {
            userVector[i] = 0;
        }

        // current user vector
        for (int j = 0; j < itemsList.size(); j++) {
            // if is inactive then skip it
            if (!itemsList.get(j).isActive()) {
                userVector[j] = 0;
                continue;
            }

            // find if user has bid on current item
            List<Bid> userBidItemList = bidRepository.findByItemIdBidderId(itemsList.get(j).getId(), user.getId());
            userVector[j] = !userBidItemList.isEmpty() ? 1 : 0;
        }
        // insert in hashtables
        for (int i = 0; i < L; i++) {
            lsh[i].HashTable_Put(userVector, user.getId());
        }

        // for each user
        for (int i = 0; i < usersList.size(); i++) {
            // create vectors
            for (int j = 0; j < itemsList.size(); j++) {
                // if is inactive then skip it
                if (!itemsList.get(j).isActive()) {
                    userVector[j] = 0;
                    continue;
                }

                // find if user has bid on current item
                List<Bid> userBidItemList = bidRepository.findByItemIdBidderId(itemsList.get(j).getId(), user.getId());
                userVector[j] = !userBidItemList.isEmpty() ? 1 : 0;
            }
            // insert in hashtables
            for (int p = 0; p < L; p++) {
                lsh[p].HashTable_Put(userVector, usersList.get(i).getId());
            }
            return;
        }
    }

    public void Recommendation (Long userId){
        User user = userRepository.findById(userId).orElse(null);
        int tableSize = (int) Math.pow(2, K);
        List<User> usersList = userRepository.findAllExceptUserId(user.getId());
        List<Item> itemsList = itemRepository.findAlllItems(Sort.by(Sort.Direction.ASC, "id"));

        /*
        for (Item item : itemsList) {
            System.out.println(item.getId());
        }
        */

        //find out number of items from db [dimensions]
        int itemNumber = itemsList.size();
        double[] userVector = new double[itemNumber];

        //create LSH
        HashTable[] lsh = new HashTable[L];
        for (int i = 0; i < L; i++) {
            lsh[i] = new HashTable(tableSize, K, itemNumber);
        }

        // init array with zeroes
        for (int i = 0; i < itemNumber; i++) {
            userVector[i] = 0;
        }

        // current user vector
        for (int j = 0; j < itemsList.size(); j++) {
            // if is inactive then skip it
            if (!itemsList.get(j).isActive()) {
                userVector[j] = 0;
                continue;
            }

            // find if user has bid on current item
            List<Bid> userBidItemList = bidRepository.findByItemIdBidderId(itemsList.get(j).getId(), user.getId());
            userVector[j] = !userBidItemList.isEmpty() ? 1 : 0;
        }

        /*
        System.out.println("Vector of User {" + user.getUsername() + "," + user.getId() + "} we want to recommend : ");
        System.out.print("| ");
        // insert in hashtables
        for (int l = 0; l < itemNumber; l++) {
            System.out.print("{" + userVector[l] +" ," + itemsList.get(l).getName() + "} | ");
        }
        System.out.println("\n size of vector : " + itemNumber);
        */

        for (int i = 0; i < L; i++) {
            lsh[i].HashTable_Put(userVector, user.getId());
        }

        // for each user
        for (int i = 0; i < usersList.size(); i++) {
            // create vectors
            for (int j = 0; j < itemsList.size(); j++) {
                // if is inactive then skip it
                if (!itemsList.get(j).isActive()) {
                    userVector[j] = 0;
                    continue;
                }

                // find if user has bid on current item
                List<Bid> userBidItemList = bidRepository.findByItemIdBidderId(itemsList.get(j).getId(), user.getId());
                userVector[j] = !userBidItemList.isEmpty() ? 1 : 0;
            }
            // insert in hashtables
            for (int p = 0; p < L; p++) {
                lsh[p].HashTable_Put(userVector, usersList.get(i).getId());
            }
        }
    }

}