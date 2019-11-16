package com.nbu.jobseeker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@SpringBootApplication
public class JobseekerApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobseekerApplication.class, args);
	}

	@Configuration
	static class ApplicationSecurity extends WebSecurityConfigurerAdapter {

		@Override
		public void configure(WebSecurity web) {
			web
					.ignoring()
					.antMatchers("/**");
		}
	}


}
