/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.repository;

import com.cmpe275.entity.UserSubscription;
import com.cmpe275.entity.User;

import java.util.Date;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


/**
 * User JPA Repository for user related operations in database
 *
 * @author Sheethal
 */
public interface SubscriptionRepository extends CrudRepository<UserSubscription, Long> {

	@Override
	<S extends UserSubscription> S save(S s);
	
	@Query(value = "SELECT u from"
            + " UserSubscription as u where expiresOn > :currentDate  and userSubscriptionObj = :user")
    UserSubscription findByUserId(@Param("currentDate") Date currentDate,@Param("user") User user);
}

//
//
//