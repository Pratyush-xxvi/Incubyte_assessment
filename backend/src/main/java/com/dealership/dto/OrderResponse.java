package com.dealership.dto;

import com.dealership.model.OrderStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class OrderResponse {

    private Long orderId;

    private String customer;

    private String vehicle;

    private OrderStatus status;

    private LocalDateTime orderDate;

}