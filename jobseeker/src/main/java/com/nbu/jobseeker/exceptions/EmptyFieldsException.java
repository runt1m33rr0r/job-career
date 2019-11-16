package com.nbu.jobseeker.exceptions;

public class EmptyFieldsException extends RuntimeException {

    public EmptyFieldsException() {
        super("Some required fields are empty");
    }
}
