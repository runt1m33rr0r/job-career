package com.nbu.jobseeker.dto;

import java.io.Serializable;

public class CategoryUpdateDTO implements Serializable {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
