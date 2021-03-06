/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.service;

import com.cmpe275.entity.User;
import com.cmpe275.repository.UserRepository;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Shreya Shah
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Bean
    private PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }

    public User login(User userEntity) {
        User dbUserObj = userRepository.findByEmail(userEntity.getEmail());
        System.out.println("dbUserObj :"+dbUserObj);
        if (dbUserObj != null) {
            if (getEncoder().matches(userEntity.getPassword(), dbUserObj.getPassword()) && dbUserObj.getEmailVerified().equals(true)) {
                return dbUserObj;
            }
        }
        return null;
    }

    public User signUp(User userEntity) {
        userEntity.setPassword(getEncoder().encode(userEntity.getPassword()));
        User addedUser = userRepository.save(userEntity);
        return addedUser;
    }

    public User checkUserExist(User userEntity) {
        User dbUserObj = userRepository.findByEmail(userEntity.getEmail());
        return dbUserObj;
    }

    public boolean checkPasswordPattern(String password) {
        Pattern p = Pattern.compile("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=?!~|()<>{}:;,\"'`\\[\\]\\\\\\/.\\-_*])([a-zA-Z0-9@#$%^&+=?!~|()<>{}:;,“’`\\[\\]\\\\\\/*.\\-_]){8,})");
        Matcher m = p.matcher(password);
        return m.find();
    }
}
