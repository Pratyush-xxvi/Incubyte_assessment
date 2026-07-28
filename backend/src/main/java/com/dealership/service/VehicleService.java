package com.dealership.service;

import com.dealership.dto.PurchaseRequest;
import com.dealership.dto.RestockRequest;
import com.dealership.dto.VehicleDto;
import com.dealership.exception.BadRequestException;
import com.dealership.exception.ResourceNotFoundException;
import com.dealership.model.Vehicle;
import com.dealership.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public List<VehicleDto> getAllVehicles() {
        return vehicleRepository.findAll().stream()
                .map(this::mapToDto)
                .toList();
    }

    public VehicleDto getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with ID: " + id));
        return mapToDto(vehicle);
    }

    @Transactional
    public VehicleDto createVehicle(VehicleDto dto) {
        Vehicle vehicle = mapToEntity(dto);
        Vehicle saved = vehicleRepository.save(vehicle);
        return mapToDto(saved);
    }

    @Transactional
    public VehicleDto updateVehicle(Long id, VehicleDto dto) {
        Vehicle existing = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with ID: " + id));

        existing.setMake(dto.getMake());
        existing.setModel(dto.getModel());
        existing.setCategory(dto.getCategory());
        existing.setPrice(dto.getPrice());
        existing.setQuantity(dto.getQuantity());
        if (dto.getYear() != null) existing.setYear(dto.getYear());
        if (dto.getVin() != null) existing.setVin(dto.getVin());
        if (dto.getImageUrl() != null) existing.setImageUrl(dto.getImageUrl());
        if (dto.getDescription() != null) existing.setDescription(dto.getDescription());

        Vehicle updated = vehicleRepository.save(existing);
        return mapToDto(updated);
    }

    @Transactional
    public void deleteVehicle(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vehicle not found with ID: " + id);
        }
        vehicleRepository.deleteById(id);
    }

    public List<VehicleDto> searchVehicles(String make, String model, String category, BigDecimal minPrice, BigDecimal maxPrice) {
        return vehicleRepository.searchVehicles(make, model, category, minPrice, maxPrice).stream()
                .map(this::mapToDto)
                .toList();
    }

    @Transactional
    public VehicleDto purchaseVehicle(Long id, PurchaseRequest request) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with ID: " + id));

        int qtyToBuy = (request != null && request.getQuantity() != null) ? request.getQuantity() : 1;

        if (vehicle.getQuantity() <= 0) {
            throw new BadRequestException("Vehicle is currently out of stock!");
        }

        if (vehicle.getQuantity() < qtyToBuy) {
            throw new BadRequestException("Not enough stock available. Requested: " + qtyToBuy + ", Available: " + vehicle.getQuantity());
        }

        vehicle.setQuantity(vehicle.getQuantity() - qtyToBuy);
        Vehicle saved = vehicleRepository.save(vehicle);
        return mapToDto(saved);
    }

    @Transactional
    public VehicleDto restockVehicle(Long id, RestockRequest request) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with ID: " + id));

        if (request == null || request.getQuantity() == null || request.getQuantity() <= 0) {
            throw new BadRequestException("Restock quantity must be at least 1");
        }

        vehicle.setQuantity(vehicle.getQuantity() + request.getQuantity());
        Vehicle saved = vehicleRepository.save(vehicle);
        return mapToDto(saved);
    }

    private VehicleDto mapToDto(Vehicle vehicle) {
        return VehicleDto.builder()
                .id(vehicle.getId())
                .make(vehicle.getMake())
                .model(vehicle.getModel())
                .category(vehicle.getCategory())
                .price(vehicle.getPrice())
                .quantity(vehicle.getQuantity())
                .year(vehicle.getYear())
                .vin(vehicle.getVin())
                .imageUrl(vehicle.getImageUrl())
                .description(vehicle.getDescription())
                .build();
    }

    private Vehicle mapToEntity(VehicleDto dto) {
        return Vehicle.builder()
                .id(dto.getId())
                .make(dto.getMake())
                .model(dto.getModel())
                .category(dto.getCategory())
                .price(dto.getPrice())
                .quantity(dto.getQuantity() != null ? dto.getQuantity() : 0)
                .year(dto.getYear())
                .vin(dto.getVin())
                .imageUrl(dto.getImageUrl())
                .description(dto.getDescription())
                .build();
    }
}
