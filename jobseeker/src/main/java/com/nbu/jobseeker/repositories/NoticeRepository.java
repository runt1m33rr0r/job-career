package com.nbu.jobseeker.repositories;

import com.nbu.jobseeker.model.JobCategory;
import com.nbu.jobseeker.model.JobNotice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("noticeRepository")
public interface NoticeRepository extends JpaRepository<JobNotice, Long> {

    List<JobNotice> findByTitleContaining(String title);

    List<JobNotice> findByCategory(JobCategory category);
}
