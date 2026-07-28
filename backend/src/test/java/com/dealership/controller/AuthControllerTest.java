package com.dealership.controller;

import com.dealership.dto.AuthRequest;
import com.dealership.dto.AuthResponse;
import com.dealership.dto.RegisterRequest;
import com.dealership.model.Role;
import com.dealership.security.JwtTokenProvider;
import com.dealership.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @Test
    @DisplayName("POST /api/auth/register should create user and return 201 CREATED")
    void register_Success_Returns201() throws Exception {
        RegisterRequest registerRequest = RegisterRequest.builder()
                .username("newuser")
                .email("new@example.com")
                .password("password123")
                .role(Role.ROLE_CUSTOMER)
                .build();

        AuthResponse authResponse = AuthResponse.builder()
                .token("mock_jwt_token")
                .tokenType("Bearer")
                .id(1L)
                .username("newuser")
                .email("new@example.com")
                .role(Role.ROLE_CUSTOMER)
                .build();

        when(authService.register(any(RegisterRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.username").value("newuser"))
                .andExpect(jsonPath("$.data.token").value("mock_jwt_token"));
    }

    @Test
    @DisplayName("POST /api/auth/login should authenticate user and return 200 OK")
    void login_Success_Returns200() throws Exception {
        AuthRequest authRequest = AuthRequest.builder()
                .username("admin")
                .password("admin123")
                .build();

        AuthResponse authResponse = AuthResponse.builder()
                .token("mock_admin_token")
                .tokenType("Bearer")
                .id(1L)
                .username("admin")
                .email("admin@dealership.com")
                .role(Role.ROLE_ADMIN)
                .build();

        when(authService.login(any(AuthRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.username").value("admin"))
                .andExpect(jsonPath("$.data.role").value("ROLE_ADMIN"));
    }
}
