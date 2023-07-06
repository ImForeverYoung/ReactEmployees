import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEditEmployeeMutation, useGetEmployeeQuery } from '../../app/services/employees';
import {  Row } from 'antd';
import { EmployeeForm } from '../../components/employee-form';
import { Employee } from '@prisma/client';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utilities/isErrorWithMessage';
import Layout from '../../components/layout';

export const EditEmployee = () => {
    const navigate = useNavigate();
    const params = useParams<{id: string}>();
    const [error,setError] = React.useState('');
    const {data,isLoading} = useGetEmployeeQuery(params.id || "");
    const [editEmployee] = useEditEmployeeMutation();
    if(isLoading) {
        return <span>Загрузка</span>
    }
    const handleEditUser = async(employee: Employee) => {
        
        try {
            const editedEmployee = {
                ...data,
                ...employee
            };
            await editEmployee(editedEmployee).unwrap();
            navigate(`${Paths.status}/updated`);
        } catch(e) {
            const maybeError = isErrorWithMessage(e);
            if(maybeError) {
                setError(e.data.message);
            } else {
                setError('Unknown error!');
            }
        }
    }
    return (
        <Layout>
            <Row align="middle" justify="center">
                <EmployeeForm onFinish={handleEditUser }
                 btnText={'Редактировать'} title={'Редактировать сотрудника'}
                error={error}
                employee={data} />

            </Row>
        </Layout>
    )
}
