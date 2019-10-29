package com.nbu.jobseeker.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "JOB_APPLICATIONS")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private long id;

    @ManyToOne(targetEntity = Person.class)
    @JoinColumn(name = "PERSON_ID", nullable = false)
    private Person person;

    @ManyToOne(targetEntity = JobNotice.class)
    @JoinColumn(name = "NOTICE_ID", nullable = false)
    private JobNotice jobNotice;

    @Column(name = "MOTIVATIONAL_LETTER")
    private String motivationalLetter;

    @Column(name = "CONTACT_NUMBER")
    private String number;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "UPDATED_AT")
    private Date lastModified;
}
