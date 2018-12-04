package com.cmpe275.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.cmpe275.entity.UserSubscription;
import com.cmpe275.service.SubscriptionService;
import com.cmpe275.utility.ResponseFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    ResponseFormat responseObject = new ResponseFormat();

    @PostMapping(path = "/payment", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createSubscription(@RequestBody UserSubscription us, HttpSession session) {
        try {
            UserSubscription result = subscriptionService.addSubscription(us);
            if (result != null) {
                responseObject.setData(result);
                responseObject.setMeta("Subscription created succesfully");
                return new ResponseEntity(responseObject, HttpStatus.OK);
            } else {
                responseObject.setData(null);
                responseObject.setMeta("Subscription already exists");
                return new ResponseEntity(responseObject, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            responseObject.setData(e);
            return new ResponseEntity(responseObject, HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping(path = "/income/subscribed/{month}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMonthlySubscriptionIncome(@PathVariable("month") Integer month) {
        Long monthlySubscriptionIncome = subscriptionService.getMonthlySubscriptionIncome(month);
        responseObject.setData(monthlySubscriptionIncome);
        responseObject.setMeta("Subscribed Income retrieved successfully.");
        return new ResponseEntity(responseObject, HttpStatus.OK);
    }
    
    @GetMapping(path = "/income/ppv/{month}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getMonthlyPayPerViewIncome(@PathVariable("month") Integer month) {
        Long monthlyPayPerViewIncome = subscriptionService.getMonthlyPayPerViewIncome(month);
        responseObject.setData(monthlyPayPerViewIncome);
        responseObject.setMeta("Pay per view Income retrieved successfully.");
        return new ResponseEntity(responseObject, HttpStatus.OK);
    }

}
