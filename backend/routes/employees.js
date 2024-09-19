// routes/employees.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Get all employees
router.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Get an employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send('Employee not found');
    res.json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new employee
router.post('/', async (req, res) => {
  const newEmployee = new Employee({
    name: req.body.name,
    salary: req.body.salary,
    department: req.body.department
  });
  await newEmployee.save();
  res.status(201).json(newEmployee);
});

// Update an employee's salary
router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, { salary: req.body.salary }, { new: true });
    if (!employee) return res.status(404).send('Employee not found');
    res.json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
