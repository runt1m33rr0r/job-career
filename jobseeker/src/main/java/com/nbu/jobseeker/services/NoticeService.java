package com.nbu.jobseeker.services;

import com.nbu.jobseeker.dto.NoticeUpdateDTO;
import com.nbu.jobseeker.model.Company;
import com.nbu.jobseeker.model.JobCategory;
import com.nbu.jobseeker.model.JobNotice;
import com.nbu.jobseeker.model.JobNoticeStatus;
import com.nbu.jobseeker.repositories.CompanyRepository;
import com.nbu.jobseeker.repositories.NoticeRepository;
import com.nbu.jobseeker.repositories.UserRepository;
import jdk.net.SocketFlow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    public Set<JobNotice> retrieveByKeywords(JobNoticeStatus status, List<String> keywords) {
        HashSet<JobNotice> notices = new HashSet<>();
        for(String keyword : keywords) {
            notices.addAll(noticeRepository.findByTitleContaining("%" + keyword + "%"));
        }
        return notices;
    }

    public List<JobNotice> retrieveAllNotices(JobNoticeStatus status) {
        return noticeRepository.findAll();
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
