package com.employment.system.service;

import com.employment.system.model.Payroll;
import com.employment.system.repository.PayrollRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PayrollService {

    private final PayrollRepository payrollRepository;

    public List<Payroll> getAllPayrolls() {
        return payrollRepository.findAll();
    }

    public Optional<Payroll> getPayrollById(Long id) {
        return payrollRepository.findById(id);
    }

    public List<Payroll> getPayrollsByEmployee(Long employeeId) {
        return payrollRepository.findByEmployeeId(employeeId);
    }

    public List<Payroll> getPayrollsByMonthAndYear(String month, Integer year) {
        return payrollRepository.findByMonthAndYear(month, year);
    }

    public List<Payroll> getPayrollsByStatus(String status) {
        return payrollRepository.findByStatus(status);
    }

    @Transactional
    public Payroll createPayroll(Payroll payroll) {
        return payrollRepository.save(payroll);
    }

    @Transactional
    public Payroll updatePayroll(Long id, Payroll payrollDetails) {
        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payroll not found"));

        payroll.setBaseSalary(payrollDetails.getBaseSalary());
        payroll.setBonus(payrollDetails.getBonus());
        payroll.setDeductions(payrollDetails.getDeductions());
        payroll.setNetPay(payrollDetails.getBaseSalary() + payrollDetails.getBonus() - payrollDetails.getDeductions());
        payroll.setStatus(payrollDetails.getStatus());
        payroll.setTransactionHash(payrollDetails.getTransactionHash());

        return payrollRepository.save(payroll);
    }

    @Transactional
    public void deletePayroll(Long id) {
        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payroll not found"));
        payrollRepository.delete(payroll);
    }
}
