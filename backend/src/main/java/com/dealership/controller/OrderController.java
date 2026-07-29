package com.dealership.controller;

import com.dealership.dto.OrderRequest;
import com.dealership.model.Order;
import com.dealership.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public Order placeOrder(@RequestBody OrderRequest request) {
        return orderService.placeOrder(request);
    }

    @GetMapping("/my")
    public List<Order> myOrders() {
        return orderService.getMyOrders();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Order> allOrders() {
        return orderService.getAllOrders();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/approve")
    public Order approve(@PathVariable Long id) {
        return orderService.approveOrder(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/reject")
    public Order reject(@PathVariable Long id) {
        return orderService.rejectOrder(id);
    }
}