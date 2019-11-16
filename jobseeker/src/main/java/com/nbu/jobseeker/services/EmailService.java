package com.nbu.jobseeker.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service("emailService")
public class EmailService  {

    @Autowired
    private JavaMailSender javaMailSender;

    void sendPassword(String email, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("JobSeeker Password Reset");
        message.setTo(email);
        message.setText("Hello, \nYour password is: " + password + "\nHave a nice day!\n");
        javaMailSender.send(message);
    }

}
