package com.dit.ebay.service;

import com.dit.ebay.model.Item;
import com.dit.ebay.model.SellerRating;
import com.dit.ebay.repository.CategoryRepository;
import com.dit.ebay.repository.ItemRepository;
import com.dit.ebay.repository.SellerRatingRepository;
import com.dit.ebay.request.SearchNameRequest;
import com.dit.ebay.request.SearchRequest;
import com.dit.ebay.response.ItemResponse;
import com.dit.ebay.response.PagedResponse;
import com.dit.ebay.response.SearchResponse;
import net.bytebuddy.asm.Advice;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.provider.HibernateUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;
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
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Item> cq = cb.createQuery(Item.class);
        Root<Item> iRoot = cq.from(Item.class);
        List<Predicate> predicates = new ArrayList<>();
        System.out.println("Execute for : " + searchRequest);
        if (categoryId != null) {
            predicates.add(cb.equal(iRoot.<Long>get("id"), categoryId));
        }

        if (searchRequest.getName() != null) {
            predicates.add(cb.like(cb.lower(iRoot.<String>get("name")),
                    "%" + searchRequest.getName().toLowerCase() + "%"));
        }

        if (searchRequest.getMinM() != null) {
            predicates.add(cb.greaterThanOrEqualTo(iRoot.<BigDecimal>get("buyPrice"), searchRequest.getMinM()));
        }

        if (searchRequest.getMaxM() != null) {
            predicates.add(cb.lessThanOrEqualTo(iRoot.<BigDecimal>get("buyPrice"), searchRequest.getMaxM()));
        }

        if (searchRequest.getCnt() != null && !searchRequest.getCnt().isEmpty()) {
            predicates.add(cb.equal(iRoot.<String>get("country"), searchRequest.getCnt()));
        }

        if (searchRequest.getLoc() != null && !searchRequest.getLoc().isEmpty()) {
            predicates.add(cb.equal(iRoot.<String>get("location"), searchRequest.getLoc()));
        }

        if (searchRequest.getDescr() != null && !searchRequest.getDescr().isEmpty()) {
            predicates.add(cb.like(cb.lower(iRoot.<String>get("description")),
                    "%" + searchRequest.getDescr().toLowerCase() + "%"));
        }

        //cq.select(iRoot).where(cb.and(predicates.toArray(new Predicate[]{})));
        cq.select(iRoot).where(predicates.toArray(new Predicate[]{}));
        //cq.orderBy(cb.desc(iRoot.get("id")));

        final TypedQuery<Item> query = entityManager.createQuery(cq);
        query.setFirstResult(page * size);
        query.setMaxResults(size);
        int totalRows = query.getResultList().size();
        if (totalRows == 0) System.out.println("NOT FOUNDDDDDDDDDDDD");
        for (Item item : query.getResultList()) {
            System.out.println(item.getName());
        }
        Page<Item> itemsPaged = new PageImpl<>(query.getResultList(), PageRequest.of(page,size), totalRows);
        return createPagedResponse(itemsPaged);
    }
}
