package com.example.TO_DO.dto;

import java.time.LocalDateTime;
import java.util.Date;

import com.example.TO_DO.model.Todo.Priority;

public class TodoDto {
    private Long id;
    private String task;
    private boolean completed;
    private LocalDateTime targetDate;
    private LocalDateTime completionDate;
    private Priority priority;
    private String username; // Only include the username, not the entire User
    
    // Getters and Setters
    
    
    
    public Long getId() { return id; }
    public Priority getPriority() {
		return priority;
	}
	public void setPriority(Priority priority2) {
		this.priority = priority2;
	}
	public LocalDateTime getTargetDate() {
		return targetDate;
	}
	public void setTargetDate(LocalDateTime targetDate) {
		this.targetDate = targetDate;
	}
	public LocalDateTime getCompletionDate() { return completionDate; }
	public void setCompletionDate(LocalDateTime completionDate) { this.completionDate = completionDate; }
	public void setId(Long id) { this.id = id; }
    public String getTask() { return task; }
    public void setTask(String task) { this.task = task; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
