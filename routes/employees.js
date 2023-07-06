const express = require('express');
const router = express.Router();
const {auth}=require('../middleware/auth');
const {getAll, addEmployee, removeEmployee, getEmployeeById, editEmployee} = require("../controllers/employees.controller")

router.get('/',auth,getAll);
router.get('/:id',auth,getEmployeeById);
router.post('/add',auth,addEmployee);
// /api/employees/remove/:id
router.post('/remove/:id',removeEmployee);
router.put('/edit/:id',auth,editEmployee);
module.exports = router;
