package com.dit.ebay.service;

import com.dit.ebay.exception.AppException;
import com.dit.ebay.model.*;
import com.dit.ebay.repository.*;
import com.dit.ebay.util.LevelCategory;
import com.dit.ebay.util.RecursiveQueries;
import com.dit.ebay.xml_model.*;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.*;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/*
 * User it to read xml files and write
 */
@Service
//@Transactional
public class XmlService {

    private static final String EBAY_DATA = "ebay-data/";

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

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ItemService itemService;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private CategoryService categoryService;

    private List<LevelCategory> createLevelCategoriesList(long lvl) {
        //hierarchyLevelQuery
        Query q = entityManager.createNativeQuery(RecursiveQueries.hierarchyLevelQuery).setParameter(1, lvl);
        List<Object[]> objs = q.getResultList();
        entityManager.clear();

        List<LevelCategory> levelsCategories = new ArrayList<>();
        // object[] = {id, name, lvl
        for (Object[] o : objs) {
            BigInteger tempId = (BigInteger) o[0];
            BigInteger tempLvl = (BigInteger) o[2];
            levelsCategories.add(new LevelCategory(tempId.longValue(), (String) o[1], tempLvl.longValue()));
        }
        return levelsCategories;
    }

    private Category xmlItemCategoriesImport(List<String> categoriesNames) {
        Category currentParent = null;
        Category lastCat = null;
        boolean parentCheck = false;
        for (String catName : categoriesNames) {
            List<Category> currentCategory = categoryRepository.findByCategoryName(catName);
            if (currentCategory.isEmpty()) {
                Category newCat = new Category(catName);
                newCat.setParentCategory(currentParent);
                newCat = categoryRepository.save(newCat);
                currentParent = newCat;
                lastCat = newCat;
            } else {
                parentCheck = false;
                for (Category catFound : currentCategory) {
                    Category parent = catFound.getParentCategory();
                    if (parent == null && currentParent == null) {
                        currentParent = catFound;
                        lastCat = catFound;
                        parentCheck = true;
                        break;
                    } else if (parent != null && currentParent != null && parent.getId().equals(currentParent.getId())) {
                        currentParent = catFound;
                        lastCat = catFound;
                        parentCheck = true;
                        break;
                    }
                }
                if (!parentCheck) {
                    Category newCat = new Category(catName);
                    newCat.setParentCategory(currentParent);
                    newCat = categoryRepository.save(newCat);
                    currentParent = newCat;
                    lastCat = newCat;
                }
            }
        }
        return lastCat; // returns last cat to put fk from item to category
    }

    @Transactional
    public void XmlCategoriesImport() throws JAXBException, IOException {
        JAXBContext context = JAXBContext.newInstance(XmlItems.class);

        // XML => objects
        Unmarshaller unmarshaller = context.createUnmarshaller();

        // eliminate code
        File dir = new File(EBAY_DATA);
        File[] files = dir.listFiles((dir1, name) -> name.endsWith(".xml"));

        // root
        Category rootCategory = null;
        /*
        // hierarchy query needs mainRoot
        List<Category> catRoot = categoryRepository.findByCategoryName("MainRoot");
        if (catRoot.isEmpty()) {
           rootCategory = new Category("MainRoot");
           rootCategory.setParentCategory(null);
           categoryRepository.save(rootCategory);
        } else {
            rootCategory = catRoot.get(0);
        }
        */
        for (File xmlFile : files) {
            XmlItems xmlItems = (XmlItems) unmarshaller.unmarshal(new FileReader(xmlFile));
            //System.out.println("------------" + xmlFile.getName() + "--------\n\n\n");
            for (XmlItem xmlItem : xmlItems.getXmlItems()) {
                List<String> categoriesNames = xmlItem.getCategory();
                Category currentParent = rootCategory;
                Category lastCat = null;
                boolean parentCheck = false;
                for (String catName : categoriesNames) {
                    List<Category> currentCategory = categoryRepository.findByCategoryName(catName);
                    if (currentCategory.isEmpty()) {
                        Category newCat = new Category(catName);
                        newCat.setParentCategory(currentParent);
                        newCat = categoryRepository.save(newCat);
                        currentParent = newCat;
                        lastCat = newCat;
                    } else {
                        parentCheck = false;
                        for (Category catFound : currentCategory) {
                            Category parent = catFound.getParentCategory();
                            if (parent == null && currentParent == null) {
                                currentParent = catFound;
                                lastCat = catFound;
                                parentCheck = true;
                                break;
                            } else if (parent != null && currentParent != null && parent.getId().equals(currentParent.getId())) {
                                currentParent = catFound;
                                lastCat = catFound;
                                parentCheck = true;
                                break;
                            }
                        }
                        if (!parentCheck) {
                            Category newCat = new Category(catName);
                            newCat.setParentCategory(currentParent);
                            newCat = categoryRepository.save(newCat);
                            currentParent = newCat;
                            lastCat = newCat;
                        }
                    }
                }
            }
        }
    }

    //@Transactional
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

                //System.out.println("===============>" + xmlItem.getName()+ "<=================");
                Item item = new Item(xmlItem);
                item.setUser(seller);
                item.setActive(false);

                // categories insertion here
                Category lastCategory = xmlItemCategoriesImport(xmlItem.getCategory());
                item.setCategory(lastCategory);
                item = itemRepository.save(item);

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
            List<String> categories = categoryService.getCategoriesReversedNames(item);
            if (!categories.isEmpty()) xmlItem.setCategory(categories);
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
            List<String> categories = categoryService.getCategoriesReversedNames(item);
            if (!categories.isEmpty()) xmlItem.setCategory(categories);
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