package com.employment.system.repository;

import com.employment.system.model.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    
    List<Payroll> findByEmployeeId(Long employeeId);
    
    List<Payroll> findByMonthAndYear(String month, Integer year);
    
    List<Payroll> findByStatus(String status);
    
    List<Payroll> findByEmployeeIdAndYear(Long employeeId, Integer year);
}
