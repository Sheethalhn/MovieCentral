package com.cmpe275.utility.MovieActivity;

import java.util.Date;

public class MovieActivityAggregateResults {

    private String title;
    private String availability;
    private Long playCount;
    private Date watchTime;
    private String genre;

    public MovieActivityAggregateResults(String title, String availability, Long playCount) {
        this.title = title;
        this.availability = availability;
        this.playCount = playCount;
    }

    public MovieActivityAggregateResults(String title, String availability, String genre, Date watchTime) {
        this.title = title;
        this.availability = availability;
        this.watchTime = watchTime;
        this.genre = genre;
    }

    public MovieActivityAggregateResults() {
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAvailability() {
        return this.availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public void setPlayCount(Long playCount) {
        this.playCount = playCount;
    }

    public Long getPlayCount() {
        return this.playCount;
    }

    public Date getWatchTime() {
        return watchTime;
    }

    public void setWatchTime(Date watchTime) {
        this.watchTime = watchTime;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

}
