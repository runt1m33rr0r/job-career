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

    void sendNewApplicationEmailForCompany(String companyName, String email, String title) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("You have new applications!");
        message.setTo(email);
        message.setText("Hello "  + companyName + ",\n You have recieved a new application for the following job:\n"
                + title + "\n Have a nice day!\n");
        javaMailSender.send(message);
    }

    void sendNewApplicationEmailForPerson(String personName, String email, String title) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("Successfully applied for job");
        message.setTo(email);
        message.setText("Hello "  + personName + ",\n You have successfully applied for the following job:\n"
                + title + "\n Have a nice day!\n");
        javaMailSender.send(message);
    }

}
