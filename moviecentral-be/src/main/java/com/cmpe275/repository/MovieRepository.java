package com.cmpe275.repository;

import com.cmpe275.entity.Movie;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Movie JPA Repository for movie related operations in database
 *
 * @author Rachit Chokshi
 */
public interface MovieRepository extends CrudRepository<Movie,Long>{
    Movie findByMovieId(Long id);

    @Override
    List<Movie> findAll();

    @Override
    <S extends Movie> S save(S s);
}