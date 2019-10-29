package com.nbu.jobseeker.model;

import javax.persistence.*;

@Entity
@Table(name = "JOB_CATEGORIES")
public class JobCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private long id;

    @Column(name = "CATEGORY_NAME")
    private String name;
}
