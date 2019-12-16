package com.nbu.jobseeker.dto;

import java.io.Serializable;

public class ApplicationSearchDTO implements Serializable {

    public ApplicationSearchDTO(Long personId, Long noticeId) {
        this.personId = personId;
        this.noticeId = noticeId;
        this.companyId = companyId;
    }

    private Long personId;
    private Long noticeId;
    private Long companyId;

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

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
