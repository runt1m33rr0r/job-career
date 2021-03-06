package com.nbu.jobseeker.model;

public enum JobNoticeStatus {

    OPEN ("OPEN"),
    PENDING("PENDING"),
    DENIED("DENIED"),
    CLOSED("CLOSED");

    private final String status;

    JobNoticeStatus(String status) {
        this.status = status;
    }

    public boolean equals(String otherStatus) {
        // (otherName == null) check is not needed because name.equals(null) returns false
        return status.equals(otherStatus);
    }

    @Override
    public String toString() {
        return this.status;
    }
}
