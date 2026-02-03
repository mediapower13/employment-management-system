package com.employment.system.controller;

import com.employment.system.model.Payroll;
import com.employment.system.service.PayrollService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/payroll")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PayrollController {

    private final PayrollService payrollService;

    @GetMapping
    public ResponseEntity<List<Payroll>> getAllPayrolls() {
        return ResponseEntity.ok(payrollService.getAllPayrolls());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payroll> getPayrollById(@PathVariable Long id) {
        return payrollService.getPayrollById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Payroll>> getPayrollsByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(payrollService.getPayrollsByEmployee(employeeId));
    }

    @GetMapping("/month/{month}/year/{year}")
    public ResponseEntity<List<Payroll>> getPayrollsByMonthAndYear(
            @PathVariable String month,
            @PathVariable Integer year) {
        return ResponseEntity.ok(payrollService.getPayrollsByMonthAndYear(month, year));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Payroll>> getPayrollsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(payrollService.getPayrollsByStatus(status));
    }

    @PostMapping
    public ResponseEntity<Payroll> createPayroll(@RequestBody Payroll payroll) {
        Payroll created = payrollService.createPayroll(payroll);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/process")
    public ResponseEntity<Payroll> processPayroll(@RequestBody Payroll payroll) {
        Payroll processed = payrollService.createPayroll(payroll);
        return ResponseEntity.status(HttpStatus.CREATED).body(processed);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payroll> updatePayroll(@PathVariable Long id, @RequestBody Payroll payroll) {
        try {
            Payroll updated = payrollService.updatePayroll(id, payroll);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayroll(@PathVariable Long id) {
        try {
            payrollService.deletePayroll(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
