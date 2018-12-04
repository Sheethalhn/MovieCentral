package com.cmpe275.repository;

import com.cmpe275.entity.Review;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewRepository extends CrudRepository<Review, Long> {

    List<Review> findAllByMovieId(Long movieId);
    <S extends Review> S save(S s);

}
