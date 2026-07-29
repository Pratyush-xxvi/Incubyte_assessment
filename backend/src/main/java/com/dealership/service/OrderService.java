package com.dealership.service;

import com.dealership.dto.OrderRequest;
import com.dealership.model.Order;
import com.dealership.model.OrderStatus;
import com.dealership.model.User;
import com.dealership.model.Vehicle;
import com.dealership.repository.OrderRepository;
import com.dealership.repository.UserRepository;
import com.dealership.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import com.dealership.exception.BadRequestException;
import com.dealership.exception.ResourceNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;


    public Order placeOrder(OrderRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        Order order = Order.builder()
                .user(user)
                .vehicle(vehicle)
                .status(OrderStatus.PENDING)
                .orderDate(LocalDateTime.now())
                .build();

        return orderRepository.save(order);
    }


    public List<Order> getMyOrders() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository.findByUserOrderByOrderDateDesc(user);
    }


    public List<Order> getAllOrders() {

        return orderRepository.findAllByOrderByOrderDateDesc();

    }


    public Order approveOrder(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new BadRequestException("Order already processed");
        }


        Vehicle vehicle = order.getVehicle();


        if (vehicle.getQuantity() <= 0) {
            throw new BadRequestException("Vehicle out of stock");
        }


        vehicle.setQuantity(vehicle.getQuantity() - 1);

        vehicleRepository.save(vehicle);


        order.setStatus(OrderStatus.APPROVED);

        return orderRepository.save(order);
    }


    public Order rejectOrder(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));


        if (order.getStatus() != OrderStatus.PENDING) {
            throw new BadRequestException("Order already processed");
        }


        order.setStatus(OrderStatus.REJECTED);


        return orderRepository.save(order);
    }



}