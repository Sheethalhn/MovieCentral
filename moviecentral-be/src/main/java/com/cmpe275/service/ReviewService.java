package com.cmpe275.service;

import com.cmpe275.entity.Review;
import com.cmpe275.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository repo;

    @Autowired
    public ReviewService(ReviewRepository repo) {
        this.repo = repo;
    }

    public List<Review> getReviewsByMovie(Long id){
        return repo.findAllByMovieId(id);
    }

    public Review addReview(Review r){
        return repo.save(r);
    }
}
