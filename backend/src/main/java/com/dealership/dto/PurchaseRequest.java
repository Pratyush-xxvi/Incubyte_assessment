package com.dealership.dto;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseRequest {
    @Min(value = 1, message = "Purchase quantity must be at least 1")
    private Integer quantity = 1;
}
