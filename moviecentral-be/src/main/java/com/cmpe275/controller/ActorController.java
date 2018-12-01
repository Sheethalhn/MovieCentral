package com.cmpe275.controller;

import com.cmpe275.service.ActorService;
import com.cmpe275.entity.Actor;
import com.cmpe275.utility.ResponseFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * @author rachitchokshi
 */
@Controller
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
public class ActorController {
    
    @Autowired
    private ActorService actorService;

    @PostMapping(path = "/actors", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Actor> AddActor(@RequestBody Actor actor) {
        ResponseFormat resp = new ResponseFormat();
        try {
            Actor newActor = actorService.addNewActor(actor);
            return ResponseEntity.ok(newActor);
        } catch (Exception e) {
            resp.setData(e);
            return new ResponseEntity(resp, HttpStatus.NO_CONTENT).noContent().build();
        }
    }

    @GetMapping(path = "/actors", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> AllActors() {
        List<Actor> actors = actorService.getAllActors();
        return ResponseEntity.ok(actors);
    }
}
