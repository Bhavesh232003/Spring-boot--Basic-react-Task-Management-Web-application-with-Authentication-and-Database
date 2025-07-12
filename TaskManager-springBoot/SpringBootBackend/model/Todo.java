package com.example.TO_DO.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(nullable = false)
    private String task;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private Priority priority = Priority.MEDIUM;

    public enum Priority {
        HIGH, MEDIUM, LOW
    }

    
    private Boolean completed = false;
    
    @FutureOrPresent(message = "Target date must be in the present or future")
 // Update targetDate pattern to include milliseconds and 'Z'
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss[.SSS][X]", timezone = "UTC")
    private LocalDateTime targetDate;

    // Update completionDate pattern to include milliseconds and timezone
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss[.SSS][X]", timezone = "UTC")
    private LocalDateTime completionDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    
    private User user;
 
    
    
    
    public LocalDateTime getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(LocalDateTime targetDate) {
		this.targetDate = targetDate;
	}

	public LocalDateTime getCompletionDate() {
		return completionDate;
	}

	public void setCompletionDate(LocalDateTime completionDate) {
		this.completionDate = completionDate;
	}

	// Constructors
    public Todo() {}

    

	public Todo(@NotBlank String task, Boolean completed, LocalDateTime targetDate, LocalDateTime completionDate, User user) {
		super();
		this.task = task;
		this.completed = completed;
		this.targetDate = targetDate;
		this.completionDate = completionDate;
		this.user = user;
	}

	// Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}
    
    
}