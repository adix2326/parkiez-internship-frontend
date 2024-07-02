package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookingRepo extends MongoRepository<Booking, String>
{

}
