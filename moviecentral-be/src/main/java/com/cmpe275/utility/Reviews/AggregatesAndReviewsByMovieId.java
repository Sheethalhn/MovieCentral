package com.cmpe275.utility.Reviews;

import com.cmpe275.entity.Review;

import java.util.List;

public class AggregatesAndReviewsByMovieId {
    private ReviewsAggregateResults aggregates;
    private List<Review> data;

    public AggregatesAndReviewsByMovieId() {
    }

    public AggregatesAndReviewsByMovieId(ReviewsAggregateResults aggregates, List<Review> data) {
        this.aggregates = aggregates;
        this.data = data;
    }

    public ReviewsAggregateResults getAggregates() {
        return aggregates;
    }

    public void setAggregates(ReviewsAggregateResults aggregates) {
        this.aggregates = aggregates;
    }

    public List<Review> getData() {
        return data;
    }

    public void setData(List<Review> data) {
        this.data = data;
    }
}
