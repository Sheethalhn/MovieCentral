package com.cmpe275.service;

import com.cmpe275.entity.Review;
import com.cmpe275.repository.ReviewRepository;
import com.cmpe275.utility.Reviews.AggregatesAndReviewsByMovieId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
public class ReviewService {

    private final ReviewRepository repo;

    @Autowired
    public ReviewService(ReviewRepository repo) {
        this.repo = repo;
    }

    public AggregatesAndReviewsByMovieId getReviewsByMovie(Long id){
        AggregatesAndReviewsByMovieId t = new AggregatesAndReviewsByMovieId();
        t.setAggregates(repo.findAvgAndTotalRatingsByMovieId(id));
        t.setData(repo.findAllByMovieId(id));
        return t;
    }

    public Review addReview(Review r){
        return repo.save(r);
    }
}
