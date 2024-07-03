package com.sessionManagement.sessionManagement.services;

import com.sessionManagement.sessionManagement.repo.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService
{
    @Autowired
    private BookingRepo bookingRepo;

}
