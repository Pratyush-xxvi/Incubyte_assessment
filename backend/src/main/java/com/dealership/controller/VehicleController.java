package com.dealership.controller;

import com.dealership.dto.ApiResponse;
import com.dealership.dto.PurchaseRequest;
import com.dealership.dto.RestockRequest;
import com.dealership.dto.VehicleDto;
import com.dealership.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<VehicleDto>>> getAllVehicles() {
        List<VehicleDto> vehicles = vehicleService.getAllVehicles();
        return ResponseEntity.ok(ApiResponse.<List<VehicleDto>>builder()
                .success(true)
                .message("Retrieved all vehicles successfully")
                .data(vehicles)
                .build());
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<VehicleDto>>> searchVehicles(
            @RequestParam(required = false) String make,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {
        List<VehicleDto> vehicles = vehicleService.searchVehicles(make, model, category, minPrice, maxPrice);
        return ResponseEntity.ok(ApiResponse.<List<VehicleDto>>builder()
                .success(true)
                .message("Search results retrieved successfully")
                .data(vehicles)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<VehicleDto>> getVehicleById(@PathVariable Long id) {
        VehicleDto vehicle = vehicleService.getVehicleById(id);
        return ResponseEntity.ok(ApiResponse.<VehicleDto>builder()
                .success(true)
                .message("Vehicle found")
                .data(vehicle)
                .build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<VehicleDto>> createVehicle(@Valid @RequestBody VehicleDto vehicleDto) {
        VehicleDto created = vehicleService.createVehicle(vehicleDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<VehicleDto>builder()
                        .success(true)
                        .message("Vehicle created successfully")
                        .data(created)
                        .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<VehicleDto>> updateVehicle(@PathVariable Long id,
                                                                 @Valid @RequestBody VehicleDto vehicleDto) {
        VehicleDto updated = vehicleService.updateVehicle(id, vehicleDto);
        return ResponseEntity.ok(ApiResponse.<VehicleDto>builder()
                .success(true)
                .message("Vehicle updated successfully")
                .data(updated)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder()
                .success(true)
                .message("Vehicle deleted successfully")
                .data(null)
                .build());
    }

    @PostMapping("/{id}/purchase")
    public ResponseEntity<ApiResponse<VehicleDto>> purchaseVehicle(@PathVariable Long id,
                                                                   @RequestBody(required = false) PurchaseRequest request) {
        VehicleDto updated = vehicleService.purchaseVehicle(id, request);
        return ResponseEntity.ok(ApiResponse.<VehicleDto>builder()
                .success(true)
                .message("Vehicle purchased successfully! Quantity decreased.")
                .data(updated)
                .build());
    }

    @PostMapping("/{id}/restock")
    public ResponseEntity<ApiResponse<VehicleDto>> restockVehicle(@PathVariable Long id,
                                                                  @Valid @RequestBody RestockRequest request) {
        VehicleDto updated = vehicleService.restockVehicle(id, request);
        return ResponseEntity.ok(ApiResponse.<VehicleDto>builder()
                .success(true)
                .message("Vehicle restocked successfully! Quantity increased.")
                .data(updated)
                .build());
    }
}
