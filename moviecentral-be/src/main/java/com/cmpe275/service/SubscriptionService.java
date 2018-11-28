/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.service;

import com.cmpe275.entity.UserSubscription;
import com.cmpe275.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author shahs
 */
@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public UserSubscription addSubscription(UserSubscription userSubscription) {
    	return subscriptionRepository.save(userSubscription);
    }


}
