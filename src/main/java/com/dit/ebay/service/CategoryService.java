package com.dit.ebay.service;

import com.dit.ebay.exception.ResourceNotFoundException;
import com.dit.ebay.model.Category;
import com.dit.ebay.model.Item;
import com.dit.ebay.repository.CategoryRepository;
import com.dit.ebay.request.SubCategoryRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;


@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    private static final Logger logger = LoggerFactory.getLogger(CategoryService.class);

    public List<Category> getCategoriesReversed(Item item) {
        List<Category> categories = new ArrayList<>();
        Category category = item.getCategory();
        Category currentParent = null;
        if (category != null) {
            categories.add(category);
            currentParent = category.getParentCategory();
        }
        while (currentParent != null) {
            categories.add(currentParent);
            currentParent = categoryRepository.findById(currentParent.getId()).orElse(null);

        }
        if (!categories.isEmpty()) {
            Collections.reverse(categories);
        }
        return categories;
    }

    public List<String> getCategoriesReversedNames(Item item) {
        List<String> categories = new ArrayList<>();
        Category category = item.getCategory();
        Category currentParent = null;
        if (category != null) {
            categories.add(category.getName());
            currentParent = category.getParentCategory();
        }
        while (currentParent != null) {
            categories.add(currentParent.getName());
            currentParent = categoryRepository.findById(currentParent.getId()).orElse(null);

        }
        if (!categories.isEmpty()) {
            Collections.reverse(categories);
        }
        return categories;
    }


    public List<Category> getRootSubCategories() {
        return categoryRepository.findRootSubCategories();
    }

    public Set<Category> getSubCategories(Long categorytId) {
        Category parent = categoryRepository.findById(categorytId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categorytId));
        return parent.getChildCategories();
    }

}
