/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.service;

import com.cmpe275.entity.User;
import com.cmpe275.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author shahs
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserByCode(String code) {
        return userRepository.findByVerificationCode(code);
    }

    public void addOrUpdateUser(User user) {
        userRepository.save(user);
    }

    public User getUserById(Long userId) {
        return userRepository.findByUserId(userId);
    }

}
