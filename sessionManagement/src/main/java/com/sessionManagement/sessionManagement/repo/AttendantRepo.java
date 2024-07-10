package com.sessionManagement.sessionManagement.repo;
//import User
import com.sessionManagement.sessionManagement.documents.Attendant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AttendantRepo extends MongoRepository<Attendant, String>
{
    boolean existsByPhoneNo(String phoneNo);

    Optional<Attendant> findByPhoneNo(String phoneNo);

    boolean existsByUserId(String userId);
}
