package com.nbu.jobseeker.controllers;

import com.nbu.jobseeker.exceptions.EmptyFieldsException;
import com.nbu.jobseeker.exceptions.NoUserExistsException;
import com.nbu.jobseeker.exceptions.WrongPasswordException;
import com.nbu.jobseeker.model.Person;
import com.nbu.jobseeker.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login1")
    public UUID login(String email, String password) {
        if(email != null && password != null) {
            Person person = userService.findUserByEmail(email);
            if(person != null) {
                if (userService.validateUser(password, person.getPassword())) {
                    return userService.generateLoginToken(person);
                }
                throw new WrongPasswordException(email);
            }
            throw new NoUserExistsException(email);
        }
        throw new EmptyFieldsException();
    }

    @PostMapping("/logout")
    public String logout(String email) {
        userService.logoutUser(email);
        return "User Logged out";
    }

    @PostMapping(path = "/register", consumes = "application/json")
    public String registerPerson(Person person) {
        userService.saveUser(person);
        return "Success";
    }

}
