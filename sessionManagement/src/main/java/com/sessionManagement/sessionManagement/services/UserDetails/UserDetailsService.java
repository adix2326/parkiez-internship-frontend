package com.sessionManagement.sessionManagement.services.UserDetails;


import com.sessionManagement.sessionManagement.documents.Admin;
import com.sessionManagement.sessionManagement.documents.Attendant;
import com.sessionManagement.sessionManagement.documents.Operators;
import com.sessionManagement.sessionManagement.repo.AdminRepo;
import com.sessionManagement.sessionManagement.repo.AttendantRepo;
import com.sessionManagement.sessionManagement.repo.OperatorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService
{
    @Autowired
    AdminRepo adminRepo;

    @Autowired
    OperatorRepo operatorRepo;

    @Autowired
    AttendantRepo attendantRepo;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        try
        {
            Optional<Admin> adminOpt = adminRepo.findByUsername(username);
            if (adminOpt.isPresent())
            {
                Admin admin = adminOpt.get();
                return UserDetailsImpl.build(admin);
            }

            Optional<Operators> operatorOpt = operatorRepo.findByPhoneNo(username);
            if (operatorOpt.isPresent())
            {
                Operators operator = operatorOpt.get();
                return UserDetailsImpl.build(operator);
            }

            Optional<Attendant> attendantOpt = attendantRepo.findByPhoneNo(username);
            if (attendantOpt.isPresent())
            {
                Attendant attendant = attendantOpt.get();
                return UserDetailsImpl.build(attendant);
            }

            throw new UsernameNotFoundException("User not found with username: " + username);

        }
        catch (Exception e)
        {
            System.out.println("User not found caught.");
            return null;
        }
    }
}
