package com.cmpe275.controller;

import com.cmpe275.entity.Actor;
import com.cmpe275.service.ActorService;
import com.cmpe275.service.MovieServ;
import com.cmpe275.entity.Movie;
import com.cmpe275.utility.ResponseFormat;
import com.cmpe275.utility.MovieActivity.MovieActivityAggregateResults;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


/**
 * @author rachitchokshi
 */
@Controller
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class MovieController {
    private final MovieServ movieService;
    private final ActorService actorService;

    @Autowired
    public MovieController(MovieServ movieService, ActorService a) {
        this.movieService = movieService; this.actorService = a;
    }

    @PostMapping(path = "/movie", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addMovie(@RequestBody Movie movie) {
        try {
            Movie newMovie = movieService.createMovie(movie);
            return new ResponseEntity<Movie>(newMovie, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path = "/movie/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateMovie(@RequestBody Movie movie, @PathVariable Long id) {
        ResponseFormat resp = new ResponseFormat();
        try {
            Movie updatedMovie = movieService.updateMovie(movie);
            return new ResponseEntity<Movie>(updatedMovie, HttpStatus.OK);
        } catch (Exception e) {
            resp.setData(e);
            return new ResponseEntity<String>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(path="/movie/{id}")
    public ResponseEntity<?> updateIsActive(@PathVariable Long id) {
        try {
            Movie m = movieService.getOneMovie(id);
            m.setIsActive(false);
            Movie updatedMovie = movieService.updateMovie(m);
            return new ResponseEntity<Movie>(updatedMovie, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<String>(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/allmovies", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> GetAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        return ResponseEntity.ok(movies);
    }

    @GetMapping(path="/movies/{id}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Movie> getOneMovie(@PathVariable Long id) {
        Movie movie = movieService.getOneMovie(id);
        return new ResponseEntity<Movie>(movie, HttpStatus.OK);
    }

    @GetMapping(path = "/movie")
    @SuppressWarnings("unchecked")
    public HttpEntity<PagedResources<Movie>> GetAllMovies(Pageable p, PagedResourcesAssembler assembler) {
        return new ResponseEntity<>(assembler.toResource(movieService.getAllMovies(p)),HttpStatus.OK);
    }

    @GetMapping(path = "/movie/filters")
    public ResponseEntity<?> GetAllFilterValues(){
        return ResponseEntity.ok(movieService.GetAllFilterValues());
    }

    @GetMapping(path = "/movie/filters/execute")
    @SuppressWarnings("unchecked")
    public HttpEntity<PagedResources<Movie>> GetFilteredMovies(
            Pageable p, PagedResourcesAssembler assembler,
            @RequestParam(value = "genre", required = false) List<String> genres,
            @RequestParam(value = "stars", required = false) List<Integer> stars,
            @RequestParam(value = "year", required = false) List<String> years,
            @RequestParam(value = "director", required = false) List<String> directors,
            @RequestParam(value = "rating", required = false) List<String> ratings,
            @RequestParam(value = "keyword", required = false) List<String> keywords,
            @RequestParam(value = "actors", required = false) List<String> actors)
    {

        return new ResponseEntity<>(assembler.toResource(movieService.getFilteredMovies(
                genres,
                stars,
                years,
                directors,
                ratings,
                keywords,
                actors,
                p
        )),HttpStatus.OK);
    }
    
    @GetMapping(path = "/movies/topactivity/{time}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTopMoviesBasedOnTime(@PathVariable String time) {
    	ResponseFormat responseObject = new ResponseFormat();
    	List<MovieActivityAggregateResults> topMovies = movieService.getTopMoviesBasedOnTime(time);
        if (!CollectionUtils.isEmpty(topMovies)) {
        	System.out.println(topMovies);
            responseObject.setData(topMovies);
            responseObject.setMeta("Movies retrieved successfully.");
            return new ResponseEntity(responseObject, HttpStatus.OK);
        } else {
            responseObject.setData(null);
            responseObject.setMeta("No Movies found");
            return new ResponseEntity(responseObject, HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping(path = "/movies/allactivity/{time}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllMoviesBasedOnTime(@PathVariable String time) {
    	ResponseFormat responseObject = new ResponseFormat();
    	List<MovieActivityAggregateResults> allMovies = movieService.getAllMoviesBasedOnTime(time);
        if (!CollectionUtils.isEmpty(allMovies)) {
        	System.out.println(allMovies);
            responseObject.setData(allMovies);
            responseObject.setMeta("Movies retrieved successfully.");
            return new ResponseEntity(responseObject, HttpStatus.OK);
        } else {
            responseObject.setData(null);
            responseObject.setMeta("No Movies found");
            return new ResponseEntity(responseObject, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/movies/toprated")
    public ResponseEntity<?> getToprated(){
        return ResponseEntity.ok(movieService.getTopRatedMovies());
    }
}
