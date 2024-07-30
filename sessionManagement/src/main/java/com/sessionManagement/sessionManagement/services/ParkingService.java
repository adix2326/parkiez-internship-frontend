package com.sessionManagement.sessionManagement.services;

import com.sessionManagement.sessionManagement.documents.Parking;
import com.sessionManagement.sessionManagement.repo.ParkingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParkingService
{
    @Autowired
    private ParkingRepo parkingRepo;


}
