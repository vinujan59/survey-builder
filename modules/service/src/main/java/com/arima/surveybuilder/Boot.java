package com.arima.surveybuilder;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Boot {

    public static void main(String[] args) throws Exception {
        final ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("surveybuilder-server-context.xml");
        context.registerShutdownHook();

        logStartedMessage();

        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                logStoppedMessage();
            }
        });

        context.start();
        Thread.currentThread().join();
    }

    private static void logStartedMessage() {
        System.out.println("#############################################################");
        System.out.println("##            SurveyBuilder Server Started Successfully           ##");
        System.out.println("#############################################################");
    }

    private static void logStoppedMessage() {
        System.out.println("#############################################################");
        System.out.println("##           SurveyBuilder Server Stopped Successfully            ##");
        System.out.println("#############################################################");
    }

}
