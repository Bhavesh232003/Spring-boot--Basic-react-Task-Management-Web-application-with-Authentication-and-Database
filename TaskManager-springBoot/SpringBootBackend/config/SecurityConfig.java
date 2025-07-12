package com.example.TO_DO.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.TO_DO.jwt.AuthEntryPointJwt;
import com.example.TO_DO.jwt.AuthTokenFilter;

@Configuration
@EnableWebSecurity
@CrossOrigin(origins = "*") // Allow all origins (you can specify specific domains)

public class SecurityConfig {
	
	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;
	
    @Autowired
    @Lazy
    private AuthTokenFilter authTokenFilter; // Autowire the filter
	

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    	http.authorizeHttpRequests((requests)->requests.requestMatchers("/h2-console/**").permitAll()
				.requestMatchers("/api/auth/signup/**").permitAll()
				.requestMatchers("/api/auth/login/**").permitAll()
				.anyRequest()
				.authenticated());
		http.sessionManagement((session)
				->session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED));
		
	http.exceptionHandling(exception->exception.authenticationEntryPoint(unauthorizedHandler));
	
	// http.formLogin(withDefaults());
	 
		http.headers(headers->headers.frameOptions(frame->frame.sameOrigin()));
		http.csrf(csrf->csrf.disable());
		http.addFilterBefore(authTokenFilter,UsernamePasswordAuthenticationFilter.class );
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

		//http.httpBasic(withDefaults());
		return http.build();
    
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173l"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
    @Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
		return builder.getAuthenticationManager();
	}

}
