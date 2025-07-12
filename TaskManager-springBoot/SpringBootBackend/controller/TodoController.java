package com.example.TO_DO.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.TO_DO.dto.TodoDto;
import com.example.TO_DO.model.Todo;
import com.example.TO_DO.model.User;
import com.example.TO_DO.service.TodoService;
import com.example.TO_DO.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "*") // Allow all origins (you can specify specific domains)

public class TodoController {
    @Autowired
    private TodoService todoService;

    @Autowired
    private UserService userService;

    // Get all todos for the authenticated user
    @GetMapping
    public ResponseEntity<List<TodoDto>> getTodos() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(todoService.getTodosByUser(user));
    }

    // Create a new todo
    @PostMapping
    public ResponseEntity<TodoDto> addTodo(@Valid @RequestBody Todo todoRequest, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(todoService.createTodo(todoRequest, user));
    }

    // Update a todo
    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(
            @PathVariable Long id,
            @RequestBody Todo todoRequest
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(todoService.updateTodo(id, todoRequest, user));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        todoService.deleteTodo(id, user);
        return ResponseEntity.noContent().build(); // Return 204 No Content
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<TodoDto>> searchTodos(
        @RequestParam(required = false) String query,
        @RequestParam(required = false) String priority,
        @RequestParam(required = false) Boolean completed,
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<TodoDto> todos = todoService.searchTodos(user, query, priority, completed);
        return ResponseEntity.ok(todos);
    }

    

}