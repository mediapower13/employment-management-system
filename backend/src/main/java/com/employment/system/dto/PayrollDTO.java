package com.employment.system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PayrollDTO {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private Double baseSalary;
    private Double bonus;
    private Double deductions;
    private Double netPay;
    private String month;
    private Integer year;
    private String status;
    private String transactionHash;
}
