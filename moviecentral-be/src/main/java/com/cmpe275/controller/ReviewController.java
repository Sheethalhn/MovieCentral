package com.cmpe275.controller;

import com.cmpe275.entity.Review;
import com.cmpe275.entity.User;
import com.cmpe275.service.ReviewService;
import com.cmpe275.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;


@Controller
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class ReviewController {
    private final
    HttpSession session;
    private final ReviewService serv;
    private final UserService userServ;

    @Autowired
    public ReviewController(ReviewService serv, UserService userServ,HttpSession session) {
        this.serv = serv;
        this.session = session;
        this.userServ = userServ;
    }

    @GetMapping(path = "/movie/reviews")
    public ResponseEntity<?> getReviews(@RequestParam(value = "movieId") Long id){
        return ResponseEntity.ok(serv.getReviewsByMovie(id));
    }

    @PostMapping(path = "/movie/reviews")
    public ResponseEntity<?> addReview(@RequestBody Review r){
        Long id = (Long)session.getAttribute("userId");

        if(id == null){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("401");
        }
        r.setUser(userServ.getUserById(id));
        return ResponseEntity.ok(serv.addReview(r));
    }
    
}
