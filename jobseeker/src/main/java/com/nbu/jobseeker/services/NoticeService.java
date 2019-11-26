package com.nbu.jobseeker.services;

import com.nbu.jobseeker.dto.NoticeUpdateDTO;
import com.nbu.jobseeker.model.JobCategory;
import com.nbu.jobseeker.model.JobNotice;
import com.nbu.jobseeker.model.JobNoticeStatus;
import com.nbu.jobseeker.repositories.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service("noticeService")
public class NoticeService {

    private NoticeRepository noticeRepository;
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private NoticeService(@Qualifier("noticeRepository")NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
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
        if(notice != null) {
            notice.setTitle(noticeUpdateDTO.getTitle());
            notice.setDescription(noticeUpdateDTO.getDescription());
            JobCategory existingCategory = categoryService.getByName(noticeUpdateDTO.getCategory());
            if(existingCategory == null) {
                existingCategory = new JobCategory();
                existingCategory.setName(noticeUpdateDTO.getCategory());
                categoryService.saveCategory(existingCategory);
            }
            notice.setCategory(existingCategory);
            noticeRepository.save(notice);
            return true;
        }
        return false;
    }

    //TODO Create notice
    public boolean createNotice() {
        return false;
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
