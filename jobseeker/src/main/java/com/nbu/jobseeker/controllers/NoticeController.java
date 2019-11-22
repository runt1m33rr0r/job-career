package com.nbu.jobseeker.controllers;

import com.nbu.jobseeker.dto.NoticeDTO;
import com.nbu.jobseeker.dto.NoticeUpdateDTO;
import com.nbu.jobseeker.dto.ResponseDTO;
import com.nbu.jobseeker.services.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping(path = "/notices", consumes = "application/json", produces = "application/json")
    public ResponseEntity<NoticeDTO> noticesByKeyword(@RequestBody List<String> keywords) {
        if(keywords.isEmpty()) {
            return new ResponseEntity<>(new NoticeDTO(true, "Success", noticeService.retrieveAllNotices(null)), HttpStatus.OK);
        }
        return new ResponseEntity<>(new NoticeDTO(true, "Success", noticeService.retrieveByKeywords(null, keywords)), HttpStatus.OK);
    }

    //TODO POST create notice


    @PatchMapping(path = "/notices/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> createNotice(@PathVariable Long id, @RequestBody NoticeUpdateDTO noticeUpdateDTO){
        if(noticeService.updateNotice(id, noticeUpdateDTO)) {
            return new ResponseEntity<>(new ResponseDTO(true,"Notice updated successfully"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDTO(false,"Notice does not exist"), HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping(path = "/notices/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseDTO> deleteNotice(@PathVariable Long id) {
        if(noticeService.deleteJobNotice(id)) {
            return new ResponseEntity<>(new ResponseDTO(true,"Notice deleted successfully"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDTO(false,"Notice does not exist"),HttpStatus.NOT_FOUND);
    }
}
