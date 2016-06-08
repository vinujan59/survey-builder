package com.arima.surveybuilder.domain;
import com.arima.surveybuilder.util.ISODateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.joda.time.DateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@Document(collection = "questions")
public class Questions {
    @Id
    public String id;
    public String title;
    public String introduction;
    public Question[] questions;
    @CreatedDate
    @JsonSerialize(using = ISODateTimeSerializer.class)
    public DateTime createdTime;
    @LastModifiedDate
    @JsonSerialize(using = ISODateTimeSerializer.class)
    public DateTime modifiedTime;


    public String toString(){
        return "{ title : " + title+
                ", introduction : " + introduction+
                ", questions : "+ Arrays.toString(questions)+
        "}";
    }
}
