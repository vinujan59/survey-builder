package com.arima.surveybuilder.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Arrays;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class Question {
    public String type;
    public String description;
    public String[] options;

    public String toString(){
        return "{" +"type : "+type
                +", descritption : "+description
                +", options : "+ Arrays.toString(options)+
                "}";
    }
}
