/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

/**
 *
 * @author Shreya Shah
 */
@Entity
@Table(name = "subscriptions")
public class UserSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User userSubscriptionObj;

    @Column(name = "subscription_type")
    private String subscriptionType;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movieSubscriptionObj;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_on")
    private Date createdOn;

    private Long duration;
    
    @Column(name = "expires_on")
    private Date expiresOn;

    public UserSubscription() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUserSubscriptionObj() {
        return userSubscriptionObj;
    }

    public void setUserSubscriptionObj(User userSubscriptionObj) {
        this.userSubscriptionObj = userSubscriptionObj;
    }

    public Movie getMovieSubscriptionObj() {
        return movieSubscriptionObj;
    }

    public void setMovieSubscriptionObj(Movie movieSubscriptionObj) {
        this.movieSubscriptionObj = movieSubscriptionObj;
    }

    public String getSubscriptionType() {
        return subscriptionType;
    }

    public void setSubscriptionType(String subscriptionType) {
        this.subscriptionType = subscriptionType;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }
    
    public Date getExpiresOn() {
        return expiresOn;
    }

    public void setExpiresOn(Date expiresOn) {
        this.expiresOn = expiresOn;
    }
}
