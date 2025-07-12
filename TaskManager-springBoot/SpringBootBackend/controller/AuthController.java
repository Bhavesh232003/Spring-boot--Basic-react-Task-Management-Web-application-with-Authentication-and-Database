package com.example.TO_DO.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.example.Securitydemo.jwt.LoginResponse;
import com.example.TO_DO.dto.LoginRequest;
import com.example.TO_DO.dto.LoginResponse;
import com.example.TO_DO.jwt.JwtUtils;
import com.example.TO_DO.model.User;
import com.example.TO_DO.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow all origins (you can specify specific domains)

public class AuthController {
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	JwtUtils jwtUtils;
	
	
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser( @Valid @RequestBody LoginRequest loginRequest ) {
        // Authentication handled by Spring Security
    	Authentication authentication;
		try {
			authentication = authenticationManager
					          .authenticate(new UsernamePasswordAuthenticationToken
					        		  (loginRequest.getUsername(),loginRequest.getPassword()));
		
			SecurityContextHolder.getContext().setAuthentication(authentication);
			UserDetails userDetails=(UserDetails) authentication.getPrincipal();
		
			String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);
			
//			List<String>roles=userDetails.getAuthorities()
//					.stream()
//					.map(item->item.getAuthority())
//					.collect(Collectors.toList());
//			
			
			LoginResponse response=new LoginResponse(jwtToken,userDetails.getUsername());
			return ResponseEntity.ok(response);
		
		}
		catch(AuthenticationException e) {
//			Map<String,Object> map=new HashMap<>();
//			map.put("message", "Bad Credentials");
//			map.put("status", false);
//			return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    Map.of("message", "Invalid credentials", "status", false)
            );

		}
		
		
       // return ResponseEntity.ok("Login successful");
    }
}
