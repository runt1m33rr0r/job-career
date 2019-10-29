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

    @Column(name = "DELETED")
    private boolean isDeleted = false;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public JobNotice getJobNotice() {
        return jobNotice;
    }

    public void setJobNotice(JobNotice jobNotice) {
        this.jobNotice = jobNotice;
    }

    public String getMotivationalLetter() {
        return motivationalLetter;
    }

    public void setMotivationalLetter(String motivationalLetter) {
        this.motivationalLetter = motivationalLetter;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
