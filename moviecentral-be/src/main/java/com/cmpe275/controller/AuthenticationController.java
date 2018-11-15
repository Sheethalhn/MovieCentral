/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.controller;

import com.cmpe275.entity.User;
import com.cmpe275.service.AuthenticationService;
import com.cmpe275.service.UserService;
import com.cmpe275.utility.ResponseFormat;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author Shreya Shah
 */
@Controller
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    UserService userService;

    @Autowired
    EmailController emailController;

    ResponseFormat responseObject = new ResponseFormat();

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody User userEntity, HttpSession session) {
        User dbUserEntity = authenticationService.login(userEntity);
        if (dbUserEntity != null) {
            session.setAttribute("userId", dbUserEntity.getUserId());
            session.setAttribute("email", dbUserEntity.getEmail());
            responseObject.setData(dbUserEntity);
            responseObject.setMeta("You are logged In Successfully.");
            return new ResponseEntity(responseObject, HttpStatus.OK);
        } else {
            responseObject.setData(dbUserEntity);
            responseObject.setMeta("Login Failed. Issue With email or password.");
            return new ResponseEntity(responseObject, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signUp(@RequestBody User userEntity, HttpSession session) {
        Boolean passwordValidity = authenticationService.checkPasswordPattern(userEntity.getPassword());
        if (!passwordValidity) {
            responseObject.setData(null);
            responseObject.setMeta("The password is too weak! Include 1 Capital Letter, 1 small Letter, 1 digit and 1 special character with minimum 8 character length");
            return new ResponseEntity(responseObject, HttpStatus.BAD_REQUEST);
        }
        User existedUser = authenticationService.checkUserExist(userEntity);
        if (existedUser != null) {
            responseObject.setData(null);
            responseObject.setMeta("User Already Exist in the system with this email address.");
            return new ResponseEntity(responseObject, HttpStatus.BAD_REQUEST);
        }
        User dbUserDatabean = authenticationService.signUp(userEntity);
        if (dbUserDatabean != null) {
            try {
                emailController.sendEmail(dbUserDatabean.getFirstName(), dbUserDatabean.getEmail(), "Verify your Account of Movie Central", dbUserDatabean.getVerificationCode());
            } catch (Exception e) {
                e.printStackTrace();
            }
            responseObject.setData(dbUserDatabean);
            responseObject.setMeta("Your account has been created successfully. Please activate the account from your email");
            return new ResponseEntity(responseObject, HttpStatus.OK);
        } else {
            responseObject.setData(dbUserDatabean);
            responseObject.setMeta("Signup Failed.");
            return new ResponseEntity(responseObject, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/code/{verificationCode}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserFromCode(@PathVariable String verificationCode) {
        User dbUserEntity = userService.getUserByCode(verificationCode);
        if (dbUserEntity != null) {
            responseObject.setData(dbUserEntity);
            responseObject.setMeta("User Retrieved successfully.");
            return new ResponseEntity(responseObject, HttpStatus.OK);
        } else {
            responseObject.setData(null);
            responseObject.setMeta("No user Available with the following code");
            return new ResponseEntity(responseObject, HttpStatus.OK);
        }
    }

    @PostMapping(path = "/verifyuser", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> verifyUser(@RequestBody User userEntity, HttpSession session) {
        User existedUser = authenticationService.checkUserExist(userEntity);
        if (existedUser != null) {
            userEntity.setEmailVerified(Boolean.TRUE);
            userService.addOrUpdateUser(userEntity);
            responseObject.setData(userEntity);
            responseObject.setMeta("User Verified.");
            return new ResponseEntity(responseObject, HttpStatus.OK);
        } else {
            responseObject.setData(null);
            responseObject.setMeta("No such User In the system.");
            return new ResponseEntity(responseObject, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "/logout", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return new ResponseEntity(HttpStatus.OK);
    }
}
