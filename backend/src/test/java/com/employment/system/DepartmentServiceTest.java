package com.employment.system;

import com.employment.system.model.Department;
import com.employment.system.repository.DepartmentRepository;
import com.employment.system.service.DepartmentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DepartmentServiceTest {

    @Mock
    private DepartmentRepository departmentRepository;

    @InjectMocks
    private DepartmentService departmentService;

    private Department department;

    @BeforeEach
    void setUp() {
        department = new Department();
        department.setId(1L);
        department.setName("Engineering");
        department.setDescription("Software Development");
        department.setLocation("Building A");
    }

    @Test
    void testGetAllDepartments() {
        List<Department> departments = Arrays.asList(department);
        when(departmentRepository.findAll()).thenReturn(departments);

        List<Department> result = departmentService.getAllDepartments();

        assertEquals(1, result.size());
        assertEquals("Engineering", result.get(0).getName());
        verify(departmentRepository, times(1)).findAll();
    }

    @Test
    void testGetDepartmentById() {
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));

        Department result = departmentService.getDepartmentById(1L);

        assertNotNull(result);
        assertEquals("Engineering", result.getName());
        verify(departmentRepository, times(1)).findById(1L);
    }

    @Test
    void testCreateDepartment() {
        when(departmentRepository.save(any(Department.class))).thenReturn(department);

        Department result = departmentService.createDepartment(department);

        assertNotNull(result);
        assertEquals("Engineering", result.getName());
        verify(departmentRepository, times(1)).save(department);
    }

    @Test
    void testUpdateDepartment() {
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        when(departmentRepository.save(any(Department.class))).thenReturn(department);

        department.setName("IT");
        Department result = departmentService.updateDepartment(1L, department);

        assertNotNull(result);
        assertEquals("IT", result.getName());
        verify(departmentRepository, times(1)).findById(1L);
        verify(departmentRepository, times(1)).save(any(Department.class));
    }

    @Test
    void testDeleteDepartment() {
        when(departmentRepository.findById(1L)).thenReturn(Optional.of(department));
        doNothing().when(departmentRepository).delete(department);

        departmentService.deleteDepartment(1L);

        verify(departmentRepository, times(1)).findById(1L);
        verify(departmentRepository, times(1)).delete(department);
    }
}
