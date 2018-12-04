package com.cmpe275.controller;

import com.cmpe275.entity.Review;
import com.cmpe275.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class ReviewController {

    private final ReviewService serv;

    @Autowired
    public ReviewController(ReviewService serv) {
        this.serv = serv;
    }

    @GetMapping(path = "/movie/reviews")
    public ResponseEntity<?> getReviews(@RequestParam(value = "movieId") Long id){
        return ResponseEntity.ok(serv.getReviewsByMovie(id));
    }

    @PostMapping(path = "/movie/reviews")
    public ResponseEntity<?> addReview(@RequestBody Review r){
        return ResponseEntity.ok(serv.addReview(r));
    }
    
}
