package com.nbu.jobseeker.repositories;

import com.nbu.jobseeker.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("applicationRepository")
public interface ApplicationRepository extends JpaRepository<JobApplication, Long> {
}
