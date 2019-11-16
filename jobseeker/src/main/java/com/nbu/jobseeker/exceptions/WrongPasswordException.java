package com.nbu.jobseeker.exceptions;

public class WrongPasswordException extends RuntimeException {

    public WrongPasswordException(String email) {
        super("Wrong Password for login:"  + email);
    }
}
