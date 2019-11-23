package com.nbu.jobseeker.dto;

public class ApplicationUpdateDTO {

    public ApplicationUpdateDTO(String number, String email, String letter) {
        this.number = number;
        this.email = email;
        this.letter = letter;
    }

    private String number;
    private String email;
    private String letter;

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLetter() {
        return letter;
    }

    public void setLetter(String letter) {
        this.letter = letter;
    }
}
