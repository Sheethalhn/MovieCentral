package com.cmpe275.controller;

import com.cmpe275.service.MovieServ;
import com.cmpe275.entity.Movie;
import com.cmpe275.utility.ResponseFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import java.awt.*;
import java.net.URI;

/**
 * @author rachitchokshi
 */
@Controller
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class MovieController {
    private final MovieServ movieService;

    @Autowired
    public MovieController(MovieServ movieService) {
        this.movieService = movieService;
    }

    @PostMapping(path = "/movie", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> Create(@RequestBody Movie m){
        ResponseFormat resp = new ResponseFormat();
        try{
            Movie result = movieService.createMovie(m);
            resp.setData(result);

            URI location  = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                            .buildAndExpand(result.getMovieId()).toUri();
            return new ResponseEntity(resp, HttpStatus.CREATED).created(location).build();
        }catch (Exception e){
            resp.setData(e);
            return new ResponseEntity(resp, HttpStatus.NO_CONTENT).noContent().build();
        }
    }

    @GetMapping(path = "/movie", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> AllMovies(){
        ResponseFormat resp = new ResponseFormat();
        resp.setData(movieService.getAllMovies());
        return new ResponseEntity(resp, HttpStatus.OK);
    }
}
