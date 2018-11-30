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

    @Query(value = "SELECT u from User u where u.emailVerified = 1 AND u.role = 'customer'")
    List<User> getAllActiveUsers();

    @Query(value = "SELECT u from"
            + " User as u JOIN PlaybackHistory ph on u.userId=ph.userObj where ph.timestamp >= :previousDate and ph.timestamp <= :currentDate"
            + " group by ph.userObj order by count(ph.movieObj) desc")
    List<User> getTopUsersBasedOnTime(@Param("previousDate") Date previousDate, @Param("currentDate") Date currentDate,Pageable pageable);
}
