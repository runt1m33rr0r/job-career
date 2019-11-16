package com.nbu.jobseeker.services;

import com.nbu.jobseeker.model.Person;
import com.nbu.jobseeker.model.User;
import com.nbu.jobseeker.repositories.PersonRepository;
import com.nbu.jobseeker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service("userService")
public class UserService {

    private PersonRepository personRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserRepository userRepository;

    @Autowired
    public UserService(@Qualifier("personRepository") PersonRepository personRepository,
                       @Qualifier("userRepository") UserRepository userRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.personRepository = personRepository;
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public Person findUserByEmail(String email) {
        return personRepository.findByEmail(email);
    }

    public void saveUser(Person user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        personRepository.save(user);
    }

    public boolean validateUser(String inputPassword, String passwordOnFile) {
        return bCryptPasswordEncoder.matches(inputPassword, passwordOnFile);
    }

    public UUID generateLoginToken(User user) {
        UUID token = UUID.randomUUID();
        user.setLoginTime(new Date());
        user.setToken(token);
        userRepository.save(user);
        return token;
    }

    public boolean logoutUser(String email) {
        User user = userRepository.findByEmail(email);
        if(user != null) {
            user.setToken(null);
            user.setLoginTime(null);
            return true;
        }
        return false;
    }
}
