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
                    .make("Mahindra")
                    .model("Thar Roxx 4x4")
                    .category("SUV")
                    .price(new BigDecimal("1699000.00"))
                    .quantity(5)
                    .year(2024)
                    .vin("MA1THARROXX2024IN")
                    .imageUrl("https://imgd.aeplcdn.com/1056x594/n/cw/ec/40087/thar-exterior-right-front-three-quarter-35.jpeg?q=80&wm=1")
                    .description("2.0L Turbo Petrol / 2.2L mHawk Diesel, 174 bhp, 4WD system, Dual Sunroof & ADAS.")
                    .build(),
                Vehicle.builder()
                    .make("Tata")
                    .model("Nexon EV Long Range")
                    .category("Electric")
                    .price(new BigDecimal("1449000.00"))
                    .quantity(8)
                    .year(2024)
                    .vin("TATANEXONEV2024IN")
                    .imageUrl("https://imgd.aeplcdn.com/1056x594/n/cw/ec/141867/nexon-ev-exterior-right-front-three-quarter-3.jpeg?q=80&wm=1")
                    .description("45 kWh Battery, 465 km ARAI certified range, V2L & V2V charging technology.")
                    .build(),
                Vehicle.builder()
                    .make("Mahindra")
                    .model("XUV700 AX7 L")
                    .category("SUV")
                    .price(new BigDecimal("2399000.00"))
                    .quantity(4)
                    .year(2024)
                    .vin("MA1XUV700AX7L2024")
                    .imageUrl("https://imgd.aeplcdn.com/1056x594/n/cw/ec/42358/xuv700-exterior-right-front-three-quarter-3.jpeg?q=80&wm=1")
                    .description("2.2L mHawk Diesel AWD, 200 PS power, Panoramic Skyroof & ADAS Level 2.")
                    .build(),
                Vehicle.builder()
                    .make("Toyota")
                    .model("Fortuner Legender")
                    .category("SUV")
                    .price(new BigDecimal("4360000.00"))
                    .quantity(3)
                    .year(2024)
                    .vin("TOYFORTLEGEND2024")
                    .imageUrl("https://imgd.aeplcdn.com/1056x594/n/cw/ec/44709/fortuner-legender-exterior-right-front-three-quarter-19.jpeg?q=80&wm=1")
                    .description("2.8L Diesel 4x4, 204 PS, 500 Nm torque, premium dual-tone interior.")
                    .build(),
                Vehicle.builder()
                    .make("Hyundai")
                    .model("Creta N Line")
                    .category("SUV")
                    .price(new BigDecimal("1688000.00"))
                    .quantity(6)
                    .year(2024)
                    .vin("HYUCRETANLINE2024")
                    .imageUrl("https://imgd.aeplcdn.com/1056x594/n/cw/ec/169111/creta-n-line-exterior-right-front-three-quarter-3.jpeg?q=80&wm=1")
                    .description("1.5L Turbo GDi, 160 PS power, 7-Speed DCT with paddle shifters & N Line tuning.")
                    .build(),
                Vehicle.builder()
                    .make("Maruti Suzuki")
                    .model("Jimny Alpha 4WD")
                    .category("SUV")
                    .price(new BigDecimal("1274000.00"))
                    .quantity(0) // Out of stock example
                    .year(2024)
                    .vin("MSJIMNYALPHA2024IN")
                    .imageUrl("https://imgd.aeplcdn.com/1056x594/n/cw/ec/134449/jimny-exterior-right-front-three-quarter-3.jpeg?q=80&wm=1")
                    .description("ALLGRIP PRO 4WD system, rigid ladder frame, 1.5L K-series petrol engine.")
                    .build(),
                Vehicle.builder()
                    .make("BMW")
                    .model("M340i xDrive")
                    .category("Luxury")
                    .price(new BigDecimal("7290000.00"))
                    .quantity(2)
                    .year(2024)
                    .vin("BMWM340IXDRIVE2024")
                    .imageUrl("https://imgd.aeplcdn.com/1056x594/n/cw/ec/136211/m340i-exterior-right-front-three-quarter-3.jpeg?q=80&wm=1")
                    .description("3.0L Straight-6 TwinPower Turbo, 374 bhp, 0-100 km/h in 4.4 seconds.")
                    .build(),
                Vehicle.builder()
                    .make("Mercedes-Benz")
                    .model("G 63 AMG")
                    .category("Luxury")
                    .price(new BigDecimal("33000000.00"))
                    .quantity(1)
                    .year(2024)
                    .vin("MBG63AMGINDIA2024")
                    .imageUrl("https://imgd.aeplcdn.com/1056x594/n/cw/ec/130583/g-class-exterior-right-front-three-quarter-3.jpeg?q=80&wm=1")
                    .description("Handcrafted AMG 4.0L V8 Biturbo, 585 hp, AMG Performance 4MATIC.")
                    .build()
            );
            vehicleRepository.saveAll(sampleVehicles);
        }
    }
}
