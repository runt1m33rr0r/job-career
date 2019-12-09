package com.nbu.jobseeker.repositories;

import com.nbu.jobseeker.model.JobCategory;
import com.nbu.jobseeker.model.JobNotice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("noticeRepository")
public interface NoticeRepository extends JpaRepository<JobNotice, Long> {
    @Query(value = "SELECT n FROM JobNotice n WHERE n.title LIKE %:title%")
    List<JobNotice> findByTitleContains(String title);

    List<JobNotice> findByCategory(JobCategory category);

    @Query(value = "SELECT n FROM JobNotice n WHERE n.title LIKE %:title% AND n.category = :category")
    List<JobNotice> findByTitleContainsAndCategory(String title, JobCategory category);
}
