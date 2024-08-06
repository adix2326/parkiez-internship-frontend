package com.sessionManagement.sessionManagement.services;

import com.sessionManagement.sessionManagement.repo.OperatorRepo;
import com.sessionManagement.sessionManagement.documents.Operators;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OperatorService
{
    @Autowired
    private OperatorRepo operatorRepo;

    public String getOperatorIdByPhoneNo(String phoneNo) {
        return operatorRepo.findByPhoneNo(phoneNo)
                .map(Operators::getOperatorId)
                .orElse(null);
    }

}
