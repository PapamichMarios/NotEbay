package com.dit.ebay.service;

import com.dit.ebay.exception.AppException;
import com.dit.ebay.model.*;
import com.dit.ebay.repository.BidRepository;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.RoleRepository;
import com.dit.ebay.repository.UserRepository;
import com.dit.ebay.xml_model.XMLBid;
import com.dit.ebay.xml_model.XMLItem;
import com.dit.ebay.xml_model.XMLItems;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.io.FileReader;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/*
 * User it to read xml files and write
 */
@Service
public class XMLService {

    private static final String EBAY_DATA = "ebay_data/";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void XMLImport() throws JAXBException, IOException {
        JAXBContext context = JAXBContext.newInstance(XMLItems.class);

        // XML => objects
        Unmarshaller unmarshaller = context.createUnmarshaller();

        // eliminate code
        File dir = new File(EBAY_DATA);
        File[] files = dir.listFiles((dir1, name) -> name.endsWith(".xml"));
        for (File xmlFile : files) {
            //System.out.println("---------------------" + xmlFile + "------------------------");
            XMLItems xmlItems = (XMLItems) unmarshaller.unmarshal(new FileReader(xmlFile));
            // loop over all xml items
            for (XMLItem xmlItem :  xmlItems.getXmlItems()) {
                User seller = userRepository.findByUsername(xmlItem.getSeller().getUsername()).orElse(null);
                if (seller == null) {
                    seller = new User(xmlItem.getSeller());
                    seller.setPassword(passwordEncoder.encode(seller.getPassword()));
                    seller.setEnabled(true);
                    Role userRoleSeller = roleRepository.findByName(RoleName.ROLE_SELLER)
                            .orElseThrow(() -> new AppException("User Role Seller not set."));
                    Role userRoleBidder = roleRepository.findByName(RoleName.ROLE_BIDDER)
                            .orElseThrow(() -> new AppException("User Role Bidder not set."));
                    seller.addRole(userRoleSeller);
                    seller.addRole(userRoleBidder);
                    seller = userRepository.save(seller);
                }

                Item item = itemRepository.findByName(xmlItem.getName()).orElse(null);
                if (item == null) {
                    //System.out.println("===============>" + xmlItem.getName()+ "<=================");
                    item = new Item(xmlItem);
                    item.setUser(seller);
                    item.setActive(false);
                    item = itemRepository.save(item);
                }

                Bid lastBid = null;
                for (XMLBid xmlBid : xmlItem.getBids()) {
                    if (xmlBid.getBidder() == null) break;
                    User bidder = userRepository.findByUsername(xmlBid.getBidder().getUsername()).orElse(null);
                    if (bidder == null) {
                        bidder = new User(xmlBid.getBidder());
                        bidder.setPassword(passwordEncoder.encode(bidder.getPassword()));
                        bidder.setEnabled(true);
                        Role userRoleSeller = roleRepository.findByName(RoleName.ROLE_SELLER)
                                .orElseThrow(() -> new AppException("User Role Seller not set."));
                        Role userRoleBidder = roleRepository.findByName(RoleName.ROLE_BIDDER)
                                .orElseThrow(() -> new AppException("User Role Bidder not set."));
                        bidder.addRole(userRoleSeller);
                        bidder.addRole(userRoleBidder);
                        bidder = userRepository.save(bidder);
                    }
                    Bid bid = new Bid(xmlBid);
                    bid.setUser(bidder);
                    bid.setItem(item);
                    lastBid = bidRepository.save(bid);
                }
                if (lastBid != null) {
                    item.setBestBid(lastBid);
                    itemRepository.save(item);
                }
            }
        }
    }


}

/*
       // Object => XML
        //Marshaller marshaller = context.createMarshaller();
        //marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

        // XML => objects
        Unmarshaller unmarshaller = context.createUnmarshaller();

        List<XMLItem> xmlItemsList = new ArrayList<>();
        XMLItem xmlItem = new XMLItem();
        xmlItem.getCategory().add("1");
        xmlItem.getCategory().add("2");
        xmlItem.getCategory().add("3");
        xmlItem.getCategory().add("4");
        xmlItemsList.add(xmlItem);
        xmlItemsList.add(xmlItem);
        xmlItemsList.add(xmlItem);
        xmlItemsList.add(xmlItem);
        xmlItemsList.add(xmlItem);
        xmlItemsList.add(xmlItem);
        XMLItems xmlItems = new XMLItems();
        xmlItems.setXmlItems(xmlItemsList);

        // print them
        marshaller.marshal(xmlItems, System.out);
*/