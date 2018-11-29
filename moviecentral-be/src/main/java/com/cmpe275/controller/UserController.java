/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.controller;

import com.cmpe275.entity.User;
import com.cmpe275.service.UserService;
import com.cmpe275.utility.ResponseFormat;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author shahs
 */
@Controller
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserService userService;

    ResponseFormat responseObject = new ResponseFormat();

    @GetMapping(path = "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserDetails(@PathVariable Long userId) {
        User dbUserEntity = userService.getUserById(userId);
        if (dbUserEntity != null) {
            responseObject.setData(dbUserEntity);
            responseObject.setMeta("User retrieved successfully.");
            return new ResponseEntity(responseObject, HttpStatus.OK);
        } else {
            responseObject.setData(dbUserEntity);
            responseObject.setMeta("User not found with this id");
            return new ResponseEntity(responseObject, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllActiveUsers() {
        List<User> allActiveUsers = userService.getAllActiveUsers();
        if (!CollectionUtils.isEmpty(allActiveUsers)) {
            responseObject.setData(allActiveUsers);
            responseObject.setMeta("Users retrieved successfully.");
            return new ResponseEntity(responseObject, HttpStatus.OK);
        } else {
            responseObject.setData(null);
            responseObject.setMeta("No Users found");
            return new ResponseEntity(responseObject, HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping(path = "/users/{time}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTopUsersBasedOnTime(@PathVariable String timeDef) {
        List<User> allActiveUsers = userService.getAllActiveUsers();
        if (!CollectionUtils.isEmpty(allActiveUsers)) {
            responseObject.setData(allActiveUsers);
            responseObject.setMeta("Users retrieved successfully.");
            return new ResponseEntity(responseObject, HttpStatus.OK);
        } else {
            responseObject.setData(null);
            responseObject.setMeta("No Users found");
            return new ResponseEntity(responseObject, HttpStatus.NOT_FOUND);
        }
    }
}
