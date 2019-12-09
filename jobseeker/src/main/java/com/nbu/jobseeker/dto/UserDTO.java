package com.nbu.jobseeker.dto;

import com.nbu.jobseeker.model.User;

import java.io.Serializable;

public class UserDTO extends ResponseDTO implements Serializable {
    private User user;

    public UserDTO(boolean success, String message, User user) {
        super(success, message);
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
