/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.entity;

import java.util.Date;
import java.util.List;
import java.util.Random;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Shreya Shah
 */
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Long userId;

    private String email;

    private String password;
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "screen_name")
    private String screenName;

    private Long role;

    @Column(name = "email_verified")
    private Boolean emailVerified;

    @Column(name = "verification_code")
    private Integer verificationCode = new Random().nextInt(10000);

    @Column(name = "created_on")
    private Date createdOn;

    @OneToMany(mappedBy = "userSubscriptionObj", fetch = FetchType.LAZY)
    private List<UserSubscription> userSubscriptions;

    @OneToMany(mappedBy = "userRatingObj", fetch = FetchType.LAZY)
    private List<UserRating> userRatings;

    @OneToMany(mappedBy = "userObj", fetch = FetchType.LAZY)
    private List<PlaybackHistory> userPlaybackHistory;

    public User() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getScreenName() {
        return screenName;
    }

    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }

    public Long getRole() {
        return role;
    }

    public void setRole(Long role) {
        this.role = role;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public Integer getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(Integer verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public List<UserSubscription> getUserSubscriptions() {
        return userSubscriptions;
    }

    public void setUserSubscriptions(List<UserSubscription> userSubscriptions) {
        this.userSubscriptions = userSubscriptions;
    }

    public List<UserRating> getUserRatings() {
        return userRatings;
    }

    public void setUserRatings(List<UserRating> userRatings) {
        this.userRatings = userRatings;
    }

    public List<PlaybackHistory> getUserPlaybackHistory() {
        return userPlaybackHistory;
    }

    public void setUserPlaybackHistory(List<PlaybackHistory> userPlaybackHistory) {
        this.userPlaybackHistory = userPlaybackHistory;
    }

    @Override
    public String toString() {
        return "User{" + "userId=" + userId + ", email=" + email + ", password=" + password + ", firstName=" + firstName + ", lastName=" + lastName + ", screenName=" + screenName + ", role=" + role + ", emailVerified=" + emailVerified + ", verificationCode=" + verificationCode + ", createdOn=" + createdOn + ", userSubscriptions=" + userSubscriptions + ", userRatings=" + userRatings + ", userPlaybackHistory=" + userPlaybackHistory + '}';
    }

}
