package com.nbu.jobseeker.controllers;

import com.nbu.jobseeker.model.JobCategory;
import com.nbu.jobseeker.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> createCategory(@RequestBody JobCategory category){
        categoryService.saveCategory(category);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @PatchMapping(path = "/categories/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable Long id, String name) {
        if(categoryService.updateCategory(id, name)) {
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }
        return new ResponseEntity<>("Failed", HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping(path = "/categories/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        if(categoryService.deleteCategory(id)) {
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }
        return new ResponseEntity<>("Failed", HttpStatus.NOT_MODIFIED);
    }
}
