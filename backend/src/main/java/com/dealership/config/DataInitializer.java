package com.dealership.config;

import com.dealership.model.Role;
import com.dealership.model.User;
import com.dealership.model.Vehicle;
import com.dealership.repository.UserRepository;
import com.dealership.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Users if not present
        if (!userRepository.existsByUsername("admin")) {
            userRepository.save(User.builder()
                    .username("admin")
                    .email("admin@dealership.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ROLE_ADMIN)
                    .build());
        }

        if (!userRepository.existsByUsername("customer")) {
            userRepository.save(User.builder()
                    .username("customer")
                    .email("customer@dealership.com")
                    .password(passwordEncoder.encode("customer123"))
                    .role(Role.ROLE_CUSTOMER)
                    .build());
        }

        // 2. Seed Initial Vehicles if empty
        if (vehicleRepository.count() == 0) {
            List<Vehicle> sampleVehicles = List.of(
                Vehicle.builder()
                    .make("Tesla")
                    .model("Model S Plaid")
                    .category("Electric")
                    .price(new BigDecimal("89990.00"))
                    .quantity(5)
                    .year(2024)
                    .vin("5YJSA1E28MF123456")
                    .imageUrl("https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80")
                    .description("Tri-motor all-wheel drive, 1020 horsepower, 0-60 mph in 1.99s.")
                    .build(),
                Vehicle.builder()
                    .make("Porsche")
                    .model("911 GT3 RS")
                    .category("Sports")
                    .price(new BigDecimal("241300.00"))
                    .quantity(2)
                    .year(2024)
                    .vin("WP0AF2A91RS987654")
                    .imageUrl("https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80")
                    .description("Naturally aspirated 4.0L flat-6 engine producing 518 hp with extreme aerodynamics.")
                    .build(),
                Vehicle.builder()
                    .make("BMW")
                    .model("M5 Competition")
                    .category("Luxury")
                    .price(new BigDecimal("107900.00"))
                    .quantity(4)
                    .year(2023)
                    .vin("WBS83CH050CJ11223")
                    .imageUrl("https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80")
                    .description("High-performance executive sedan with 617 hp twin-turbo V8.")
                    .build(),
                Vehicle.builder()
                    .make("Ford")
                    .model("F-150 Lightning")
                    .category("Truck")
                    .price(new BigDecimal("62990.00"))
                    .quantity(0) // Out of stock example
                    .year(2024)
                    .vin("1FTVW1EL8NW334455")
                    .imageUrl("https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80")
                    .description("All-electric pickup truck with 580 hp and mega power frunk.")
                    .build(),
                Vehicle.builder()
                    .make("Mercedes-Benz")
                    .model("G 63 AMG")
                    .category("SUV")
                    .price(new BigDecimal("179000.00"))
                    .quantity(3)
                    .year(2024)
                    .vin("W4N0409211X556677")
                    .imageUrl("https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=800&q=80")
                    .description("Iconic luxury off-roader with handcrafted AMG 4.0L V8 Biturbo engine.")
                    .build(),
                Vehicle.builder()
                    .make("Audi")
                    .model("RS e-tron GT")
                    .category("Electric")
                    .price(new BigDecimal("147100.00"))
                    .quantity(6)
                    .year(2024)
                    .vin("WAUZZZF88P1998877")
                    .imageUrl("https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80")
                    .description("Electric grand tourer with dual electric motors and 637 hp boost mode.")
                    .build()
            );
            vehicleRepository.saveAll(sampleVehicles);
        }
    }
}
