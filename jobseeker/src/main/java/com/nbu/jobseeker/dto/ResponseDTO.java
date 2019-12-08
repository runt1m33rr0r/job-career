package com.nbu.jobseeker.dto;

import java.io.Serializable;

public class ResponseDTO implements Serializable {

    public ResponseDTO(boolean success, String message) {
        this.message = message;
        this.success = success;
    }

    private boolean success;

    private String message;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
