package com.cmpe275.service;
import com.cmpe275.repository.MovieRepository;
import com.cmpe275.entity.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author rachitchokshi
 */
@Service
public class MovieServ {
    final MovieRepository movieRepo;

    @Autowired
    public MovieServ(MovieRepository movieRepo) {
        this.movieRepo = movieRepo;
    }

    public Movie createMovie(Movie m){
        return movieRepo.save(m);
    }

    public List<Movie> getAllMovies(){
        return movieRepo.findAll();
    }
}
