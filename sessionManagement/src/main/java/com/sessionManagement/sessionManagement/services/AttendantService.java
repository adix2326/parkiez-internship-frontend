package com.sessionManagement.sessionManagement.services;

import com.sessionManagement.sessionManagement.documents.Attendant;
import com.sessionManagement.sessionManagement.documents.Operators;
import com.sessionManagement.sessionManagement.repo.AttendantRepo;
import com.sessionManagement.sessionManagement.repo.OperatorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AttendantService {

    @Autowired
    private AttendantRepo attendantRepo;

    @Autowired
    private OperatorRepo operatorRepo;

    public String registerAttendant(Attendant attendant) {
        try {
            if (attendantRepo.existsByPhoneNo(attendant.getPhoneNo())) {
                return "Attendant already exists : " + attendant.getPhoneNo();
            } else {
                System.out.println("In else");
                attendantRepo.save(attendant);
                return "registered attendant : " + attendant.getName();
            }
        } catch (Exception e) {
            return "ERROR registering attendant: " + e.getMessage();
        }
    }

    public String findUsernameByPhoneNo(String phoneNo) {
        // Search in Attendant collection
        Optional<Attendant> attendantOptional = attendantRepo.findByPhoneNo(phoneNo);
        if (attendantOptional.isPresent()) {
            return attendantOptional.get().getName(); // Assuming getName() returns the username
        }

        // Search in Operators collection
        Optional<Operators> operatorsOptional = operatorRepo.findByPhoneNo(phoneNo);
        if (operatorsOptional.isPresent()) {
            return operatorsOptional.get().getName(); // Assuming getName() returns the username
        }

        // If the phone number is not found in any collection
        return null;
    }

    void initRolesAndAttendant() {
        // Implementation
    }
}
