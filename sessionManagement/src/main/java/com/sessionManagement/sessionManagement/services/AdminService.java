package com.sessionManagement.sessionManagement.services;

import com.sessionManagement.sessionManagement.documents.Admin;
import com.sessionManagement.sessionManagement.repo.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService
{
    @Autowired
    private AdminRepo adminRepo;

    public Admin saveAdmin(Admin admin) {
        return adminRepo.save(admin);
    }
}
