package com.cmpe275.repository;

import com.cmpe275.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
}