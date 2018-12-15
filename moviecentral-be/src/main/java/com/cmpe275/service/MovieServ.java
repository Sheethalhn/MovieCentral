package com.cmpe275.service;
import com.cmpe275.Specification.FilterCriteria;
import com.cmpe275.Specification.MovieSpecification;
import com.cmpe275.repository.MovieRepository;
import com.cmpe275.entity.Movie;
import com.cmpe275.utility.Constant;
import com.cmpe275.utility.FilterValues;
import com.cmpe275.utility.MovieActivity.MovieActivityAggregateResults;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * @author rachitchokshi
 */
@Transactional(rollbackFor = Exception.class)
@Service
public class MovieServ {
    private final MovieRepository movieRepo;
    @Autowired
    public MovieServ(MovieRepository movieRepo) {
        this.movieRepo = movieRepo;
    }

    public Movie createMovie(Movie m){
        return movieRepo.save(m);
    }

    public Movie updateMovie(Movie m) {
        return movieRepo.save(m);
    }

    public Page<Movie> getAllMovies(Pageable p){
        return movieRepo.findAllByIsActiveTrue(p);
    }

    public List<Movie> getAllMovies(){
        return movieRepo.findAllByIsActiveTrue();
    }

    public Movie getOneMovie(Long id) {
        return movieRepo.findByMovieId(id);
    } 


    public FilterValues GetAllFilterValues(){
        return new FilterValues(movieRepo.findDistinctGenre(),movieRepo.findDistinctYear(),movieRepo.findDistinctDirector(),
                movieRepo.findDistinctRating(),movieRepo.findDistinctStars(),movieRepo.findDistinctActors());
    }

    public Page<Movie> getFilteredMovies(
            List<String> genres,
            List<Integer> stars,
            List<String> years,
            List<String> directors,
            List<String> ratings,
            List<String> keywords,
            List<String> actors,
            Pageable p
    ){

        if(genres == null && stars == null && years == null && directors == null && ratings == null && keywords == null && actors == null){
            return new PageImpl<>(Collections.emptyList());
        }
        MovieSpecification spec = new MovieSpecification(
                new FilterCriteria(
                        genres,
                        stars,
                        years,
                        directors,
                        ratings,
                        keywords,
                        actors
                )
        );

        return movieRepo.findAll(spec,p);
    }
    
    public List<MovieActivityAggregateResults> getTopMoviesBasedOnTime(String timeDef) {
        Calendar currentCal = Calendar.getInstance();
        Date currentDate = currentCal.getTime(); 
        Calendar cal = Calendar.getInstance();
        Date previousDate;
        if (timeDef.equals(Constant.LAST_24_HOURS)) {
            cal.setTime(currentDate);
            cal.add(Calendar.HOUR, -24);
        } else if (timeDef.equals(Constant.LAST_MONTH)) {
            cal.setTime(currentDate);
            cal.add(Calendar.MONTH, -1);
        } else if (timeDef.equals(Constant.LAST_WEEK)) {
            cal.setTime(currentDate);
            cal.add(Calendar.WEEK_OF_YEAR, -1);
        }
        previousDate = cal.getTime();
        List<MovieActivityAggregateResults> topMovies = movieRepo.getTopMoviesBasedOnTime(previousDate, currentDate,PageRequest.of(0, 10));
        return topMovies;
    }
    
    public List<MovieActivityAggregateResults> getAllMoviesBasedOnTime(String timeDef) {
        Calendar currentCal = Calendar.getInstance();
        Date currentDate = currentCal.getTime(); 
        Calendar cal = Calendar.getInstance();
        Date previousDate;
        if (timeDef.equals(Constant.LAST_24_HOURS)) {
            cal.setTime(currentDate);
            cal.add(Calendar.HOUR, -24);
        } else if (timeDef.equals(Constant.LAST_MONTH)) {
            cal.setTime(currentDate);
            cal.add(Calendar.MONTH, -1);
        } else if (timeDef.equals(Constant.LAST_WEEK)) {
            cal.setTime(currentDate);
            cal.add(Calendar.WEEK_OF_YEAR, -1);
        }
        previousDate = cal.getTime();
        List<MovieActivityAggregateResults> allMovies = movieRepo.getAllMoviesBasedOnTime(previousDate, currentDate);
        return allMovies;
    }

    public List<Movie> getTopRatedMovies(){
        return movieRepo.findTop10ByIsActiveTrueOrderByAvgratingsDesc();
    }

}
