package com.cmpe275.repository;

import com.cmpe275.entity.Review;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.cmpe275.utility.Reviews.ReviewsAggregateResults;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends CrudRepository<Review, Long> {

    List<Review> findAllByMovieId(Long movieId);
    <S extends Review> S save(S s);

    @Query("select new com.cmpe275.utility.Reviews.ReviewsAggregateResults(COUNT (reviewId), AVG(rating)) FROM Review where movieId=:id")
    ReviewsAggregateResults findAvgAndTotalRatingsByMovieId(@Param("id") Long id);

}
