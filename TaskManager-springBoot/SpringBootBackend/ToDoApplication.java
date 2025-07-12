package com.example.TO_DO;

import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class ToDoApplication {
    
    @PostConstruct
    public void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC")); // Set default time zone to UTC
    }

	
	public static void main(String[] args) {
		SpringApplication.run(ToDoApplication.class, args);
	}

}
