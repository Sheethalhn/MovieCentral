/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.aop.aspect;

import com.cmpe275.service.EmailService;
import com.cmpe275.entity.User;
import com.cmpe275.utility.ResponseFormat;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author Shreya Shah
 */
@Aspect
@Configuration
public class AuthenticationAspect {

    @Autowired
    EmailService emailService;

    @AfterReturning(pointcut = "execution(* com.cmpe275.controller.AuthenticationController.signUp(..))", returning = "result")
    public void sendVerificationEmail(JoinPoint joinPoint, Object result) {
        System.out.println("Sending Verification Email-------");
        if (result != null) {
            System.out.println("result :" + result);
            ResponseEntity responseEntity = (ResponseEntity) result;
            ResponseFormat responseFormat = (ResponseFormat) responseEntity.getBody();
            User dbUserDatabean = (User) responseFormat.getData();
            if (dbUserDatabean != null) {
                try {
                    emailService.sendEmail(dbUserDatabean.getFirstName(), dbUserDatabean.getEmail(), "Verify your Account of Movie Central", dbUserDatabean.getVerificationCode());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

}
