package com.arima.surveybuilder.message;

public class SBResponse<T> {

    public String statusCode;
    public String statusDescription;
    public T content;

    public SBResponse() {
        this.statusCode = SBStatus.ERROR.statusCode;
        this.statusDescription = SBStatus.ERROR.statusDescription;
    }

    public SBResponse(SBStatus SBStatus) {
        this.statusCode = SBStatus.statusCode;
        this.statusDescription = SBStatus.statusDescription;
    }

    public SBResponse(T content) {
        this.statusCode = SBStatus.SUCCESS.statusCode;
        this.statusDescription = SBStatus.SUCCESS.statusDescription;
        this.content = content;
    }

    public SBResponse(T content, SBStatus SBStatus) {
        this.content = content;
        this.statusCode = SBStatus.statusCode;
        this.statusDescription = SBStatus.statusDescription;
    }

}
