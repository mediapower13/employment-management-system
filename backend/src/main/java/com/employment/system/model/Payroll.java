package com.employment.system.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "payroll")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false)
    private Double baseSalary;

    private Double bonus = 0.0;

    private Double deductions = 0.0;

    @Column(nullable = false)
    private Double netPay;

    @Column(nullable = false)
    private String month;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private String status = "PENDING";

    private String transactionHash;

    private LocalDateTime paymentDate;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        netPay = baseSalary + bonus - deductions;
    }
}
