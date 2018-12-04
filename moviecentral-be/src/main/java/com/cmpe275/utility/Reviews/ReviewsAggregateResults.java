package com.cmpe275.utility.Reviews;

public class ReviewsAggregateResults {

    private Long totalreviews;
    private Double avgratings;

    public ReviewsAggregateResults(Long totalreviews, Double avgratings) {
        this.totalreviews = totalreviews;
        this.avgratings = avgratings;
    }

    public ReviewsAggregateResults() {
    }

    public Long getTotalreviews() {
        return totalreviews;
    }

    public void setTotalreviews(Long totalreviews) {
        this.totalreviews = totalreviews;
    }

    public Double getAvgratings() {
        return avgratings;
    }

    public void setAvgratings(Double avgratings) {
        this.avgratings = avgratings;
    }
}
