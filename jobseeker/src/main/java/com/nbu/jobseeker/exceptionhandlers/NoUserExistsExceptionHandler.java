package com.nbu.jobseeker.exceptionhandlers;

import com.nbu.jobseeker.exceptions.EmptyFieldsException;
import com.nbu.jobseeker.exceptions.NoUserExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class NoUserExistsExceptionHandler {

    @ResponseBody
    @ExceptionHandler(EmptyFieldsException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String noUserHandler(NoUserExistsException ex) {
        return ex.getMessage();
    }
}
