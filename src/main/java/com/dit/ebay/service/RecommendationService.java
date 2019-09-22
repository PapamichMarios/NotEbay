package com.dit.ebay.service;

import com.dit.ebay.lsh.HashTable;
import com.dit.ebay.lsh.Neighbour;
import com.dit.ebay.lsh.PredictedVector;
import com.dit.ebay.lsh.Recommendation;
import com.dit.ebay.model.Bid;
import com.dit.ebay.model.Category;
import com.dit.ebay.model.Item;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.BidRepository;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.response.ItemResponse;
import com.dit.ebay.util.LshConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

// TODO : read whole date into hash-tables for O(1) search
// TODO : after sorting apply binary search for O(log(n)) search
// TODO : avoid reading from database to main memory each time
@Service
public class RecommendationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ImageService imageService;

    private final static int K = LshConstants.K; // hyperplanes
    private final static int L = LshConstants.L; // number of hash-tables

    public double[] computeRecommendation(HashTable[] lsh, double[] userVector) {
        ArrayList<Neighbour> htNeighbours = new ArrayList<>();
        // TODO : we will use CN max 5 so i avoided to built hash index on neighbours
        for (int i = 0; i < L; i++) {
            ArrayList<Neighbour> nFound = lsh[i].HashTable_GetNeighbourhood(userVector);
            boolean found;
            for (Neighbour n : nFound) {
                found = false;
                for (int j = 0; j < htNeighbours.size(); j++) {
                    if (n.getKey().equals(htNeighbours.get(j).getKey())) {
                        found = true;
                        break;
                    }
                }
                if (!found) htNeighbours.addAll(lsh[i].HashTable_GetNeighbourhood(userVector));
            }
        }
        /*
        for (Neighbour n : htNeighbours) {
            System.out.println(n);
        }
        */
        return Recommendation.predictItem(Recommendation.getRecommendationNeighbours(htNeighbours), userVector);
    }

    public List<ItemResponse> recommendTopItems(Long userId) {
        List<Bid> userBids = bidRepository.findAllByBidderId(userId);
        List<ItemResponse> itemsReco = new ArrayList<>();
        if (userBids.isEmpty()) {
            List<Item> itemsList = itemRepository.findAllItemsExUser(userId, Sort.by(Sort.Direction.DESC, "numOfBids"));
            for (int c = 0; c < LshConstants.CN && c < itemsList.size(); c++) {
                ItemResponse itemResponse = new ItemResponse(itemsList.get(c));
                itemResponse.setImageId(imageService.getImageResourcesFirst(itemsList.get(c)));
                itemsReco.add(itemResponse);
            }
        }
        return itemsReco;
    }

    public List<ItemResponse> Recommendation (Long userId){

        User user = userRepository.findById(userId).orElse(null);

        List<ItemResponse> itemsReco = recommendTopItems(userId);
        if (!itemsReco.isEmpty()) return itemsReco;

        int tableSize = (int) Math.pow(2, K);
        List<User> usersList = userRepository.findAllExceptUserId(user.getId());
        List<Item> itemsList = itemRepository.findAllItemsExUser(user.getId(), Sort.by(Sort.Direction.ASC, "id"));

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
            // find if user has bid on current item
            List<Bid> userBidItemList = bidRepository.findByItemIdBidderId(itemsList.get(j).getId(), user.getId());
            userVector[j] = !userBidItemList.isEmpty() ? 1 : 0;
        }

        double[] userVectorTemp = new double[itemNumber];
        // init array with zeroes
        for (int i = 0; i < itemNumber; i++) {
            userVectorTemp[i] = 0;
        }

        boolean flag = false;
        // for each user
        for (int i = 0; i < usersList.size(); i++) {
            // create vectors
            if (bidRepository.findAllByBidderId(usersList.get(i).getId()).isEmpty()) continue;

            flag = true;
            for (int j = 0; j < itemsList.size(); j++) {
                // find if user has bid on current item
                List<Bid> userBidItemList = bidRepository.findByItemIdBidderId(itemsList.get(j).getId(), usersList.get(i).getId());
                userVectorTemp[j] = !userBidItemList.isEmpty() ? 1 : 0;
            }
            // insert in hasht-ables
            for (int p = 0; p < L; p++) {
                lsh[p].HashTable_Put(userVectorTemp, usersList.get(i).getId());
            }
        }

        if (!flag) {
            itemsReco = recommendTopItems(userId);
            return itemsReco;
        }

        double[] userPredVector = computeRecommendation(lsh, userVector);

        PredictedVector[] predictedVectors = new PredictedVector[itemNumber];

        for (int i = 0; i < itemNumber; i++) {
            predictedVectors[i] = new PredictedVector(itemsList.get(i).getId(), userPredVector[i]);
        }
        Arrays.sort(predictedVectors, (a, b) -> Double.compare(b.getPredVal(), a.getPredVal()));

        int count = 0;
        itemsReco = new ArrayList<>();

        // TODO :  we could use binary search instead of reading to main memory
        for (int i = 0; i < itemNumber; i++) {
            Item itemFound = itemRepository.findById(predictedVectors[i].getItemId()).orElse(null);
            if (count == LshConstants.CN)
                break;
            if (itemFound != null && itemFound.isActive()) {
                ItemResponse itemResponse = new ItemResponse(itemsList.get(i));
                itemResponse.setImageId(imageService.getImageResourcesFirst(itemsList.get(i)));
                itemsReco.add(itemResponse);
                count++;
            }
        }
        /*
        for (Item item : itemsReco) {
            System.out.println(item.getName() + " | " + item.getId());
        }
        */
        return itemsReco;
    }

}