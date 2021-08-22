package com.example.demo.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.example.demo.model.Employee;
import com.example.demo.model.Taxthreshold;

public interface EmployeeService {
	ArrayList<Taxthreshold> loadTaxthreshold();
	BigDecimal calculateIncomeTax(BigDecimal grossIncome);
	HashMap<Object, Object> insertEmployee(List<Employee> employee);
}