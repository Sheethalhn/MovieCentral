/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.service;

import com.cmpe275.entity.User;
import com.cmpe275.entity.UserSubscription;
import com.cmpe275.repository.SubscriptionRepository;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

import com.cmpe275.utility.Constant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author sheethal
 */
@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public UserSubscription addSubscription(UserSubscription userSubscription) {
    	
    	UserSubscription userSubObj= null;
    	Calendar currentTime = Calendar.getInstance();
    	
    	if (userSubscription.getSubscriptionType().equals(Constant.MONTHLY_SUBSCRIPTION) ) {
    		UserSubscription checkObj = subscriptionRepository.findByUserId(currentTime.getTime(),userSubscription.getUserSubscriptionObj());    
    		if(checkObj == null)
    		{
    			Calendar cal = Calendar.getInstance();
    	    	cal.set(Calendar.HOUR_OF_DAY, 0);
    	    	cal.set(Calendar.MINUTE, 0);
    	    	cal.set(Calendar.SECOND, 0);
    	    	cal.set(Calendar.MILLISECOND, 0);
    	       	cal.add(Calendar.MONTH, userSubscription.getDuration().intValue());
    	       	cal.add(Calendar.DAY_OF_MONTH, 1);
    			Date expiresOn = cal.getTime();
    			userSubscription.setExpiresOn(expiresOn);
    		}
    		else
    		{
    			
    			return userSubObj;
	    
    		}
    	}else if(userSubscription.getSubscriptionType().equals(Constant.PAY_PER_VIEW) || userSubscription.getSubscriptionType().equals(Constant.PAID) ){
    		UserSubscription checkObjMovie = subscriptionRepository.findByMovieId(currentTime.getTime(),userSubscription.getUserSubscriptionObj(),userSubscription.getMovieSubscriptionObj());
    		if(checkObjMovie == null) {
    		Calendar cal = Calendar.getInstance();
	    	cal.set(Calendar.HOUR_OF_DAY, 0);
	    	cal.set(Calendar.MINUTE, 0);
	    	cal.set(Calendar.SECOND, 0);
	    	cal.set(Calendar.MILLISECOND, 0);
	       	cal.add(Calendar.DAY_OF_MONTH, 1);
			Date expiresOn = cal.getTime();
			userSubscription.setExpiresOn(expiresOn);
    		}
    		else
    		{
    			return userSubObj;
    		}
    	}

    	userSubObj=subscriptionRepository.save(userSubscription);
    	return userSubObj ;
    }


}
