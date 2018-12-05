package com.cmpe275.utility;

import java.util.List;

public class FilterValues {
    private List<String> genre;
    private List<String> year;
    private List<String> director;
    private List<String> rating;
    private List<Integer> stars;
    private List<String> actors;

    public FilterValues(List<String> genre,
                        List<String> year,
                        List<String> director,
                        List<String> rating,
                        List<Integer> stars,
                        List<String> actors
                        ){
        this.genre = genre;
        this.year = year;
        this.director = director;
        this.rating = rating;
        this.stars = stars;
        this.actors = actors;
    }

    public List<String> getActors() {
        return actors;
    }

    public void setActors(List<String> actors) {
        this.actors = actors;
    }

    public List<String> getGenre() {
        return genre;
    }

    public void setGenre(List<String> genre) {
        this.genre = genre;
    }

    public List<String> getYear() {
        return year;
    }

    public void setYear(List<String> year) {
        this.year = year;
    }

    public List<String> getDirector() {
        return director;
    }

    public void setDirector(List<String> director) {
        this.director = director;
    }

    public List<String> getRating() {
        return rating;
    }

    public void setRating(List<String> rating) {
        this.rating = rating;
    }

    public List<Integer> getStars() {
        return stars;
    }

    public void setStars(List<Integer> stars) {
        this.stars = stars;
    }
}
