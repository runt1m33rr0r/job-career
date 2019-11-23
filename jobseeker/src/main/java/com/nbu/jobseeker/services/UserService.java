package com.nbu.jobseeker.services;

import com.nbu.jobseeker.dto.UserUpdateDTO;
import com.nbu.jobseeker.model.Administrator;
import com.nbu.jobseeker.model.Company;
import com.nbu.jobseeker.model.Person;
import com.nbu.jobseeker.model.User;
import com.nbu.jobseeker.repositories.AdministratorRepository;
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
    private AdministratorRepository administratorRepository;
    @Autowired
    private EmailService emailService;

    @Autowired
    public UserService(@Qualifier("personRepository") PersonRepository personRepository,
                       @Qualifier("userRepository") UserRepository userRepository,
                       @Qualifier("companyRepository") CompanyRepository companyRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder,
                       @Qualifier("administratorRepository") AdministratorRepository administratorRepository) {
        this.personRepository = personRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.administratorRepository = administratorRepository;
    }

    public User findUserByEmail(String email) {
        Person person = personRepository.findByEmail(email);
        if( person != null) {
            return person;
        }
        Company company = companyRepository.findByEmail(email);
        if(company != null) {
            return company;
        }
        Administrator administrator =administratorRepository.findByEmail(email);
        if(administrator != null) {
            return administrator;
        }
        return null;
    }

    public boolean createUser(UserUpdateDTO userUpdateDTO) {
        if(userUpdateDTO.getFirstName() != null && userUpdateDTO.getLastName() != null) {
            savePerson(userUpdateDTO);
            return true;
        } else if(userUpdateDTO.getCompanyName() != null) {
            saveCompany(userUpdateDTO);
            return true;
        }
        return false;
    }

    private void savePerson(UserUpdateDTO userUpdateDTO) {
        Person person = new Person();
        person.setFirstName(userUpdateDTO.getFirstName());
        person.setLastName(userUpdateDTO.getLastName());
        person.setNumber(userUpdateDTO.getNumber());
        person.setEmail(userUpdateDTO.getEmail());
        encryptPassword(person, userUpdateDTO.getPassword());
        personRepository.save(person);
    }

    private void saveCompany(UserUpdateDTO userUpdateDTO) {
        Company company = new Company();
        company.setName(userUpdateDTO.getCompanyName());
        company.setNumber(userUpdateDTO.getNumber());
        company.setEmail(userUpdateDTO.getEmail());
        encryptPassword(company, userUpdateDTO.getPassword());
        companyRepository.save(company);
    }

    public boolean validateUser(String inputPassword, String passwordOnFile) {
        return bCryptPasswordEncoder.matches(inputPassword, passwordOnFile);
    }

    public User generateLoginToken(User user) {
        UUID token = UUID.randomUUID();
        user.setLoginTime(new Date());
        user.setToken(token);
        userRepository.save(user);
        return user;
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

    public boolean updateUser(Long id, UserUpdateDTO userUpdateDTO) {
        User user = userRepository.getOne(id);
        if(user != null) {
            if(user instanceof Company) {
                updateCompany(userUpdateDTO, user);
            } else if (user instanceof Person) {
                updatePerson(userUpdateDTO, user);
            }
            userRepository.save(user);
            return true;
        }
        return false;
    }

    private void updateCompany(UserUpdateDTO userUpdateDTO, User user) {
        if(userUpdateDTO.getCompanyName() != null) {
            ((Company) user).setName(userUpdateDTO.getCompanyName());
        }
        if(userUpdateDTO.getPassword() != null) {
            encryptPassword(user, userUpdateDTO.getPassword());
        }
        if(userUpdateDTO.getNumber() != null) {
            ((Company) user).setNumber(userUpdateDTO.getNumber());
        }
        if(userUpdateDTO.getEmail() != null) {
            user.setEmail(userUpdateDTO.getEmail());
        }
    }

    private void updatePerson(UserUpdateDTO userUpdateDTO, User user) {
        if(userUpdateDTO.getEmail() != null) {
            user.setEmail(userUpdateDTO.getEmail());
        }
        if(userUpdateDTO.getNumber() != null) {
            ((Person) user).setNumber(userUpdateDTO.getNumber());
        }
        if(userUpdateDTO.getFirstName() != null) {
            ((Person) user).setFirstName(userUpdateDTO.getFirstName());
        }
        if(userUpdateDTO.getLastName() != null) {
            ((Person) user).setLastName(userUpdateDTO.getLastName());
        }
        if(userUpdateDTO.getPassword() != null) {
            encryptPassword(user, userUpdateDTO.getPassword());
        }
    }
}
