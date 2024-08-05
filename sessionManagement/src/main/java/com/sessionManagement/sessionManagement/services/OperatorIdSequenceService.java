package com.sessionManagement.sessionManagement.services;

import com.sessionManagement.sessionManagement.documents.Sequences;
import com.sessionManagement.sessionManagement.repo.SequencesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class OperatorIdSequenceService {
    @Autowired
    private MongoOperations mongoOperations;

    @Autowired
    private SequencesRepo sequencesRepo;

    public String generateSequence(String seqName) {
        Query query = new Query(Criteria.where("_id").is(seqName));
        Update update = new Update().inc("seq", 1);
        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);

        Sequences sequence = mongoOperations.findAndModify(query, update, options, Sequences.class);
        return sequence != null ? "OP" + sequence.getSeq() : "OP" + 1;
    }
}
