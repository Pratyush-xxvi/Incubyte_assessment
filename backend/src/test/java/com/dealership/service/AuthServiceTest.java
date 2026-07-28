package com.dealership.service;

import com.dealership.dto.AuthRequest;
import com.dealership.dto.AuthResponse;
import com.dealership.dto.RegisterRequest;
import com.dealership.exception.BadRequestException;
import com.dealership.model.Role;
import com.dealership.model.User;
import com.dealership.repository.UserRepository;
import com.dealership.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider tokenProvider;

    @InjectMocks
    private AuthService authService;

    private RegisterRequest registerRequest;
    private AuthRequest authRequest;
    private User mockUser;
    private Authentication mockAuthentication;

    @BeforeEach
    void setUp() {
        registerRequest = RegisterRequest.builder()
                .username("testuser")
                .email("test@example.com")
                .password("password123")
                .role(Role.ROLE_CUSTOMER)
                .build();

        authRequest = AuthRequest.builder()
                .username("testuser")
                .password("password123")
                .build();

        mockUser = User.builder()
                .id(1L)
                .username("testuser")
                .email("test@example.com")
                .password("encoded_password")
                .role(Role.ROLE_CUSTOMER)
                .build();

        mockAuthentication = mock(Authentication.class);
    }

    @Test
    @DisplayName("Should successfully register a new user")
    void register_Success() {
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encoded_password");
        when(userRepository.save(any(User.class))).thenReturn(mockUser);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(mockAuthentication);
        when(tokenProvider.generateToken(mockAuthentication)).thenReturn("jwt_mock_token");

        AuthResponse response = authService.register(registerRequest);

        assertNotNull(response);
        assertEquals("jwt_mock_token", response.getToken());
        assertEquals("testuser", response.getUsername());
        assertEquals(Role.ROLE_CUSTOMER, response.getRole());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("Should throw BadRequestException when registering duplicate username")
    void register_DuplicateUsername_ThrowsException() {
        when(userRepository.existsByUsername("testuser")).thenReturn(true);

        assertThrows(BadRequestException.class, () -> authService.register(registerRequest));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("Should successfully login user and return JWT token")
    void login_Success() {
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(mockAuthentication);
        when(tokenProvider.generateToken(mockAuthentication)).thenReturn("jwt_mock_token");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(mockUser));

        AuthResponse response = authService.login(authRequest);

        assertNotNull(response);
        assertEquals("jwt_mock_token", response.getToken());
        assertEquals("testuser", response.getUsername());
    }
}
