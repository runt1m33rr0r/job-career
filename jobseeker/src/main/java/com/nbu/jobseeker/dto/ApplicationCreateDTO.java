package com.nbu.jobseeker.dto;

import java.io.Serializable;

public class ApplicationCreateDTO implements Serializable {

    public ApplicationCreateDTO(Long personId, Long noticeId, String number, String email, String letter) {
        this.personId = personId;
        this.noticeId = noticeId;
        this.number = number;
        this.email = email;
        this.letter = letter;
    }

    private Long personId;
    private Long noticeId;
    private String number;
    private String email;
    private String letter;

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public Long getNoticeId() {
        return noticeId;
    }

    public void setNoticeId(Long noticeId) {
        this.noticeId = noticeId;
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

    public String getLetter() {
        return letter;
    }

    public void setLetter(String letter) {
        this.letter = letter;
    }
}
