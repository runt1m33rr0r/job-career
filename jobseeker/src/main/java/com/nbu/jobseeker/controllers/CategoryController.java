package com.nbu.jobseeker.controllers;

import com.nbu.jobseeker.model.JobCategory;
import com.nbu.jobseeker.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<JobCategory> getAll() {
        return categoryService.getAll();
    }

    @PostMapping(path = "/categories")
    public String createCategory(@RequestBody JobCategory category){
        categoryService.saveCategory(category);
        return "Success";
    }

    @PatchMapping(path = "/categories/{id}")
    public String updateCategory(@PathVariable Long id, String name) {
        if(categoryService.updateCategory(id, name)) {
            return "Success";
        }
        return "Failed to update";
    }

    @DeleteMapping(path = "/categories/{id}")
    public String deleteCategory(@PathVariable Long id) {
        if(categoryService.deleteCategory(id)) {
            return "Success";
        }
        return "Failed to delete";
    }
}
