package com.sessionManagement.sessionManagement.services;

import com.sessionManagement.sessionManagement.repo.OperatorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OperatorService
{
    @Autowired
    private OperatorRepo operatorRepo;

}
