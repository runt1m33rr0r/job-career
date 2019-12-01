package com.nbu.jobseeker.controllers;

import com.nbu.jobseeker.dto.NoticeDTO;
import com.nbu.jobseeker.dto.NoticeUpdateDTO;
import com.nbu.jobseeker.dto.ResponseDTO;
import com.nbu.jobseeker.model.JobNotice;
import com.nbu.jobseeker.services.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    //retrieve by keywords
    @GetMapping(path = "/notices", consumes = "application/json", produces = "application/json")
    public ResponseEntity<NoticeDTO> noticesByKeyword(@RequestBody List<String> keywords) {
        if(keywords.isEmpty()) {
            return new ResponseEntity<>(new NoticeDTO(true, "Success", noticeService.retrieveAllNotices(null)), HttpStatus.OK);
        }
        return new ResponseEntity<>(new NoticeDTO(true, "Success", noticeService.retrieveByKeywords(null, keywords)), HttpStatus.OK);
    }
    //TODO GET search by category ^ keywords is above

    //create notice
    @PostMapping(path = "/notices", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> createNotice(@RequestBody @NotNull NoticeUpdateDTO noticeUpdateDTO){
        if(noticeUpdateDTO != null) {
            if(noticeService.createNotice(noticeUpdateDTO)) {
                return new ResponseEntity<>(new ResponseDTO(true, "Notice created successfully"), HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(new ResponseDTO(false,"Failed to create notice"), HttpStatus.NOT_ACCEPTABLE);
    }

    //update notice
    @PatchMapping(path = "/notices/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> updateNotice(@PathVariable Long id, @RequestBody NoticeUpdateDTO noticeUpdateDTO){
        if(noticeService.updateNotice(id, noticeUpdateDTO)) {
            return new ResponseEntity<>(new ResponseDTO(true,"Notice updated successfully"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDTO(false,"Notice does not exist"), HttpStatus.NOT_MODIFIED);
    }

    //delete notice
    @DeleteMapping(path = "/notices/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> deleteNotice(@PathVariable Long id) {
        if(noticeService.deleteJobNotice(id)) {
            return new ResponseEntity<>(new ResponseDTO(true,"Notice deleted successfully"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDTO(false,"Notice does not exist"),HttpStatus.NOT_FOUND);
    }
}
