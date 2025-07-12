package com.example.TO_DO.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TO_DO.dto.TodoDto;
import com.example.TO_DO.model.Todo;
import com.example.TO_DO.model.Todo.Priority;
import com.example.TO_DO.model.User;
import com.example.TO_DO.repository.TodoRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    // Convert Todo entity to TodoDTO
    private TodoDto convertToDTO(Todo todo) {
        TodoDto dto = new TodoDto();
        dto.setId(todo.getId());
        dto.setTask(todo.getTask());
        dto.setTargetDate(todo.getTargetDate());
        
        if (todo.getPriority() != null) {
            dto.setPriority(todo.getPriority());
        } else {
            dto.setPriority(Priority.MEDIUM); // Fallback value
        }

        dto.setCompleted(todo.getCompleted());
        dto.setCompletionDate(todo.getCompletionDate());
        dto.setUsername(todo.getUser().getUsername()); // Only include the username
        return dto;
    }

    // Get all todos for a user as DTOs
    public List<TodoDto> getTodosByUser(User user) {
        List<Todo> todos = todoRepository.findByUser(user);
        return todos.stream()
                .map(this::convertToDTO)
                .toList();
    }

    // Create a Todo from a TodoRequest
    public TodoDto createTodo(Todo todoRequest, User user) {
        Todo todo = new Todo();
        todo.setTask(todoRequest.getTask());
        todo.setCompleted(todoRequest.getCompleted());
        todo.setTargetDate(todoRequest.getTargetDate());
        todo.setPriority(todoRequest.getPriority());
        if(todoRequest.getCompleted()) {
            todo.setCompletionDate(LocalDateTime.now());
        } else {
            todo.setCompletionDate(null);
        }
        todo.setUser(user); // Attach the authenticated user
        Todo savedTodo = todoRepository.save(todo);
        return convertToDTO(savedTodo);
    }

    // Update a Todo
    public TodoDto updateTodo(Long id, Todo todoRequest, User user) {
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        // Ensure the user owns the Todo
        if (!existingTodo.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized: You do not own this Todo");
        }

        // Update fields
        existingTodo.setTask(todoRequest.getTask());
        existingTodo.setCompleted(todoRequest.getCompleted());
        existingTodo.setTargetDate(todoRequest.getTargetDate());
        existingTodo.setPriority(todoRequest.getPriority()); // ← Ensure priority is updated

        if (todoRequest.getCompleted()) {
            existingTodo.setCompletionDate(LocalDateTime.now());
        } else {
            existingTodo.setCompletionDate(null);
        }

        Todo updatedTodo = todoRepository.save(existingTodo);
        return convertToDTO(updatedTodo);
    }

    
    public void deleteTodo(Long id, User user) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        // Ensure the user owns the Todo
        if (!todo.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized: You do not own this Todo");
        }

        todoRepository.delete(todo);
    }
    
    public List<TodoDto> searchTodos(User user, String query, String priority, Boolean completed) {
        List<Todo> todos = todoRepository.findByUser(user);

        return todos.stream()
            .filter(todo -> 
                (query == null || todo.getTask().toLowerCase().contains(query.toLowerCase())) &&
                (priority == null || (todo.getPriority() != null && todo.getPriority().name().equalsIgnoreCase(priority))) &&
                (completed == null || todo.getCompleted().equals(completed))
            )
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
}