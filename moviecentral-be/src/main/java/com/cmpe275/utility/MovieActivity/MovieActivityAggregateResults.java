package com.cmpe275.utility.MovieActivity;

public class MovieActivityAggregateResults {

	
	private String title;
    private String availability;
    private Long playCount;
    
    public MovieActivityAggregateResults(String title,String availability,Long playCount) {
        this.title = title;
        this.availability = availability;
        this.playCount = playCount;
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
    this.playCount =playCount;
    }
    
    public Long getPlayCount() {
    	return this.playCount;
    }
}
