package com.cmpe275.Specification;

import com.cmpe275.entity.Actor;
import com.cmpe275.entity.Movie;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MovieSpecification implements Specification<Movie> {
    private FilterCriteria criteria;

    public MovieSpecification(FilterCriteria criteria){
        this.criteria = criteria;
    }

    @Override
    public Predicate toPredicate
            (Root<Movie> root, CriteriaQuery<?> query, CriteriaBuilder builder)
    {
        List<Predicate> pres = new ArrayList<Predicate>();

        if (criteria.getGenres() != null && !criteria.getGenres().isEmpty()) {
            CriteriaBuilder.In<String> in = builder.in(root.get("genre").as(
                    String.class));
            for (String genre : criteria.getGenres()) {
                in.value(genre);
            }
            pres.add(in);
        }

        if (criteria.getDirectors() != null && !criteria.getDirectors().isEmpty()) {
            CriteriaBuilder.In<String> in = builder.in(root.get("director").as(
                    String.class));
            for (String director : criteria.getDirectors()) {
                in.value(director);
            }
            pres.add(in);
        }

        if (criteria.getRatings() != null && !criteria.getRatings().isEmpty()) {
            CriteriaBuilder.In<String> in = builder.in(root.get("rating").as(
                    String.class));
            for (String rating : criteria.getRatings()) {
                in.value(rating);
            }
            pres.add(in);
        }

        if (criteria.getStars() != null && !criteria.getStars().isEmpty()) {
            CriteriaBuilder.In<Integer> in = builder.in(root.get("avgratings").as(
                    Integer.class));
            for (Integer star : criteria.getStars()) {
                in.value(star);
            }
            pres.add(in);
        }

        if (criteria.getYears() != null && !criteria.getYears().isEmpty()) {
            CriteriaBuilder.In<String> in = builder.in(root.get("year").as(
                    String.class));
            for (String year : criteria.getYears()) {
                in.value(year);
            }
            pres.add(in);
        }

        if (criteria.getActors() != null && !criteria.getActors().isEmpty()) {
            Join a = root.join("actors");
            CriteriaBuilder.In in = builder.in(a.get("name").as(String.class));
            for (String actor : criteria.getActors()) {
                in.value(actor);
            }
            pres.add(in);
        }

        //If a movie is returned in the search result, every word is the keywords must match at least one attribute of this movie
        if (criteria.getKeywords() != null && !criteria.getKeywords().isEmpty()) {
            for(String keyword: criteria.getKeywords()){
                pres.add(
                        builder.or(
                                builder.like(
                                        builder.lower(root.get("title")),"%" + keyword.toLowerCase() + "%"
                                ),
                                builder.like(
                                        builder.lower(root.get("genre")),"%" + keyword.toLowerCase() + "%"
                                ),
                                builder.like(
                                        builder.lower(root.get("year")),"%" + keyword.toLowerCase() + "%"
                                ),
                                builder.like(
                                        builder.lower(root.get("studio")),"%" + keyword.toLowerCase() + "%"
                                ),
                                builder.like(
                                        builder.lower(root.get("synopsis")),"%" + keyword.toLowerCase() + "%"
                                ),
                                builder.like(
                                        builder.lower(root.get("director")),"%" + keyword.toLowerCase() + "%"
                                ),
                                builder.like(
                                        builder.lower(root.get("country")),"%" + keyword.toLowerCase() + "%"
                                ),
                                builder.like(
                                        builder.lower(root.get("rating")),"%" + keyword.toLowerCase() + "%"
                                ),
                                builder.like(
                                        builder.lower(root.get("availability")),"%" + keyword.toLowerCase() + "%"
                                ),
                                builder.like(
                                        builder.lower(root.get("synopsis")),"%" + keyword.toLowerCase() + "%"
                                ),
                                builder.like(
                                        builder.lower(root.join("actors").get("name")),"%" + keyword.toLowerCase() + "%"
                                )
                        )
                );
            }
        }
        pres.add(builder.isTrue(root.get("isActive")));
        Predicate[] p = new Predicate[pres.size()];
        return builder.and(pres.toArray(p));
    }

}
