package com.employment.system;

import com.employment.system.model.Employee;
import com.employment.system.repository.EmployeeRepository;
import com.employment.system.service.EmployeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    private Employee employee;

    @BeforeEach
    void setUp() {
        employee = new Employee();
        employee.setId(1L);
        employee.setName("John Doe");
        employee.setEmail("john@example.com");
        employee.setPosition("Developer");
        employee.setSalary(75000.0);
        employee.setDateOfJoining(LocalDate.now());
    }

    @Test
    void testGetAllEmployees() {
        List<Employee> employees = Arrays.asList(employee);
        when(employeeRepository.findAll()).thenReturn(employees);

        List<Employee> result = employeeService.getAllEmployees();

        assertEquals(1, result.size());
        assertEquals("John Doe", result.get(0).getName());
        verify(employeeRepository, times(1)).findAll();
    }

    @Test
    void testGetEmployeeById() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));

        Employee result = employeeService.getEmployeeById(1L);

        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        verify(employeeRepository, times(1)).findById(1L);
    }

    @Test
    void testCreateEmployee() {
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        Employee result = employeeService.createEmployee(employee);

        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        verify(employeeRepository, times(1)).save(employee);
    }

    @Test
    void testUpdateEmployee() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        employee.setName("Jane Doe");
        Employee result = employeeService.updateEmployee(1L, employee);

        assertNotNull(result);
        assertEquals("Jane Doe", result.getName());
        verify(employeeRepository, times(1)).findById(1L);
        verify(employeeRepository, times(1)).save(any(Employee.class));
    }

    @Test
    void testDeleteEmployee() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        doNothing().when(employeeRepository).delete(employee);

        employeeService.deleteEmployee(1L);

        verify(employeeRepository, times(1)).findById(1L);
        verify(employeeRepository, times(1)).delete(employee);
    }
}
