package com.nbu.jobseeker.dto;

public class ApplicationSearchDTO {

    public ApplicationSearchDTO(Long personId, Long noticeId) {
        this.personId = personId;
        this.noticeId = noticeId;
    }

    private Long personId;
    private Long noticeId;

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
}