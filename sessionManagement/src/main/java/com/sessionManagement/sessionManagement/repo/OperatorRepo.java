package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.Operators;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OperatorRepo extends MongoRepository<Operators, String>
{
    Optional<Operators> findByPhoneNo(String phoneNo);
    Optional<Operators> findusernameByPhoneNo(String phoneNo);
    boolean existsByPhoneNo(String phoneNo);

    boolean existsByOperatorId(String operatorId);

}
