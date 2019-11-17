package com.nbu.jobseeker.services;

import com.nbu.jobseeker.model.JobCategory;
import com.nbu.jobseeker.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("categoryService")
public class CategoryService {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(@Qualifier("categoryRepository") CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    private JobCategory getById(Long id) {
        return categoryRepository.findById(id).get();
    }

    public List<JobCategory> getAll() {
        return categoryRepository.findAll();
    }

    public void saveCategory(JobCategory category) {
        categoryRepository.save(category);
    }

    public boolean updateCategory(Long id, String name) {
        JobCategory category = categoryRepository.findById(id).get();
        if(category != null) {
            category.setName(name);
            saveCategory(category);
            return true;
        }
        return false;
    }

    public boolean deleteCategory(Long id) {
        JobCategory toDelete = getById(id);
        if(toDelete != null) {
            categoryRepository.delete(toDelete);
            return true;
        }
        return false;
    }
}
