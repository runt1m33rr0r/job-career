package com.nbu.jobseeker.model;

import javax.persistence.*;

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
}
