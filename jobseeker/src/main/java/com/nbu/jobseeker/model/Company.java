package com.nbu.jobseeker.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "COMPANIES")
public class Company extends User {

    @Column(name = "COMPANY_NAME")
    private String name;

    @Column(name = "CONTACT_NUMBER")
    private String number;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }
}
