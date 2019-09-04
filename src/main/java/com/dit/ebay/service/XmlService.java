package com.dit.ebay.service;

import com.dit.ebay.exception.AppException;
import com.dit.ebay.model.*;
import com.dit.ebay.repository.*;
import com.dit.ebay.xml_model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

/*
 * User it to read xml files and write
 */
@Service
public class XmlService {

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
    private SellerRatingRepository sellerRatingRepository;

    @Autowired
    private BidderRatingRepository bidderRatingRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void XmlImport() throws JAXBException, IOException {
        JAXBContext context = JAXBContext.newInstance(XmlItems.class);

        // XML => objects
        Unmarshaller unmarshaller = context.createUnmarshaller();

        // eliminate code
        File dir = new File(EBAY_DATA);
        File[] files = dir.listFiles((dir1, name) -> name.endsWith(".xml"));
        for (File xmlFile : files) {
            //System.out.println("---------------------" + xmlFile + "------------------------");
            XmlItems xmlItems = (XmlItems) unmarshaller.unmarshal(new FileReader(xmlFile));
            // loop over all xml items
            for (XmlItem xmlItem :  xmlItems.getXmlItems()) {
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
                for (XmlBid xmlBid : xmlItem.getBids()) {
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

    //@Transactional
    public XmlItems getXmlItems(Long userId) {
        //Object => XML (maybe use it)
        //JAXBContext context = JAXBContext.newInstance(XmlItems.class);
        //Marshaller marshaller = context.createMarshaller();
        //marshaller.setProperty(MarshallerProperties.MEDIA_TYPE, "application/json");
        //marshaller.setProperty(MarshallerProperties.JSON_INCLUDE_ROOT, true);
        //marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

        List<Item> itemsList = itemRepository.findAllByUserId(userId);
        XmlItems xmlItems = new XmlItems();

        for (Item item : itemsList) {
            XmlItem xmlItem = new XmlItem(item);
            xmlItem.setSeller(new XmlSeller(item.getUser().getUsername(),
                            sellerRatingRepository.aggrRatingByUserId(userId).orElse(null)));
            List<Bid> bidsList = bidRepository.findByItemId(item.getId());
            for (Bid bid : bidsList) {
                XmlBid xmlBid = new XmlBid(bid);
                xmlBid.setBidder(new XmlBidder(bid.getUser(),
                                 bidderRatingRepository.aggrRatingByUserId(bid.getUser().getId()).orElse(null)));
                xmlItem.addBid(xmlBid);
            }
            xmlItems.addItem(xmlItem);
        }
        //System.out.println(xmlItems);
        //marshaller.marshal(xmlItems, new File("out.json"));
        return xmlItems;
    }

    //@Transactional
    public XmlItems getAllXmlItems() {
        //Object => XML (maybe use it)
        //JAXBContext context = JAXBContext.newInstance(XmlItems.class);
        //Marshaller marshaller = context.createMarshaller();
        //marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

        Iterable<Item> itemsList = itemRepository.findAll();
        XmlItems xmlItems = new XmlItems();

        for (Item item : itemsList) {
            XmlItem xmlItem = new XmlItem(item);
            xmlItem.setSeller(new XmlSeller(item.getUser().getUsername(),
                    sellerRatingRepository.aggrRatingByUserId(item.getUser().getId()).orElse(null)));
            List<Bid> bidsList = bidRepository.findByItemId(item.getId());
            for (Bid bid : bidsList) {
                XmlBid xmlBid = new XmlBid(bid);
                xmlBid.setBidder(new XmlBidder(bid.getUser(),
                        bidderRatingRepository.aggrRatingByUserId(bid.getUser().getId()).orElse(null)));
                xmlItem.addBid(xmlBid);
            }
            xmlItems.addItem(xmlItem);
        }
        //System.out.println(xmlItems);
        //marshaller.marshal(xmlItems, new File("out.xml"));
        return xmlItems;
    }
}