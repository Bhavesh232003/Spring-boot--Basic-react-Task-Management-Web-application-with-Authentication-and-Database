package com.example.TO_DO.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.TO_DO.model.Todo;
import com.example.TO_DO.model.User;

public interface TodoRepository extends JpaRepository<Todo,Long> {
    List<Todo> findByUser(User user);
}
