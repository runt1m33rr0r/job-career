package com.nbu.jobseeker.repositories;

import com.nbu.jobseeker.model.JobCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("categoryRepository")
public interface CategoryRepository extends JpaRepository<JobCategory, Long> {
}
