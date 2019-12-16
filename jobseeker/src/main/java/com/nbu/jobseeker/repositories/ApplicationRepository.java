package com.nbu.jobseeker.repositories;

import com.nbu.jobseeker.model.JobApplication;
import org.springframework.data.annotation.QueryAnnotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("applicationRepository")
public interface ApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByPersonId(Long id);

    List<JobApplication> findByJobNoticeId(Long id);

    @Query("SELECT a FROM JobApplication a WHERE a.jobNotice.company.id = :id")
    List<JobApplication> findByCompanyId(Long id);
}
