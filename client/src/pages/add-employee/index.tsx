import React from 'react'
import Layout from '../../components/layout'
import { Row } from 'antd'
import { EmployeeForm } from '../../components/employee-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useAddEmployeeMutation } from '../../app/services/employees'
import { Employee } from '@prisma/client'
import { Paths } from '../../paths'
import { isErrorWithMessage } from '../../utilities/isErrorWithMessage'

export const AddEmployee = () => {
    const [error,setError] = React.useState("");
    const navigate= useNavigate();
    const user = useSelector(selectUser);
    const [addEmployee] = useAddEmployeeMutation();
    React.useEffect(()=>{
        if(!user){
            navigate('/login');
        }
    }, [])
    const handleAddEmployee = async (data: Employee) => {
        try {
            await addEmployee(data).unwrap(); // have to read about unwrap
            navigate(`${Paths.status}/created`);
        } catch(e) {
            const maybeError = isErrorWithMessage(e);
            if(maybeError) {
                setError(e.data.message);
            } else {
                setError('Неизвестная ошибка')
            }

        }
    }
  return (
    <Layout>
        <Row align="middle" justify="center">
            <EmployeeForm 
                title="Add New Employee"
                btnText='Добавить'
                onFinish={handleAddEmployee}
                error={error}
            />
        </Row>
    </Layout>
  )
}
