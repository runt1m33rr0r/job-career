package com.nbu.jobseeker.services;

import com.nbu.jobseeker.model.Company;
import com.nbu.jobseeker.model.Person;
import com.nbu.jobseeker.model.User;
import com.nbu.jobseeker.repositories.CompanyRepository;
import com.nbu.jobseeker.repositories.PersonRepository;
import com.nbu.jobseeker.repositories.UserRepository;
import net.bytebuddy.utility.RandomString;
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
    private CompanyRepository companyRepository;
    @Autowired
    private EmailService emailService;

    @Autowired
    public UserService(@Qualifier("personRepository") PersonRepository personRepository,
                       @Qualifier("userRepository") UserRepository userRepository,
                       @Qualifier("companyRepository") CompanyRepository companyRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.personRepository = personRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public Person findUserByEmail(String email) {
        return personRepository.findByEmail(email);
    }

    public void savePerson(Person person) {
        encryptPassword(person, person.getPassword());
        personRepository.save(person);
    }

    public void saveCompany(Company company) {
        encryptPassword(company, company.getPassword());
        companyRepository.save(company);
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
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public void resetPassword(String email) {
        User user = userRepository.findByEmail(email);
        if(user != null){
            String password = RandomString.make();
            emailService.sendPassword(email, password);
            user.setPassword(bCryptPasswordEncoder.encode(password));
            userRepository.save(user);
        }
    }

    private <T extends User> void encryptPassword(T user, String password) {
        user.setPassword(bCryptPasswordEncoder.encode(password));
    }
}
