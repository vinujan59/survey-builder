package com.arima.surveybuilder.api;

import com.arima.surveybuilder.message.SBResponse;
import com.arima.surveybuilder.service.QuestionService;
import com.arima.surveybuilder.util.SBException;
import org.apache.cxf.rs.security.cors.CrossOriginResourceSharing;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;

@Produces("application/json")
@CrossOriginResourceSharing(
        allowAllOrigins = true,
        allowCredentials = true,
        allowHeaders = {"Origin", "Content-Type", "Accept", "Authorization"}
        )
@Path("surveybuilder/service/question")
public class questionApi {

    @Autowired
    QuestionService questionService;

    @GET
    @Path("test")
    public SBResponse<String> test() throws SBException {
        return new SBResponse<>("OKay!!");
    }

}
