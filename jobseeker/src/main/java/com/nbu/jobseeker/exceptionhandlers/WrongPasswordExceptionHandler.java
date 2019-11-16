package com.nbu.jobseeker.exceptionhandlers;

import com.nbu.jobseeker.exceptions.WrongPasswordException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class WrongPasswordExceptionHandler {

    @ResponseBody
    @ExceptionHandler(WrongPasswordException.class)
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    String wrongPasswordHandler(WrongPasswordException ex) {
        return ex.getMessage();
    }
}
