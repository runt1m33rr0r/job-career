package com.nbu.jobseeker.dto;

import com.nbu.jobseeker.model.JobNotice;

import java.util.Collection;

public class NoticeDTO extends ResponseDTO {

    private Collection<JobNotice> notices;

    public NoticeDTO(boolean success, String message, Collection<JobNotice> notices) {
        super(success, message);
        this.notices = notices;
    }

    public Collection<JobNotice> getNotices() {
        return notices;
    }

    public void setNotices(Collection<JobNotice> notices) {
        this.notices = notices;
    }
}
