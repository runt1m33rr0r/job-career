package com.nbu.jobseeker.exceptionhandlers;

import com.nbu.jobseeker.exceptions.EmptyFieldsException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class EmptyFieldsExceptionHandler {

    @ResponseBody
    @ExceptionHandler(EmptyFieldsException.class)
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    String emptyFieldsHandler(EmptyFieldsException ex) {
        return ex.getMessage();
    }
}
