package com.cmpe275.service;

import com.cmpe275.repository.ActorRepository;
import com.cmpe275.entity.Actor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Tarun Arora
 */
@Transactional(rollbackFor = Exception.class)
@Service
public class ActorService {
    @Autowired
    private ActorRepository actorRepo;

    public Actor addNewActor(Actor actor) {
        return actorRepo.save(actor);
    }

    public List<Actor> getAllActors() {
        return actorRepo.findAll();
    }

    public List<Actor> getActorByName(String name){
        return actorRepo.findAllByNameEquals(name);
    }
}
