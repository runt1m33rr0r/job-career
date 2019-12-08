package com.nbu.jobseeker.services;

import com.nbu.jobseeker.dto.NoticeSearchDTO;
import com.nbu.jobseeker.dto.NoticeUpdateDTO;
import com.nbu.jobseeker.model.Company;
import com.nbu.jobseeker.model.JobCategory;
import com.nbu.jobseeker.model.JobNotice;
import com.nbu.jobseeker.model.JobNoticeStatus;
import com.nbu.jobseeker.repositories.CompanyRepository;
import com.nbu.jobseeker.repositories.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service("noticeService")
public class NoticeService {

    private NoticeRepository noticeRepository;
    private CompanyRepository companyRepository;
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private NoticeService(@Qualifier("noticeRepository")NoticeRepository noticeRepository,
                          @Qualifier("companyRepository")CompanyRepository companyRepository) {
        this.noticeRepository = noticeRepository;
        this.companyRepository = companyRepository;
    }

    public List<JobNotice> retrieveNotices(JobNoticeStatus status, NoticeSearchDTO parameters) {
        HashSet<JobNotice> notices = new HashSet<>();
        if(parameters == null || ((parameters.getKeywords() == null || parameters.getKeywords().isEmpty()) && (parameters.getCategory() == null || "".equals(parameters.getCategory())))){
            return noticeRepository.findAll();
        }
        if(parameters.getCategory() == null || "".equals(parameters.getCategory())){
            for(String keyword : parameters.getKeywords()) {
                notices.addAll(noticeRepository.findByTitleContains(keyword));
            }
            return new ArrayList<>(notices);
        }
        JobCategory categoryNew = categoryService.getByName(parameters.getCategory());
        if(parameters.getKeywords() == null || parameters.getKeywords().isEmpty()){
            notices.addAll(noticeRepository.findByCategory(categoryNew));
            return new ArrayList<>(notices);
        }
        for(String keyword : parameters.getKeywords()) {
            notices.addAll(noticeRepository.findByTitleContainsAndCategory(keyword, categoryNew));
        }

        return new ArrayList<>(notices);
    }

    public boolean updateNotice(Long id, NoticeUpdateDTO noticeUpdateDTO) {
        JobNotice notice = noticeRepository.findById(id).get();
        if (noticeUpdateDTO.getCategory() != null) {
            JobCategory existingCategory = categoryService.getByName(noticeUpdateDTO.getCategory());
            if(existingCategory == null) {
                return false;
            }
            notice.setCategory(existingCategory);
        }
        if(noticeUpdateDTO.getCompanyName() != null){
            Company existingCompany = companyRepository.findByName(noticeUpdateDTO.getCompanyName());
            if(existingCompany == null) {
                return false;
            }
        }
        if(noticeUpdateDTO.getStatus() != null && "closed".equals(noticeUpdateDTO.getStatus().toLowerCase())){
            notice.setStatus(JobNoticeStatus.CLOSED);
        }
        else{
            notice.setStatus(JobNoticeStatus.PENDING);
        }
        if(noticeUpdateDTO.getTitle() != null){
            notice.setTitle(noticeUpdateDTO.getTitle());
        }
        if(noticeUpdateDTO.getDescription() != null){
            notice.setDescription(noticeUpdateDTO.getDescription());
        }
        noticeRepository.save(notice);
        return true;
    }

    public boolean createNotice(NoticeUpdateDTO noticeUpdateDTO) {
       if(noticeUpdateDTO.getTitle() == null ||
               noticeUpdateDTO.getCategory() == null ||
               noticeUpdateDTO.getCompanyName() == null ||
               noticeUpdateDTO.getDescription() == null){
            return false;
       }
       JobNotice notice = new JobNotice();
       JobCategory existingCategory = categoryService.getByName(noticeUpdateDTO.getCategory());
       if(existingCategory == null){
           return false;
       }
       notice.setCategory(existingCategory);
       Company existingCompany = companyRepository.findByName(noticeUpdateDTO.getCompanyName());
       if(existingCompany == null){
           return false;
       }
       notice.setCompany(existingCompany);
       notice.setTitle(noticeUpdateDTO.getTitle());
       notice.setDescription(noticeUpdateDTO.getDescription());
       notice.setStatus(JobNoticeStatus.PENDING);
       noticeRepository.save(notice);
       return true;
    }

    //Search by category
    public List<JobNotice> findByCategory(String name) {
        JobCategory category = categoryService.getByName(name);
        if(category != null) {
            return noticeRepository.findByCategory(category);
        }
        return null;
    }


    public boolean deleteJobNotice(Long id) {
        JobNotice toDelete = noticeRepository.getOne(id);
        if(toDelete != null) {
            noticeRepository.delete(toDelete);
            return true;
        }
        return false;
    }
}
