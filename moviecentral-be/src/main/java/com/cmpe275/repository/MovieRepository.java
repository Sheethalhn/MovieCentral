package com.cmpe275.repository;

import com.cmpe275.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * Movie JPA Repository for movie related operations in database
 *
 * @author Rachit Chokshi
 */
public interface MovieRepository extends PagingAndSortingRepository<Movie,Long> {
    Movie findByMovieId(Long id);

    @Override
    Page<Movie> findAll(Pageable pageable);

    @Override
    List<Movie> findAll();
    <S extends Movie> S save(S s);

    //for getting possible filter values
    @Query("select distinct genre from Movie")
    List<String> findDistinctGenre();

    @Query("select distinct year from Movie ")
    List<String> findDistinctYear();

    /*
TODO: Actor field with relationships
@Query("select distinct actors from movie")
List<Movie> findDistinctActors();
*/

    @Query(value = "select distinct director from Movie ")
    List<String> findDistinctDirector();

    @Query(value = "select distinct rating from Movie ")
    List<String> findDistinctRating();

    @Query(value = "select distinct stars from Movie ")
    List<Integer> findDistinctStars();
}