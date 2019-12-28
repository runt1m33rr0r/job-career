package com.nbu.jobseeker.controllers;

import com.nbu.jobseeker.dto.LoginDTO;
import com.nbu.jobseeker.dto.ResponseDTO;
import com.nbu.jobseeker.dto.UserDTO;
import com.nbu.jobseeker.dto.UserUpdateDTO;
import com.nbu.jobseeker.model.User;
import com.nbu.jobseeker.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "/users/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        if(loginDTO.getEmail() != null && loginDTO.getPassword() != null) {
            User user = userService.findUserByEmail(loginDTO.getEmail());
            if(user != null) {
                if (userService.validateUser(loginDTO.getPassword(), user.getPassword())) {
                    return new ResponseEntity<>(new UserDTO(true,"Login successful", userService.generateLoginToken(user)), HttpStatus.OK);
                }
                return new ResponseEntity<>(new ResponseDTO(false,"Wrong password for email: " + loginDTO.getEmail()), HttpStatus.NOT_ACCEPTABLE);
            }
            return new ResponseEntity<>(new ResponseDTO(false,"Failed to find users for: " + loginDTO.getEmail()), HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(new ResponseDTO(false,"Email or password is null"), HttpStatus.NOT_ACCEPTABLE);
    }

    @PostMapping(path = "/users/logout", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> logout(@RequestBody String email) {
        userService.logoutUser(email);
        return new ResponseEntity<>(new ResponseDTO(true,"Logout successful"), HttpStatus.OK);
    }

    @PostMapping(path = "/users/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> registerUser(@RequestBody UserUpdateDTO userUpdateDTO) {
        if(userService.createUser(userUpdateDTO)) {
            return new ResponseEntity<>(new ResponseDTO(true, "Registration successful"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDTO(false, "Registration unsuccessful"), HttpStatus.NOT_ACCEPTABLE);
    }

    @PostMapping(path ="/users/reset-password", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> resetPassword(@RequestBody String email) {
        userService.resetPassword(email);
        return new ResponseEntity<>(new ResponseDTO(true,"An email will be sent if we hold an account associated with this email"), HttpStatus.OK);
    }

    @PatchMapping(path = "/users/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> updateUser(@PathVariable Long id, @RequestBody UserUpdateDTO userUpdateDTO) {
        if(userService.updateUser(id, userUpdateDTO)) {
            return new ResponseEntity<>(new ResponseDTO(true,"User update successful"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDTO(true,"Invalid User"), HttpStatus.NOT_FOUND);
    }

}
