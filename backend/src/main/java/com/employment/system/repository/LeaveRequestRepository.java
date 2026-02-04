package com.employment.system.repository;

import com.employment.system.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    
    List<LeaveRequest> findByEmployeeId(Long employeeId);
    
    List<LeaveRequest> findByStatus(String status);
    
    List<LeaveRequest> findByEmployeeIdAndStatus(Long employeeId, String status);
    
    List<LeaveRequest> findByStartDateBetween(LocalDate startDate, LocalDate endDate);
    
    List<LeaveRequest> findByLeaveType(String leaveType);
}
