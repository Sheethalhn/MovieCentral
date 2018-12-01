package com.cmpe275.controller;

import com.cmpe275.service.MovieServ;
import com.cmpe275.entity.Movie;
import com.cmpe275.utility.ResponseFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;


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

    // @PostMapping(path = "/movie", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    // public ResponseEntity<Movie> Create(@RequestBody Movie m){
    //     ResponseFormat resp = new ResponseFormat();
    //     try{
    //         Movie result = movieService.createMovie(m);
    //         resp.setData(result);

    //         URI location  = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
    //                         .buildAndExpand(result.getMovieId()).toUri();
    //         return new ResponseEntity(resp, HttpStatus.CREATED).created(location).build();
    //     }catch (Exception e){
    //         resp.setData(e);
    //         return new ResponseEntity(resp, HttpStatus.NO_CONTENT).noContent().build();
    //     }
    // }

    @PostMapping(path = "/movie", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        ResponseFormat resp = new ResponseFormat();
        try {
            Movie newMovie = movieService.createMovie(movie);
            return ResponseEntity.ok(newMovie);
        } catch (Exception e) {
            resp.setData(e);
            return new ResponseEntity(resp, HttpStatus.NO_CONTENT).noContent().build();
        }
    }

    @GetMapping(path = "/allmovies", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> GetAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        return ResponseEntity.ok(movies);
    }

    @GetMapping(path = "/movie")
    public HttpEntity<PagedResources<Movie>> GetAllMovies(Pageable p, PagedResourcesAssembler assembler) {
        return new ResponseEntity<>(assembler.toResource(movieService.getAllMovies(p)),HttpStatus.OK);
    }

    @GetMapping(path = "/movie/filters")
    public ResponseEntity<?> GetAllFilterValues(){
        return ResponseEntity.ok(movieService.GetAllFilterValues());
    }

}
