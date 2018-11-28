/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.repository;


import com.cmpe275.entity.UserSubscription;
import org.springframework.data.repository.CrudRepository;


/**
 * User JPA Repository for user related operations in database
 *
 * @author Sheethal
 */
public interface SubscriptionRepository extends CrudRepository<UserSubscription, Long> {

	@Override
	<S extends UserSubscription> S save(S s);
}
