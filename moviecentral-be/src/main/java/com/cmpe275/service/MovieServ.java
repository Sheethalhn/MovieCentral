package com.cmpe275.service;
import com.cmpe275.Specification.FilterCriteria;
import com.cmpe275.Specification.MovieSpecification;
import com.cmpe275.repository.MovieRepository;
import com.cmpe275.entity.Movie;
import com.cmpe275.utility.FilterValues;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Page<Movie> getAllMovies(Pageable p){
        return movieRepo.findAll(p);
    }

    public List<Movie> getAllMovies(){
        return movieRepo.findAll();
    }


    public FilterValues GetAllFilterValues(){
        return new FilterValues(movieRepo.findDistinctGenre(),movieRepo.findDistinctYear(),movieRepo.findDistinctDirector(),
                movieRepo.findDistinctRating(),movieRepo.findDistinctStars());
    }

    public List<Movie> getFilteredMovies(
            List<String> genres,
            List<Integer> stars,
            List<String> years,
            List<String> directors,
            List<String> ratings
    ){
        MovieSpecification spec = new MovieSpecification(
                new FilterCriteria(
                        genres,
                        stars,
                        years,
                        directors,
                        ratings
                )
        );

        return movieRepo.findAll(spec);
    }
}
