package com.dealership.config;

import com.dealership.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // Public APIs
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()

                        // =========================
                        // ORDER APIs
                        // =========================

                        // Customer/Admin can place order
                        .requestMatchers(HttpMethod.POST, "/api/orders")
                        .hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")

                        // Customer/Admin can view own orders
                        .requestMatchers(HttpMethod.GET, "/api/orders/my")
                        .hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")

                        // Only Admin can view all orders
                        .requestMatchers(HttpMethod.GET, "/api/orders")
                        .hasAuthority("ROLE_ADMIN")

                        // Only Admin can approve/reject
                        .requestMatchers(HttpMethod.PUT, "/api/orders/*/approve")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/api/orders/*/reject")
                        .hasAuthority("ROLE_ADMIN")

                        // =========================
                        // VEHICLE APIs
                        // =========================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/vehicles",
                                "/api/vehicles/search",
                                "/api/vehicles/*"
                        ).hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/vehicles/*/purchase")
                        .hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/vehicles/*/restock")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/vehicles")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/api/vehicles/*")
                        .hasAuthority("ROLE_ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/api/vehicles/*")
                        .hasAuthority("ROLE_ADMIN")

                        .anyRequest()
                        .authenticated()
                )

                .headers(headers ->
                        headers.frameOptions(frame -> frame.disable()));

        http.addFilterBefore(jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}