package com.cmpe275.Specification;

import com.cmpe275.entity.Actor;

import java.util.List;

public class FilterCriteria {
    List<String> genres;
    List<Integer> stars;
    List<String> years;
    List<String> directors;
    List<String> ratings;
    List<String> keywords;
    List<String> actors;

    public FilterCriteria(
            List<String> genres,
            List<Integer> stars,
            List<String> years,
            List<String> directors,
            List<String> ratings,
            List<String> keywords,
            List<String> actors
    ){
        this.genres = genres;
        this.stars = stars;
        this.years = years;
        this.directors = directors;
        this.ratings = ratings;
        this.keywords = keywords;
        this.actors = actors;
    }

    public List<String> getActors() {
        return actors;
    }

    public List<String> getGenres() {
        return genres;
    }

    public List<Integer> getStars() {
        return stars;
    }

    public List<String> getYears() {
        return years;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public List<String> getDirectors() {
        return directors;
    }

    public List<String> getRatings() {
        return ratings;
    }
}
