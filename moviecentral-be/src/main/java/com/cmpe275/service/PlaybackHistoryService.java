/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.service;

import com.cmpe275.entity.Movie;
import com.cmpe275.entity.PlaybackHistory;
import com.cmpe275.entity.User;
import com.cmpe275.repository.PlaybackHistoryRepository;
import com.cmpe275.utility.MovieActivity.MovieActivityAggregateResults;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

/**
 *
 * @author Shreya Shah
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class PlaybackHistoryService {

    @Autowired
    private PlaybackHistoryRepository playbackHistoryRepository;

    public PlaybackHistory addPlaybackHistory(PlaybackHistory playbackHistory) {

        PlaybackHistory playbackHistoryObj = null;
        Calendar currentCal = Calendar.getInstance();
        Date currentDate = currentCal.getTime();
        Calendar cal = Calendar.getInstance();
        cal.setTime(currentDate);
        cal.add(Calendar.HOUR, -24);
        Date previousDate = cal.getTime();
        List<PlaybackHistory> playbackHistorys = playbackHistoryRepository.getAllPlayBackHistoryByUserByTime(previousDate, currentDate, playbackHistory.getUserObj(), playbackHistory.getMovieObj());
        if (CollectionUtils.isEmpty(playbackHistorys)) {
            playbackHistoryObj = playbackHistoryRepository.save(playbackHistory);
        }
        return playbackHistoryObj;
    }

    public List<MovieActivityAggregateResults> getAllPaybackHistoryByUser(User user) {
        List<MovieActivityAggregateResults> playbackHistorys = playbackHistoryRepository.getAllPaybackHistoryByUser(user);
        return playbackHistorys;
    }

    public Boolean hasWacthed(Movie m, User u){
        long count = playbackHistoryRepository.countAllByMovieObjAndUserObj(m,u);
        if(count > 0){
            return true;
        }else{
            return false;
        }
    }

    public List<Movie> getMostWatchedMovies() {
        return playbackHistoryRepository.getMostWatchedMovies(PageRequest.of(0, 10)).getContent();
    }

}
