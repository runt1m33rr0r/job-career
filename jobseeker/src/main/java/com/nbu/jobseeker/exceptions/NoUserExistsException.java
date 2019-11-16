package com.nbu.jobseeker.exceptions;

public class NoUserExistsException extends RuntimeException {

    public NoUserExistsException(String email) {
        super("No user found for login: "  + email);
    }
}
