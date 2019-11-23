package com.nbu.jobseeker.repositories;

import com.nbu.jobseeker.model.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("administratorRepository")
public interface AdministratorRepository extends JpaRepository<Administrator, Long> {
    Administrator findByEmail(String email);
}
