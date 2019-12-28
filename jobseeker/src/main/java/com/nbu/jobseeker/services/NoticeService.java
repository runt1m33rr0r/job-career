package com.nbu.jobseeker.services;

import com.nbu.jobseeker.dto.NoticeSearchDTO;
import com.nbu.jobseeker.dto.NoticeUpdateDTO;
import com.nbu.jobseeker.model.*;
import com.nbu.jobseeker.repositories.CategoryRepository;
import com.nbu.jobseeker.repositories.CompanyRepository;
import com.nbu.jobseeker.repositories.NoticeRepository;
import com.nbu.jobseeker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service("noticeService")
public class NoticeService {

    private NoticeRepository noticeRepository;
    private CompanyRepository companyRepository;
    private UserRepository userRepository;
    private CategoryRepository categoryRepository;
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private NoticeService(@Qualifier("noticeRepository")NoticeRepository noticeRepository,
                          @Qualifier("companyRepository")CompanyRepository companyRepository,
                          @Qualifier("userRepository")UserRepository userRepository,
                          @Qualifier("categoryRepository")CategoryRepository categoryRepository) {
        this.noticeRepository = noticeRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public HashSet<JobNoticeStatus> convertStatusFromString(List<String> statuses){
        HashSet<JobNoticeStatus> listOfStatuses = new HashSet<>();
        if(statuses == null || statuses.isEmpty()){
            return listOfStatuses;
        }
        else{
            for (String status:statuses) {
                if("closed".equals(status.toLowerCase())){
                    listOfStatuses.add(JobNoticeStatus.CLOSED);
                }
                else if("pending".equals(status.toLowerCase())){
                    listOfStatuses.add(JobNoticeStatus.PENDING);
                }
                else if("open".equals(status.toLowerCase())){
                    listOfStatuses.add(JobNoticeStatus.OPEN);
                }
                else if("denied".equals(status.toLowerCase())){
                    listOfStatuses.add(JobNoticeStatus.DENIED);
                }
            }
        }
        return listOfStatuses;
    }

    public HashSet<JobCategory> convertCategoryFromString(List<String> categories){
        HashSet<JobCategory> listOfCategories = new HashSet<>();
        if(categories == null || categories.isEmpty()){
            return listOfCategories;
        }
        else{
            for (String category:categories) {
                listOfCategories.add(categoryRepository.findByName(category));
            }
        }
        return listOfCategories;
    }

    public List<JobNotice> retrieveNotices(NoticeSearchDTO parameters) {
        HashSet<JobNotice> notices = new HashSet<>();
        HashSet<JobNoticeStatus> statuses = convertStatusFromString(parameters.getStatuses());
        HashSet<JobCategory> categories = convertCategoryFromString(parameters.getCategories());
        if(statuses.isEmpty()){
            return new ArrayList<>();
        }
        if(parameters == null || ((parameters.getKeywords() == null || parameters.getKeywords().isEmpty()) && (parameters.getCategories() == null || parameters.getCategories().isEmpty()))){
            notices.addAll(noticeRepository.findAll());
            return notices.stream().filter(Objects::nonNull).filter(e-> statuses.contains(e.getStatus())).collect(Collectors.toList());
        }
        if(parameters.getCategories() == null || parameters.getCategories().isEmpty()){
            for(String keyword : parameters.getKeywords()) {
                notices.addAll(noticeRepository.findByTitleContains(keyword));
            }
            return notices.stream().filter(Objects::nonNull).filter(e-> statuses.contains(e.getStatus())).collect(Collectors.toList());
        }
        if(parameters.getKeywords() == null || parameters.getKeywords().isEmpty()){
            for(JobCategory category : categories) {
                notices.addAll(noticeRepository.findByCategory(category));
            }
            return notices.stream().filter(Objects::nonNull).filter(e-> statuses.contains(e.getStatus())).collect(Collectors.toList());
        }
        for(String keyword : parameters.getKeywords()) {
            notices.addAll(noticeRepository.findByTitleContains(keyword));
        }

        return notices.stream().filter(Objects::nonNull).filter(e-> statuses.contains(e.getStatus())).collect(Collectors.toList());
    }

    public boolean updateNotice(Long id, NoticeUpdateDTO noticeUpdateDTO) {
        JobNotice notice = noticeRepository.findById(id).get();
        if(noticeUpdateDTO.getToken() != null){
            User currentUser = userRepository.findByToken(noticeUpdateDTO.getToken());
            if(currentUser.getId() == notice.getCompany().getId()){
                if (noticeUpdateDTO.getCategory() != null) {
                    JobCategory existingCategory = categoryService.getByName(noticeUpdateDTO.getCategory());
                    if(existingCategory == null) {
                        return false;
                    }
                    notice.setCategory(existingCategory);
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
            }
            else if(currentUser instanceof Administrator){
                if((Boolean) noticeUpdateDTO.isDeleted() != null){
                    notice.setDeleted(noticeUpdateDTO.isDeleted());
                }

                if(noticeUpdateDTO.getStatus() != null && "open".equals(noticeUpdateDTO.getStatus().toLowerCase())){
                    notice.setStatus(JobNoticeStatus.OPEN);
                }
                else if(noticeUpdateDTO.getStatus() != null && "denied".equals(noticeUpdateDTO.getStatus().toLowerCase())){
                    notice.setStatus(JobNoticeStatus.DENIED);
                }
            }
        }
        else{
            return false;
        }
        notice.setLastModified(new Date());
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
       notice.setLastModified(new Date());
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
