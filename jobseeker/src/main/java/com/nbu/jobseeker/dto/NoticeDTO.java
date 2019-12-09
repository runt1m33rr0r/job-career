package com.nbu.jobseeker.dto;

import com.nbu.jobseeker.model.JobNotice;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

public class NoticeDTO extends ResponseDTO implements Serializable {

    private List<JobNotice> notices;

    public NoticeDTO(boolean success, String message, List<JobNotice> notices) {
        super(success, message);
        this.notices = notices;
    }

    public Collection<JobNotice> getNotices() {
        return notices;
    }

    public void setNotices(List<JobNotice> notices) {
        this.notices = notices;
    }
}
