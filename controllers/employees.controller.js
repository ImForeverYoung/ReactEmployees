const {prisma} = require("../prisma/prisma-client");

/**
 * @route GET /api/employees
 * @description get all employees
 * @access Private
 * 
 */

const getAll = async (req,res) => {
    try {
        const employees = await prisma.employee.findMany();

        return res.status(200).json(employees);
    } catch(e) {
        return res.status(500).json({ message: 'Не удалось получить сотрудников' });
    } 
}
const addEmployee = async (req, res) => {
    try {
      const data = req.body;
  
      if (!data.firstName || !data.lastName || !data.address || !data.age) {
        return res.status(400).json({ message: "Все поля обязательные" });
      }
      //console.log(req.body)
      const employee = await prisma.employee.create({
        data: {
          ...data,
          userId: req.user.id,
        },
      });
  
      return res.status(201).json(employee);
    } catch (err) {
      //console.log(err);
      res.status(500).json({ message: "Что-то пошло не так" });
    }
  };
const removeEmployee = async(req,res)=>{
  try{
    const { id } = req.body;
    await prisma.employee.delete({
      where: {
        id
      }
    });
    res.status(204).json('Deleted.')
  } catch {
    res.status(500).json({message:"Something went wrong!"});
  }
}
const editEmployee = async(req,res)=>{
  
  try{
    const data = req.body;
    const id = data.id;
    await prisma.employee.update({
      where: {
        id
      },
      data
    });
    res.status(204).json('Changed.');
  } catch(e) {
    console.log(e)
    res.status(500).json({message: "Something went wrong while changing employee!"})
  }
}
const getEmployeeById = async(req,res)=>{
  try{
    const {id} = req.params;
    const employee = await prisma.employee.findUnique({
      where: {
        id
      }
    });
    res.status(200).json(employee);
  } catch {
    res.status(500).json({message:"Something went wrong while gaining information of employee!"});
  }
}
module.exports = {
    getAll, addEmployee, removeEmployee, getEmployeeById, editEmployee
}