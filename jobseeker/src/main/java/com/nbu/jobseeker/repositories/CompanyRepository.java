package com.nbu.jobseeker.repositories;

import com.nbu.jobseeker.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("companyRepository")
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findByEmail(String email);
    Company findByName(String name);
}
