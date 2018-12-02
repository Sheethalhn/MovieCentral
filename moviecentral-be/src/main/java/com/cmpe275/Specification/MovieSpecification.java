package com.cmpe275.Specification;

import com.cmpe275.entity.Movie;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
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
            CriteriaBuilder.In<Integer> in = builder.in(root.get("stars").as(
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

        Predicate[] p = new Predicate[pres.size()];
        return builder.and(pres.toArray(p));
    }

}
