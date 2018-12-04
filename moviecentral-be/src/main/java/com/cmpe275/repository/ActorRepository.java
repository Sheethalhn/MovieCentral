package com.cmpe275.repository;

import com.cmpe275.entity.Actor;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

/**
 * Actor JPA Repository for actor related operations in database
 *
 * @author Tarun Arora
 */
public interface ActorRepository extends CrudRepository<Actor, Long> {
    List<Actor> findAll();
}
