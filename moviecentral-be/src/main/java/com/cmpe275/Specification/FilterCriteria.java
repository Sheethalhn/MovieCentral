package com.cmpe275.Specification;

import java.util.List;

public class FilterCriteria {
    List<String> genres;
    List<Integer> stars;
    List<String> years;
    List<String> directors;
    List<String> ratings;
    List<String> keywords;

    public FilterCriteria(
            List<String> genres,
            List<Integer> stars,
            List<String> years,
            List<String> directors,
            List<String> ratings,
            List<String> keywords
    ){
        this.genres = genres;
        this.stars = stars;
        this.years = years;
        this.directors = directors;
        this.ratings = ratings;
        this.keywords = keywords;
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
