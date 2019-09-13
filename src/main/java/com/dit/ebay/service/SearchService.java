package com.dit.ebay.service;

import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.Bid;
import com.dit.ebay.model.Category;
import com.dit.ebay.model.Item;
import com.dit.ebay.model.MetaModel.Item_;
import com.dit.ebay.model.User;
import com.dit.ebay.repository.CategoryRepository;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.SellerRatingRepository;
import com.dit.ebay.request.SearchNameRequest;
import com.dit.ebay.request.SearchRequest;
import com.dit.ebay.response.PagedResponse;
import com.dit.ebay.response.SearchItemResponse;
import com.dit.ebay.response.SearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// for simplicity when the first level of search arrive we get all the data
// we could optimize it by taking name+id+money something like that and on the click return more info
@Service
public class SearchService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private SellerRatingRepository sellerRatingRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ValidatePageParametersService validatePageParametersService;

    //@Transactional
    // constructs paged response
    // will only be used inside this class
    private PagedResponse<SearchResponse> createPagedResponse(Page<Item> itemsPaged) {
        if (itemsPaged.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), itemsPaged.getNumber(),
                    itemsPaged.getSize(), itemsPaged.getTotalElements(),
                    itemsPaged.getTotalPages(), itemsPaged.isLast());
        }

        List<SearchResponse> searchResponses = new ArrayList<>();
        for (Item item : itemsPaged) {
            SearchResponse searchResponse = new SearchResponse(item);
            searchResponses.add(searchResponse);
        }

        return new PagedResponse<>(searchResponses, itemsPaged.getNumber(),
                itemsPaged.getSize(), itemsPaged.getTotalElements(),
                itemsPaged.getTotalPages(), itemsPaged.isLast());
    }

    public PagedResponse<SearchResponse> searchByItemName(SearchNameRequest searchNameRequest, int page, int size) {
        validatePageParametersService.validate(page, size);
        Page<Item> itemsPaged = itemRepository.findItemsByName(searchNameRequest.getName(), PageRequest.of(page, size));
        return createPagedResponse(itemsPaged);
    }

    public PagedResponse<SearchResponse> searchByCategoryId(Long categoryId, int page, int size) {
        validatePageParametersService.validate(page, size);
        Page<Item> itemsPaged = itemRepository.findItemsByCategoryId(categoryId, PageRequest.of(page, size));
        return createPagedResponse(itemsPaged);
    }

    @Transactional(readOnly = true)
    public PagedResponse<SearchResponse> searchByMultiFields(Long categoryId, SearchRequest searchRequest,
                                                             int page, int size) {
        validatePageParametersService.validate(page, size);
        int count = 0;
        String hqlQuery = "select i from Item i where";
        if (categoryId != null) {
            hqlQuery += " i.category.id = :categoryId ";
            count++;
        }

        if (searchRequest.getName() != null && !searchRequest.getName().isEmpty()) {
            if (count != 0) {
                hqlQuery += " and ";
            }
            hqlQuery += " lower(i.name) like lower(concat('%', :name,'%')) ";
            count++;
        }

        if (searchRequest.getMinM() != null) {
            if (count != 0) {
                hqlQuery += " and ";
            }
            hqlQuery += " i.buyPrice >= :minMoney ";
            count++;
        }

        if (searchRequest.getMaxM() != null) {
            if (count != 0) {
                hqlQuery += " and ";
            }
            hqlQuery += " i.buyPrice <= :maxMoney ";
            count++;
        }

        if (searchRequest.getCnt() != null && !searchRequest.getCnt().isEmpty()) {
            if (count != 0) {
                hqlQuery += " and ";
            }
            hqlQuery += " i.country = :country ";
            count++;
        }

        if (searchRequest.getLoc() != null && !searchRequest.getLoc().isEmpty()) {
            if (count != 0) {
                hqlQuery += " and ";
            }
            hqlQuery += " i.location = :location ";
            count++;
        }

        if (searchRequest.getDescr() != null && !searchRequest.getDescr().isEmpty()) {
            if (count != 0) {
                hqlQuery += " and ";
            }
            hqlQuery += " lower(i.description) like lower(concat('%', :description,'%')) ";
            count++;
        }

        Query query = entityManager.createQuery(hqlQuery, Item.class);

        // set params
        if (categoryId != null) {
            query.setParameter("categoryId", categoryId);
        }

        if (searchRequest.getName() != null && !searchRequest.getName().isEmpty()) {
            query.setParameter("name", searchRequest.getName());
        }

        if (searchRequest.getMinM() != null) {
            query.setParameter("minMoney", searchRequest.getMinM());

        }

        if (searchRequest.getMaxM() != null) {
            query.setParameter("maxMoney", searchRequest.getMaxM());
        }

        if (searchRequest.getCnt() != null && !searchRequest.getCnt().isEmpty()) {
            query.setParameter("country", searchRequest.getCnt());

        }

        if (searchRequest.getLoc() != null && !searchRequest.getLoc().isEmpty()) {
            query.setParameter("location", searchRequest.getLoc());

        }

        if (searchRequest.getDescr() != null && !searchRequest.getDescr().isEmpty()) {
            query.setParameter("description", searchRequest.getDescr());
        }

        //System.out.println(hqlQuery);

        Page<Item> itemsPaged = Page.empty();
        if (count != 0) {
            //System.out.println(query.getParameters());
            query.setFirstResult(page * size);
            query.setMaxResults(size);
            //List<Item> items = itemRepository.itemsMoneySearch(searchRequest.getMinM(), searchRequest.getMaxM());
            //for (Item item : items) {
            //    System.out.println(item);
            //}
            itemsPaged = new PageImpl<>(query.getResultList(), PageRequest.of(page,size), query.getResultList().size());
        } else {
            Query queryAll = entityManager.createQuery("select i from Item i");
            queryAll.setFirstResult(page * size);
            queryAll.setMaxResults(size);
            itemsPaged = new PageImpl<>(queryAll.getResultList(), PageRequest.of(page,size), queryAll.getResultList().size());
        }
        return createPagedResponse(itemsPaged);
    }

    // Has bug in querying category
    @Transactional(readOnly = true)
    public PagedResponse<SearchResponse> searchByMultiFields2(Long categoryId, SearchRequest searchRequest,
                                                             int page, int size) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Item> cq = cb.createQuery(Item.class);
        Root<Item> iRoot = cq.from(Item.class);
        List<Predicate> predicates = new ArrayList<>();
        System.out.println("Execute for : " + searchRequest);
        if (categoryId != null) {
            //Category lastCategory = categoryRepository.findById(categoryId)
            //        .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
            //predicates.add(cb.equal(iRoot.get(Item_.category), lastCategory));
        }

        if (searchRequest.getName() != null) {
            predicates.add(cb.like(cb.lower(iRoot.get(Item_.name)),
                    "%" + searchRequest.getName().toLowerCase() + "%"));
        }

        if (searchRequest.getMinM() != null) {
            predicates.add(cb.greaterThanOrEqualTo(iRoot.get(Item_.buyPrice), searchRequest.getMinM()));
        }

        if (searchRequest.getMaxM() != null) {
            predicates.add(cb.lessThanOrEqualTo(iRoot.get(Item_.buyPrice), searchRequest.getMaxM()));
        }

        if (searchRequest.getCnt() != null && !searchRequest.getCnt().isEmpty()) {
            predicates.add(cb.equal(iRoot.get(Item_.country), searchRequest.getCnt()));
        }

        if (searchRequest.getLoc() != null && !searchRequest.getLoc().isEmpty()) {
            predicates.add(cb.equal(iRoot.get(Item_.location), searchRequest.getLoc()));
        }

        if (searchRequest.getDescr() != null && !searchRequest.getDescr().isEmpty()) {
            predicates.add(cb.like(cb.lower(iRoot.get(Item_.description)),
                    "%" + searchRequest.getDescr().toLowerCase() + "%"));
        }

        //cq.select(iRoot).where(cb.and(predicates.toArray(new Predicate[]{})));
        cq.select(iRoot).where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
        //cq.select(iRoot).where(predicates.toArray(new Predicate[]{}));
        //cq.orderBy(cb.desc(iRoot.get("id")));

        final TypedQuery<Item> query = entityManager.createQuery(cq);
        query.getParameters();
        query.setFirstResult(page * size);
        query.setMaxResults(size);
        int totalRows = query.getResultList().size();
        /*
        if (totalRows == 0) System.out.println("NO RES");
        for (Item item : query.getResultList()) {
            System.out.println(item.getName());
        }
        */
        Page<Item> itemsPaged = new PageImpl<>(query.getResultList(), PageRequest.of(page,size), totalRows);
        return createPagedResponse(itemsPaged);

    }

    public SearchItemResponse getSearchItem(Long itemId) {
        Item item =  itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item", "id", itemId));
        List<Category> categories = categoryService.getCategoriesReversed(item);
        User bestBidder = item.getBestBid() != null ? item.getBestBid().getUser() : null;
        SearchItemResponse searchItemResponse = new SearchItemResponse(item, item.getUser(), bestBidder);
        searchItemResponse.setCategories(categories);
        return searchItemResponse;
    }
}
