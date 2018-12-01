/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.entity;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 *
 * @author Shreya Shah
 */
@Entity
@Table(name = "movie")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "movie_id")
    private Long movieId;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_on")
    private Date createdOn;

    private String title;
    private String genre;
    private String year;
    private String studio;
    private String synopsis;
    private String image;
    private String director;
    private String country;
    private String rating;
    private String availability;
    private Integer stars;

    @OneToMany(mappedBy = "actor", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Actor> actors = new ArrayList<>();

    @Override
    public String toString() {
        return "{" +
            " movieId='" + getMovieId() + "'" +
            ", createdOn='" + getCreatedOn() + "'" +
            ", title='" + getTitle() + "'" +
            ", genre='" + getGenre() + "'" +
            ", year='" + getYear() + "'" +
            ", studio='" + getStudio() + "'" +
            ", synopsis='" + getSynopsis() + "'" +
            ", image='" + getImage() + "'" +
            ", director='" + getDirector() + "'" +
            ", country='" + getCountry() + "'" +
            ", rating='" + getRating() + "'" +
            ", availability='" + getAvailability() + "'" +
            ", stars='" + getStars() + "'" +
            ", actors='" + getActors() + "'" +
            "}";
    }

    public Integer getStars() { return this.stars;}
    public void setStars(Integer stars) { this.stars = stars;}

    public Long getMovieId() {
        return this.movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Date getCreatedOn() {
        return this.createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return this.genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getYear() {
        return this.year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getStudio() {
        return this.studio;
    }

    public void setStudio(String studio) {
        this.studio = studio;
    }

    public String getSynopsis() {
        return this.synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDirector() {
        return this.director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getCountry() {
        return this.country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRating() {
        return this.rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getAvailability() {
        return this.availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public List<Actor> getActors() {
        return this.actors;
    }

    public void setActors(List<Actor> actors) {
        this.actors = actors;
    }

    
}
