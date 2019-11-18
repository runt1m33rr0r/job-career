package com.nbu.jobseeker.controllers;

import com.nbu.jobseeker.exceptions.EmptyFieldsException;
import com.nbu.jobseeker.exceptions.NoUserExistsException;
import com.nbu.jobseeker.exceptions.WrongPasswordException;
import com.nbu.jobseeker.model.Company;
import com.nbu.jobseeker.model.Person;
import com.nbu.jobseeker.model.User;
import com.nbu.jobseeker.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/users/login")
    public ResponseEntity<UUID> login(String email, String password) {
        if(email != null && password != null) {
            User user = userService.findUserByEmail(email);
            if(user != null) {
                if (userService.validateUser(password, user.getPassword())) {
                    return new ResponseEntity<>(userService.generateLoginToken(user), HttpStatus.OK);
                }
                throw new WrongPasswordException(email);
            }
            throw new NoUserExistsException(email);
        }
        throw new EmptyFieldsException();
    }

    @PostMapping("/users/logout")
    public ResponseEntity<String> logout(String email) {
        userService.logoutUser(email);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @PostMapping(path = "/users/register-person", consumes = "application/json")
    public ResponseEntity<String> registerPerson(@RequestBody Person person) {
        userService.savePerson(person);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @PostMapping(path = "/users/register-company", consumes = "application/json")
    public ResponseEntity<String> registerCompany(@RequestBody Company company) {
        userService.saveCompany(company);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }

    @PostMapping("/users/reset-password")
    public ResponseEntity<String> resetPassword(String email) {
        userService.resetPassword(email);
        return new ResponseEntity<>("An email will be sent if we hold an account associated with this email", HttpStatus.OK);
    }

}
