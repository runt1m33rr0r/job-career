package com.nbu.jobseeker.dto;

import com.nbu.jobseeker.model.JobCategory;

import java.io.Serializable;
import java.util.List;

public class CategoryDTO extends ResponseDTO implements Serializable {

    private List<JobCategory> categories;

    public CategoryDTO(boolean success, String message, List<JobCategory> categories) {
        super(success, message);
        this.categories = categories;
    }

    public List<JobCategory> getCategories() {
        return categories;
    }

    public void setCategories(List<JobCategory> categories) {
        this.categories = categories;
    }
}
