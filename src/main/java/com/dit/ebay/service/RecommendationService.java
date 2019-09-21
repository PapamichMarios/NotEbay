package com.dit.ebay.service;

import com.dit.ebay.lsh.HashTable;
import com.dit.ebay.lsh.Neighbour;
import com.dit.ebay.lsh.Recommendation;
import com.dit.ebay.model.Bid;
import com.dit.ebay.model.Item;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.BidRepository;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.util.LshConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Service
public class RecommendationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private BidRepository bidRepository;

    private final static int K = LshConstants.K; // hyperplanes
    private final static int L = LshConstants.L; // number of hash-tables

    public double[] computeRecommendation(HashTable[] lsh, double[] userVector) {
        ArrayList<Neighbour> htNeighbours = new ArrayList<>();
        for (int i = 0; i < L; i++) {
            htNeighbours.addAll(lsh[i].HashTable_GetNeighbourhood(userVector));
        }
        return Recommendation.predictItem(Recommendation.getRecommendationNeighbours(htNeighbours), userVector);
    }

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

        double[] userVectorTemp = new double[itemNumber];
        // init array with zeroes
        for (int i = 0; i < itemNumber; i++) {
            userVectorTemp[i] = 0;
        }

        // for each user
        for (int i = 0; i < usersList.size(); i++) {
            // create vectors
            for (int j = 0; j < itemsList.size(); j++) {
                // if is inactive then skip it
                if (!itemsList.get(j).isActive()) {
                    userVectorTemp[j] = 0;
                    continue;
                }

                // find if user has bid on current item
                List<Bid> userBidItemList = bidRepository.findByItemIdBidderId(itemsList.get(j).getId(), user.getId());
                userVectorTemp[j] = !userBidItemList.isEmpty() ? 1 : 0;
            }
            // insert in hashtables
            for (int p = 0; p < L; p++) {
                lsh[p].HashTable_Put(userVectorTemp, usersList.get(i).getId());
            }
        }
        return;
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

        double[] userVectorTemp = new double[itemNumber];
        // init array with zeroes
        for (int i = 0; i < itemNumber; i++) {
            userVectorTemp[i] = 0;
        }

        // for each user
        for (int i = 0; i < usersList.size(); i++) {
            // create vectors
            for (int j = 0; j < itemsList.size(); j++) {
                // if is inactive then skip it
                if (!itemsList.get(j).isActive()) {
                    userVectorTemp[j] = 0;
                    continue;
                }

                // find if user has bid on current item
                List<Bid> userBidItemList = bidRepository.findByItemIdBidderId(itemsList.get(j).getId(), user.getId());
                userVectorTemp[j] = !userBidItemList.isEmpty() ? 1 : 0;
            }
            System.out.println("Vector of User {" + usersList.get(i).getId() + "," + usersList.get(i).getUsername() + "} : ");
            System.out.print("| ");
            // insert in hashtables
            for (int l = 0; l < itemNumber; l++) {
                System.out.print("{" + userVectorTemp[l] +" ," + itemsList.get(l).getName() + "} | ");
            }
            System.out.println("\n size of vector : " + itemNumber);
            // insert in hashtables
            for (int p = 0; p < L; p++) {
                lsh[p].HashTable_Put(userVectorTemp, usersList.get(i).getId());
            }
        }

        double[] userPredVector = computeRecommendation(lsh, userVector);
        for (double pred : userPredVector) {
            System.out.print(pred + "|");
        }
        System.out.println();

        System.out.println("Vector of User {" + user.getUsername() + "," + user.getId() + "} we want to recommend : ");
        System.out.print("| ");
        // insert in hashtables
        for (int l = 0; l < itemNumber; l++) {
            System.out.print("{" + userVector[l] +" ," + itemsList.get(l).getName() + "} | ");
        }
        System.out.println("\n size of vector : " + itemNumber);

    }

}