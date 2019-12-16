package com.nbu.jobseeker.controllers;

import com.nbu.jobseeker.dto.*;
import com.nbu.jobseeker.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @DeleteMapping(path = "/applications/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> deleteApplication(@PathVariable Long id) {
        if(applicationService.deleteJobApplication(id)) {
            return new ResponseEntity<>(new ResponseDTO(true,"Application deleted successfully"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDTO(false,"Application does not exist"), HttpStatus.NOT_FOUND);
    }

    @PostMapping(path = "/applications/search", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ApplicationDTO> applicationsForPerson(@RequestBody ApplicationSearchDTO applicationSearchDTO) {
        return new ResponseEntity<>(new ApplicationDTO(true, "Applications acquired successfully", applicationService.getApplications(applicationSearchDTO)),HttpStatus.OK);
    }

    @PatchMapping(path = "/applications/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> updateApplication(@PathVariable Long id, ApplicationUpdateDTO applicationUpdateDTO) {
        if(applicationService.updateApplication(id,applicationUpdateDTO)) {
            return new ResponseEntity<>(new ResponseDTO(true,"Application modified successfully"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDTO(false,"Application does not exist"), HttpStatus.NOT_FOUND);
    }

    @PostMapping(path = "/applications", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> createApplication(@RequestBody ApplicationCreateDTO applicationCreateDTO) {
        if(applicationService.createApplication(applicationCreateDTO)) {
            return new ResponseEntity<>(new ResponseDTO(true,"Application created successfully"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDTO(false,"Application not created"), HttpStatus.NOT_ACCEPTABLE);
    }

}
