package com.dealership.controller;

import com.dealership.dto.PurchaseRequest;
import com.dealership.dto.RestockRequest;
import com.dealership.dto.VehicleDto;
import com.dealership.security.JwtTokenProvider;
import com.dealership.service.VehicleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class VehicleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private VehicleService vehicleService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    private VehicleDto sampleVehicle;

    @BeforeEach
    void setUp() {
        sampleVehicle = VehicleDto.builder()
                .id(1L)
                .make("Porsche")
                .model("911 GT3")
                .category("Sports")
                .price(new BigDecimal("180000.00"))
                .quantity(3)
                .year(2024)
                .build();
    }

    @Test
    @WithMockUser(authorities = {"ROLE_CUSTOMER"})
    @DisplayName("GET /api/vehicles should return list of vehicles")
    void getAllVehicles_CustomerRole_ReturnsList() throws Exception {
        when(vehicleService.getAllVehicles()).thenReturn(List.of(sampleVehicle));

        mockMvc.perform(get("/api/vehicles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].make").value("Porsche"));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_ADMIN"})
    @DisplayName("POST /api/vehicles should create vehicle when user is ADMIN")
    void createVehicle_AdminRole_Returns201() throws Exception {
        when(vehicleService.createVehicle(any(VehicleDto.class))).thenReturn(sampleVehicle);

        mockMvc.perform(post("/api/vehicles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleVehicle)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.make").value("Porsche"));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_CUSTOMER"})
    @DisplayName("POST /api/vehicles should return 403 FORBIDDEN when user is CUSTOMER")
    void createVehicle_CustomerRole_Returns403() throws Exception {
        mockMvc.perform(post("/api/vehicles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleVehicle)))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = {"ROLE_CUSTOMER"})
    @DisplayName("POST /api/vehicles/1/purchase should decrease quantity")
    void purchaseVehicle_Success() throws Exception {
        VehicleDto purchased = VehicleDto.builder()
                .id(1L)
                .make("Porsche")
                .model("911 GT3")
                .category("Sports")
                .price(new BigDecimal("180000.00"))
                .quantity(2)
                .build();

        when(vehicleService.purchaseVehicle(eq(1L), any(PurchaseRequest.class))).thenReturn(purchased);

        mockMvc.perform(post("/api/vehicles/1/purchase")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(PurchaseRequest.builder().quantity(1).build())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.quantity").value(2));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_ADMIN"})
    @DisplayName("POST /api/vehicles/1/restock should increase quantity when ADMIN")
    void restockVehicle_AdminRole_Success() throws Exception {
        VehicleDto restocked = VehicleDto.builder()
                .id(1L)
                .make("Porsche")
                .model("911 GT3")
                .category("Sports")
                .price(new BigDecimal("180000.00"))
                .quantity(8)
                .build();

        when(vehicleService.restockVehicle(eq(1L), any(RestockRequest.class))).thenReturn(restocked);

        mockMvc.perform(post("/api/vehicles/1/restock")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(RestockRequest.builder().quantity(5).build())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.quantity").value(8));
    }

    @Test
    @WithMockUser(authorities = {"ROLE_ADMIN"})
    @DisplayName("DELETE /api/vehicles/1 should delete vehicle when ADMIN")
    void deleteVehicle_AdminRole_Success() throws Exception {
        doNothing().when(vehicleService).deleteVehicle(1L);

        mockMvc.perform(delete("/api/vehicles/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Vehicle deleted successfully"));
    }
}
