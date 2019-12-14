package com.nbu.jobseeker.services;

import com.nbu.jobseeker.dto.ApplicationCreateDTO;
import com.nbu.jobseeker.dto.ApplicationSearchDTO;
import com.nbu.jobseeker.dto.ApplicationUpdateDTO;
import com.nbu.jobseeker.model.JobApplication;
import com.nbu.jobseeker.model.JobNotice;
import com.nbu.jobseeker.model.Person;
import com.nbu.jobseeker.repositories.ApplicationRepository;
import com.nbu.jobseeker.repositories.NoticeRepository;
import com.nbu.jobseeker.repositories.PersonRepository;
import com.nbu.jobseeker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service("applicationService")
public class ApplicationService {

    private ApplicationRepository applicationRepository;
    private PersonRepository personRepository;
    private NoticeRepository noticeRepository;
    @Autowired
    private EmailService emailService;

    public ApplicationService(@Qualifier("applicationRepository") ApplicationRepository applicationRepository,
                              @Qualifier("personRepository") PersonRepository personRepository,
                              @Qualifier("noticeRepository") NoticeRepository noticeRepository) {
        this.applicationRepository = applicationRepository;
        this.personRepository = personRepository;
        this.noticeRepository = noticeRepository;
    }

    public List<JobApplication> getApplications(ApplicationSearchDTO applicationSearchDTO) {
        if(applicationSearchDTO.getPersonId() != null) {
            return getByPersonId(applicationSearchDTO.getPersonId());
        } else if (applicationSearchDTO.getNoticeId() != null) {
            return getByNoticeId(applicationSearchDTO.getNoticeId());
        }
        return null;
    }

    private List<JobApplication> getByPersonId(Long personId) {
        return applicationRepository.findByPersonId(personId);
    }

    private List<JobApplication> getByNoticeId(Long noticeId) {
        return applicationRepository.findByJobNoticeId(noticeId);
    }

    public boolean updateApplication(Long id, ApplicationUpdateDTO applicationUpdateDTO) {
        JobApplication application = applicationRepository.getOne(id);
        if(application != null) {
            if(applicationUpdateDTO.getEmail() != null) {
                if(!"".equals(applicationUpdateDTO.getEmail().trim())) {
                    application.setEmail(applicationUpdateDTO.getEmail());
                }
            }
            if(applicationUpdateDTO.getLetter() != null) {
                if(!"".equals(applicationUpdateDTO.getLetter().trim())) {
                    application.setMotivationalLetter(applicationUpdateDTO.getLetter());
                }
            }
            if(applicationUpdateDTO.getNumber() != null) {
                if(!"".equals(applicationUpdateDTO.getNumber().trim())) {
                    application.setNumber(applicationUpdateDTO.getNumber());
                }
            }
            application.setLastModified(new Date());
            applicationRepository.save(application);
            return true;
        }
        return false;
    }

    public boolean deleteJobApplication(Long id) {
        JobApplication toDelete = applicationRepository.getOne(id);
        if(toDelete != null) {
            applicationRepository.delete(toDelete);
            return true;
        }
        return false;
    }

    public boolean createApplication(ApplicationCreateDTO applicationCreateDTO) {
        JobApplication application = new JobApplication();
        Person user = null;
        if(applicationCreateDTO.getNoticeId() != null) {
            user = personRepository.getOne(applicationCreateDTO.getPersonId());
        }
        JobNotice notice = null;
        if(applicationCreateDTO.getNoticeId() != null) {
            notice = noticeRepository.getOne(applicationCreateDTO.getNoticeId());
        }

        if(user != null && notice != null) {
            if(applicationCreateDTO.getEmail() != null) {
                if(!"".equals(applicationCreateDTO.getEmail().trim())) {
                    application.setEmail(applicationCreateDTO.getEmail());
                }
            }
            if(applicationCreateDTO.getLetter() != null) {
                if (!"".equals(applicationCreateDTO.getLetter().trim())) {
                    application.setMotivationalLetter(applicationCreateDTO.getLetter());
                }
            }
            if(applicationCreateDTO.getNumber() != null) {
                if(!"".equals(applicationCreateDTO.getNumber().trim())) {
                    application.setNumber(applicationCreateDTO.getNumber());
                }
            }
            application.setLastModified(new Date());
            application.setPerson(user);
            application.setJobNotice(notice);
            applicationRepository.save(application);
            //emailService.sendNewApplicationEmailForCompany(notice.getCompany().getName(), notice.getCompany().getEmail(), notice.getTitle());
            //emailService.sendNewApplicationEmailForPerson(user.getFirstName(),user.getEmail(),notice.getTitle());
            return true;
        }
        return false;
    }
}
