package com.arima.surveybuilder.mysql;

import com.arima.surveybuilder.domain.Answer;
import org.springframework.data.repository.CrudRepository;

import javax.annotation.Resource;

@Resource
public interface AnswerRepository extends CrudRepository<Answer, Long> {
    public Answer findByQuestionId(String questionId);
}
