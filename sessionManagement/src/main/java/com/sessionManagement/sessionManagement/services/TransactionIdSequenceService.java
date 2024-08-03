package com.sessionManagement.sessionManagement.services;
import com.sessionManagement.sessionManagement.documents.TransactionIdSequence;
import com.sessionManagement.sessionManagement.repo.TransactionIdSequenceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class TransactionIdSequenceService {
    @Autowired
    private MongoOperations mongoOperations;

    @Autowired
    private TransactionIdSequenceRepo transactionIdSequenceRepo;

    public long generateSequence(String seqName) {
        Query query = new Query(Criteria.where("_id").is(seqName));
        Update update = new Update().inc("seq", 1);
        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);

        TransactionIdSequence sequence = mongoOperations.findAndModify(query, update, options, TransactionIdSequence.class);
        return sequence != null ? sequence.getSeq() : 1;
    }
}
