package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.TransactionIdSequence;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface TransactionIdSequenceRepo extends MongoRepository<TransactionIdSequence, String> {
}
