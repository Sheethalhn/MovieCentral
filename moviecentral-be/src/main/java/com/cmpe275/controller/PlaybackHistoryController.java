/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.controller;

import com.cmpe275.entity.PlaybackHistory;
import com.cmpe275.service.PlaybackHistoryService;
import com.cmpe275.utility.ResponseFormat;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author Shreya Shah
 */
@Controller
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class PlaybackHistoryController {

    @Autowired
    private PlaybackHistoryService playbackHistoryService;

    ResponseFormat responseObject = new ResponseFormat();

    @PostMapping(path = "/playbackhistory", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createPlaybackHistory(@RequestBody PlaybackHistory playbackHistory, HttpSession session) {
        try {
            PlaybackHistory playbackHistoryObj = playbackHistoryService.addPlaybackHistory(playbackHistory);
            if (playbackHistoryObj != null) {
                responseObject.setData(playbackHistoryObj);
                responseObject.setMeta("User Plays recorded succesfully");
                return new ResponseEntity(responseObject, HttpStatus.OK);
            } else {
                responseObject.setData(null);
                responseObject.setMeta("User Already Played Movie within 24 hrs");
                return new ResponseEntity(responseObject, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            responseObject.setData(e);
            return new ResponseEntity(responseObject, HttpStatus.NO_CONTENT);
        }
    }
}
