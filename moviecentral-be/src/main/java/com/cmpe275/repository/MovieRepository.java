package com.cmpe275.repository;

import com.cmpe275.entity.Movie;
import com.cmpe275.entity.User;
import com.cmpe275.utility.MovieActivity.MovieActivityAggregateResults;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

/**
 * Movie JPA Repository for movie related operations in database
 *
 * @author Rachit Chokshi
 */
public interface MovieRepository extends PagingAndSortingRepository<Movie,Long>, JpaSpecificationExecutor<Movie> {
    Movie findByMovieId(Long id);

    @Override
    Page<Movie> findAll(Pageable pageable);

    @Override
    List<Movie> findAll();
    <S extends Movie> S save(S s);

    //for getting possible filter values
    @Query("select distinct genre from Movie  where genre is not null")
    List<String> findDistinctGenre();

    @Query("select distinct year from Movie  where year is not null")
    List<String> findDistinctYear();

    /*
TODO: Actor field with relationships
@Query("select distinct actors from movie")
List<Movie> findDistinctActors();
*/

    @Query(value = "select distinct director from Movie where director is not null")
    List<String> findDistinctDirector();

    @Query(value = "select distinct rating from Movie  where rating is not null")
    List<String> findDistinctRating();

    @Query(value = "select distinct stars from Movie  where stars is not null")
    List<Integer> findDistinctStars();
    
    @Query(value = "SELECT  new com.cmpe275.utility.MovieActivity.MovieActivityAggregateResults(m.title,m.availability,COUNT (ph.movieObj)) from"
            + " PlaybackHistory as ph  JOIN Movie m on m.movieId=ph.movieObj where ph.timestamp >= :previousDate and ph.timestamp <= :currentDate"
            + " group by ph.movieObj order by count(ph.movieObj) desc")
    List<MovieActivityAggregateResults> getTopMoviesBasedOnTime(@Param("previousDate") Date previousDate, @Param("currentDate") Date currentDate,Pageable pageable);

    @Query(value = "SELECT  new com.cmpe275.utility.MovieActivity.MovieActivityAggregateResults(m.title,m.availability,COUNT (ph.movieObj)) from"
            + " PlaybackHistory as ph  JOIN Movie m on m.movieId=ph.movieObj where ph.timestamp >= :previousDate and ph.timestamp <= :currentDate"
            + " group by ph.movieObj order by m.title desc")
    List<MovieActivityAggregateResults> getAllMoviesBasedOnTime(@Param("previousDate") Date previousDate, @Param("currentDate") Date currentDate);

}