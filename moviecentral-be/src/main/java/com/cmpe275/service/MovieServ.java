package com.cmpe275.service;
import com.cmpe275.Specification.FilterCriteria;
import com.cmpe275.Specification.MovieSpecification;
import com.cmpe275.repository.MovieRepository;
import com.cmpe275.entity.Movie;
import com.cmpe275.utility.FilterValues;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
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

    

    // public void deleteMovie(Long id) {
    //     movieRepo.deleteById(id);
    // }

    public Page<Movie> getAllMovies(Pageable p){
        return movieRepo.findAll(p);
    }

    public List<Movie> getAllMovies(){
        return movieRepo.findAll();
    }

    public Movie getOneMovie(Long id) {
        return movieRepo.findByMovieId(id);
    } 


    public FilterValues GetAllFilterValues(){
        return new FilterValues(movieRepo.findDistinctGenre(),movieRepo.findDistinctYear(),movieRepo.findDistinctDirector(),
                movieRepo.findDistinctRating(),movieRepo.findDistinctStars());
    }

    public Page<Movie> getFilteredMovies(
            List<String> genres,
            List<Integer> stars,
            List<String> years,
            List<String> directors,
            List<String> ratings,
            List<String> keywords,
            Pageable p
    ){

        if(genres == null && stars == null && years == null && directors == null && ratings == null && keywords == null){
            return new PageImpl<>(Collections.emptyList());
        }
        MovieSpecification spec = new MovieSpecification(
                new FilterCriteria(
                        genres,
                        stars,
                        years,
                        directors,
                        ratings,
                        keywords
                )
        );

        return movieRepo.findAll(spec,p);
    }
}
