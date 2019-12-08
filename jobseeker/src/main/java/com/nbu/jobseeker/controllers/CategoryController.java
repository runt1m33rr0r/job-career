package com.nbu.jobseeker.controllers;

import com.nbu.jobseeker.dto.CategoryDTO;
import com.nbu.jobseeker.dto.CategoryUpdateDTO;
import com.nbu.jobseeker.dto.ResponseDTO;
import com.nbu.jobseeker.model.JobCategory;
import com.nbu.jobseeker.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    //retrieves all
    @GetMapping(path = "/categories", produces = "application/json")
    public ResponseEntity<CategoryDTO> getAll() {
        return new ResponseEntity<>(new CategoryDTO(true,"Categories successfully acquired", categoryService.getAll()), HttpStatus.OK);
    }

    //create category
    @PostMapping(path = "/categories", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> createCategory(@RequestBody JobCategory category){
        if(category.getName() != null) {
            if(!"".equals(category.getName().trim())) {
                categoryService.saveCategory(category);
                return new ResponseEntity<>(new ResponseDTO(true, "Category creation successfully"), HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(new ResponseDTO(false,"Failed to create category"), HttpStatus.NOT_ACCEPTABLE);
    }

    //update category
    @PatchMapping(path = "/categories/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> updateCategory(@PathVariable Long id, @RequestBody CategoryUpdateDTO categoryUpdateDTO) {
        if (categoryService.updateCategory(id, categoryUpdateDTO)) {
            return new ResponseEntity<>(new ResponseDTO(true, "Category update successful"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDTO(false,"Failed to update category"), HttpStatus.NOT_MODIFIED);
    }

    //delete category
    @DeleteMapping(path = "/categories/{id}", produces = "application/json")
    public ResponseEntity<ResponseDTO> deleteCategory(@PathVariable Long id) {
        if(categoryService.deleteCategory(id)) {
            return new ResponseEntity<>(new ResponseDTO(true,"Category deletion successful"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDTO(false,"Category does not exist"), HttpStatus.NOT_MODIFIED);
    }
}
