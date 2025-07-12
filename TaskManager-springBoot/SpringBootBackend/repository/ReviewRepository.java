package com.example.TO_DO.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.TO_DO.model.Review;


public interface ReviewRepository extends JpaRepository<Review, Long> {
}
