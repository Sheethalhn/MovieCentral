package com.cmpe275.utility;

import java.util.ArrayList;
import java.util.List;

public class FilterValues {
    private List<String> genre;
    private List<String> year;
    private List<String> director;
    private List<String> rating;
    private Double stars;
    private List<String> actors;

    public FilterValues(List<String> genre,
                        List<String> year,
                        List<String> director,
                        List<String> rating,
                        Double stars,
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

    public List<String> getStars() {
        List<String> res = new ArrayList<>();
        if(stars != null){
            for(Double i=1.0;i<=stars;i++){
                res.add((Integer.toString(i.intValue())));
            }
        }
        return res;
    }

    public void setStars(Double stars) {
        this.stars = stars;
    }
}
