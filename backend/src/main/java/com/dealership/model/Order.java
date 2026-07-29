package com.dealership.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Customer who placed the order
    @ManyToOne
@com.fasterxml.jackson.annotation.JsonIgnoreProperties("orders")
private User user;

    // Vehicle ordered
   @ManyToOne
@com.fasterxml.jackson.annotation.JsonIgnoreProperties("orders")
private Vehicle vehicle;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @Column(nullable = false)
    private LocalDateTime orderDate;
}