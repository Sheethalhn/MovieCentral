/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.repository;

import com.cmpe275.entity.User;
import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 * User JPA Repository for user related operations in database
 *
 * @author Shreya Shah
 */
public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findByEmailAndPassword(String email, String password);

    User findByEmail(String email);

    @Transactional
    User findByUserId(Long id);

    User findByVerificationCode(String verificationCode);

    @Query(value = "SELECT u FROM User u LEFT JOIN PlaybackHistory AS ph ON u.userId = ph.userObj WHERE u.emailVerified = 1 AND u.role = 'customer' GROUP BY u.userId ORDER BY COUNT(ph.userObj) DESC")
    List<User> getAllActiveUsers();

    @Query(value = "SELECT u from User u where u.emailVerified = 1 AND u.role = 'customer' AND u.createdOn >= :previousDate AND u.createdOn <= :currentDate")
    List<User> getActiveUsersByMonth(@Param("previousDate") Date previousDate, @Param("currentDate") Date currentDate);

    @Query(value = "SELECT u from"
            + " User as u JOIN PlaybackHistory ph on u.userId=ph.userObj where u.role = 'customer' AND ph.timestamp >= :previousDate AND ph.timestamp <= :currentDate"
            + " group by ph.userObj order by count(ph.movieObj) desc")
    List<User> getTopUsersBasedOnTime(@Param("previousDate") Date previousDate, @Param("currentDate") Date currentDate, Pageable pageable);

    @Query(value = "SELECT distinct u FROM User as u JOIN UserSubscription as us on u.userId = us.userSubscriptionObj "
            + "where u.role = 'customer' AND us.subscriptionType IN :subscriptionType And us.createdOn >= :previousDate AND us.createdOn <= :currentDate")
    List<User> getUsersBySubscriptionType(@Param("previousDate") Date previousDate, @Param("currentDate") Date currentDate, @Param("subscriptionType") List<String> subscriptionTypes);

    @Query(value = "SELECT distinct u FROM User as u JOIN PlaybackHistory as ph on u.userId = ph.userObj "
            + "where u.role = 'customer' AND ph.timestamp >= :previousDate AND ph.timestamp <= :currentDate")
    List<User> getActiveUserPlayBackByMonth(@Param("previousDate") Date previousDate, @Param("currentDate") Date currentDate);
}
