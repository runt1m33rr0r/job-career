package com.nbu.jobseeker.services;

import com.nbu.jobseeker.repositories.ApplicationRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("applicationService")
public class ApplicationService {

    private ApplicationRepository applicationRepository;

    public ApplicationService(@Qualifier("applicationRepository") ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    //TODO delete application

    //TODO update application

    //TODO create application
}
