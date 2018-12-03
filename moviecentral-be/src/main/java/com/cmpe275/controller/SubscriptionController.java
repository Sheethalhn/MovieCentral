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

@Controller
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class SubscriptionController {
	
	@Autowired
	private SubscriptionService subscriptionService;
	
    @PostMapping(path = "/payment", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createSubscription(@RequestBody UserSubscription us, HttpSession session) {
    	ResponseFormat resp = new ResponseFormat();
        try{
            UserSubscription result = subscriptionService.addSubscription(us);
            if(result != null) {
            	resp.setData(result);
            	resp.setMeta("Subscription created succesfully");
                return new ResponseEntity(resp, HttpStatus.OK);
               
            }
            else {
            	resp.setData(null);
                resp.setMeta("Subscription already exists");
                return new ResponseEntity(resp, HttpStatus.BAD_REQUEST);
            }
            	
        }catch (Exception e){
            resp.setData(e);
            return new ResponseEntity(resp, HttpStatus.NO_CONTENT);
        }
    	
    }

}
