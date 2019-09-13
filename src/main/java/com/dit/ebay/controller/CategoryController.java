package com.dit.ebay.controller;

import com.dit.ebay.model.Category;
import com.dit.ebay.request.SubCategoryRequest;
import com.dit.ebay.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/app/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/rootSubs")
    public List<Category> getRootSubs() {
        return categoryService.getRootSubCategories();
    }

    // public for visitor
    @GetMapping("/{categoryId}/subs")
    public Set<Category> getSubCategories(@PathVariable(value = "categoryId") Long categoryId) {
        return categoryService.getSubCategories(categoryId);
    }
}
