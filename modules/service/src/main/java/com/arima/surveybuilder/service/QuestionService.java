package com.arima.surveybuilder.service;


import com.arima.surveybuilder.data.repo.SurveyRepository;
import com.arima.surveybuilder.domain.Questions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    private static final Logger LOGGER = LoggerFactory.getLogger(QuestionService.class);
    @Autowired
    SurveyRepository surveyRepository;
    public String test(){
        LOGGER.debug("User registerUser req received with params : {}", "hi");
        return "hi";
    }

    public String save(Questions questions){
        LOGGER.debug("question arrived: {}", questions);
        surveyRepository.save(questions);
        return "Success";
    }

    public List<Questions> getAll(){
        return surveyRepository.findAll();
    }

    public String deleteSurvey(String id){
        LOGGER.debug("deleted survey: {}", id);
        surveyRepository.delete(surveyRepository.findOne(id));
        return "Success";
    }
}
