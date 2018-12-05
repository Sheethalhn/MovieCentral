/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.repository;

import com.cmpe275.entity.PlaybackHistory;
import com.cmpe275.entity.User;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Shreya Shah
 */
@Repository
public interface PlaybackHistoryRepository extends CrudRepository<PlaybackHistory, Long> {

    @Override
    <S extends PlaybackHistory> S save(S s);

    @Query(value = "SELECT ph FROM PlaybackHistory as ph where ph.timestamp >= :previousDate and ph.timestamp <= :currentDate and ph.userObj = :userId AND ph.movieObj = :movieId")
    public List<PlaybackHistory> getAllPlayBackHistoryByUserByTime(@Param("previousDate") Date previousDate, @Param("currentDate") Date currentDate, @Param("userId") Long userId, @Param("movieId") Long movieId);

}