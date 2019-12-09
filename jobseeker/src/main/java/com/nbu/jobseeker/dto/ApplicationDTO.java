package com.nbu.jobseeker.dto;

import com.nbu.jobseeker.model.JobApplication;

import java.io.Serializable;
import java.util.List;

public class ApplicationDTO extends ResponseDTO implements Serializable {
    private List<JobApplication> applications;

    public ApplicationDTO(boolean success, String message, List<JobApplication> applications) {
        super(success, message);
        this.applications = applications;
    }

    public List<JobApplication> getApplications() {
        return applications;
    }

    public void setApplications(List<JobApplication> applications) {
        this.applications = applications;
    }
}
