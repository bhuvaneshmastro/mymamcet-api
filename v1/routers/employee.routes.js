import express from 'express';
import { addEmployee, getEmployee } from '../controllers/employee.controller.js';
const v1Employee = express.Router();

v1Employee.route('/add').post(addEmployee);
v1Employee.route('/:id').get(getEmployee);

export { v1Employee };