/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.repository;

import com.cmpe275.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 * User JPA Repository for user related operations in database
 *
 * @author Shreya Shah
 */
public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findByEmailAndPassword(String email, String password);

    User findByEmail(String email);

    User findByUserId(Long id);

    User findByVerificationCode(String verificationCode);
}
