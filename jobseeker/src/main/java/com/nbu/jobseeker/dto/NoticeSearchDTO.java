package com.nbu.jobseeker.dto;

import java.util.List;

public class NoticeSearchDTO {
    private List<String> keywords;
    private String category;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }
}
