package com.dealership.service;

import com.dealership.dto.PurchaseRequest;
import com.dealership.dto.RestockRequest;
import com.dealership.dto.VehicleDto;
import com.dealership.exception.BadRequestException;
import com.dealership.exception.ResourceNotFoundException;
import com.dealership.model.Vehicle;
import com.dealership.repository.VehicleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VehicleServiceTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private VehicleService vehicleService;

    private Vehicle mockVehicle;
    private VehicleDto vehicleDto;

    @BeforeEach
    void setUp() {
        mockVehicle = Vehicle.builder()
                .id(1L)
                .make("Tesla")
                .model("Model S")
                .category("Electric")
                .price(new BigDecimal("79999.99"))
                .quantity(5)
                .year(2024)
                .build();

        vehicleDto = VehicleDto.builder()
                .id(1L)
                .make("Tesla")
                .model("Model S")
                .category("Electric")
                .price(new BigDecimal("79999.99"))
                .quantity(5)
                .year(2024)
                .build();
    }

    @Test
    @DisplayName("Should return list of all vehicles")
    void getAllVehicles_Success() {
        when(vehicleRepository.findAll()).thenReturn(List.of(mockVehicle));

        List<VehicleDto> result = vehicleService.getAllVehicles();

        assertEquals(1, result.size());
        assertEquals("Tesla", result.get(0).getMake());
        assertEquals("Model S", result.get(0).getModel());
    }

    @Test
    @DisplayName("Should return vehicle by ID")
    void getVehicleById_Success() {
        when(vehicleRepository.findById(1L)).thenReturn(Optional.of(mockVehicle));

        VehicleDto result = vehicleService.getVehicleById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Tesla", result.getMake());
    }

    @Test
    @DisplayName("Should throw ResourceNotFoundException when vehicle ID not found")
    void getVehicleById_NotFound_ThrowsException() {
        when(vehicleRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> vehicleService.getVehicleById(99L));
    }

    @Test
    @DisplayName("Should create and return a new vehicle")
    void createVehicle_Success() {
        when(vehicleRepository.save(any(Vehicle.class))).thenReturn(mockVehicle);

        VehicleDto result = vehicleService.createVehicle(vehicleDto);

        assertNotNull(result);
        assertEquals("Tesla", result.getMake());
        verify(vehicleRepository, times(1)).save(any(Vehicle.class));
    }

    @Test
    @DisplayName("Should decrease quantity when vehicle is purchased")
    void purchaseVehicle_Success_DecreasesQuantity() {
        when(vehicleRepository.findById(1L)).thenReturn(Optional.of(mockVehicle));
        when(vehicleRepository.save(any(Vehicle.class))).thenAnswer(invocation -> invocation.getArgument(0));

        PurchaseRequest request = PurchaseRequest.builder().quantity(2).build();
        VehicleDto result = vehicleService.purchaseVehicle(1L, request);

        assertEquals(3, result.getQuantity());
        verify(vehicleRepository, times(1)).save(mockVehicle);
    }

    @Test
    @DisplayName("Should throw BadRequestException when purchasing out of stock vehicle")
    void purchaseVehicle_OutOfStock_ThrowsException() {
        mockVehicle.setQuantity(0);
        when(vehicleRepository.findById(1L)).thenReturn(Optional.of(mockVehicle));

        PurchaseRequest request = PurchaseRequest.builder().quantity(1).build();
        assertThrows(BadRequestException.class, () -> vehicleService.purchaseVehicle(1L, request));
        verify(vehicleRepository, never()).save(any(Vehicle.class));
    }

    @Test
    @DisplayName("Should increase quantity when vehicle is restocked by Admin")
    void restockVehicle_Success_IncreasesQuantity() {
        when(vehicleRepository.findById(1L)).thenReturn(Optional.of(mockVehicle));
        when(vehicleRepository.save(any(Vehicle.class))).thenAnswer(invocation -> invocation.getArgument(0));

        RestockRequest request = RestockRequest.builder().quantity(10).build();
        VehicleDto result = vehicleService.restockVehicle(1L, request);

        assertEquals(15, result.getQuantity());
        verify(vehicleRepository, times(1)).save(mockVehicle);
    }

    @Test
    @DisplayName("Should search vehicles by make and category")
    void searchVehicles_Success() {
        when(vehicleRepository.searchVehicles("Tesla", null, "Electric", null, null))
                .thenReturn(List.of(mockVehicle));

        List<VehicleDto> results = vehicleService.searchVehicles("Tesla", null, "Electric", null, null);

        assertEquals(1, results.size());
        assertEquals("Tesla", results.get(0).getMake());
    }
}
