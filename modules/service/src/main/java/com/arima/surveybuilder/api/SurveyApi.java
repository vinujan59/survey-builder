package com.arima.surveybuilder.api;

import com.arima.surveybuilder.domain.Questions;
import com.arima.surveybuilder.message.SBResponse;
import com.arima.surveybuilder.service.QuestionService;
import com.arima.surveybuilder.util.Authorize;
import com.arima.surveybuilder.util.SBException;
import org.apache.cxf.rs.security.cors.CrossOriginResourceSharing;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import java.util.List;

@Produces("application/json")
@CrossOriginResourceSharing(
        allowAllOrigins = true,
        allowCredentials = true,
        allowHeaders = {"Origin", "Content-Type", "Accept", "Authorization"}
        )
@Path("surveybuilder/service/survey")
public class SurveyApi {

    @Autowired
    QuestionService questionService;

    @GET
    @Path("test")
    public SBResponse<String> test() throws SBException {
        return new SBResponse<>(questionService.test());
    }

    @POST
    public SBResponse<String> saveSurvey(Questions questions) throws SBException {
        return new SBResponse<>(questionService.save(questions));
    }
    @GET
    public SBResponse<List<Questions>> getAllSurvey() throws SBException {
        return new SBResponse<>(questionService.getAll());
    }

}
