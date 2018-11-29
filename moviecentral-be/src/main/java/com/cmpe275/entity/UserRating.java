/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Shreya Shah
 */
@Entity
@Table(name = "rating")
public class UserRating implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private Integer rating;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User userRatingObj;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movieRatingObj;

    @Column(name = "review_message")
    private String reviewMessage;

    public UserRating() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public User getUserRatingObj() {
        return userRatingObj;
    }

    public void setUserRatingObj(User userRatingObj) {
        this.userRatingObj = userRatingObj;
    }

    public Movie getMovieRatingObj() {
        return movieRatingObj;
    }

    public void setMovieRatingObj(Movie movieRatingObj) {
        this.movieRatingObj = movieRatingObj;
    }

    public String getReviewMessage() {
        return reviewMessage;
    }

    public void setReviewMessage(String reviewMessage) {
        this.reviewMessage = reviewMessage;
    }

}
