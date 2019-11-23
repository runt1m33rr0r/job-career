package com.nbu.jobseeker.repositories;

import com.nbu.jobseeker.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("applicationRepository")
public interface ApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByPersonId(Long id);

    List<JobApplication> findByJobNoticeId(Long id);
}
