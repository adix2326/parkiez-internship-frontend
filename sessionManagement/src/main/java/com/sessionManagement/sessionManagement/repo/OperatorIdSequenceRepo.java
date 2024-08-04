package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.OperatorIdSequence;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OperatorIdSequenceRepo extends MongoRepository<OperatorIdSequence, String> {
}
