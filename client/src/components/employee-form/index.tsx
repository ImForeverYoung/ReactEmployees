import { Employee } from '@prisma/client';
import { Card, Form, Space } from 'antd';
import React from 'react'
import CustomInput from '../custom-input';
import { ErrorMessage } from '../error-message';
import { CustomButton } from '../custom-button';

type Props<T> = {
    onFinish: (values: T) => void;
    btnText: string;
    title: string;
    error?: string;
    employee?: T;
}

export const EmployeeForm: React.FC<Props<Employee>> = ({onFinish,title,btnText,error,employee}) => {
  
    return (
    <Card title={title} style={{width: '30rem'}}>
        <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
            <CustomInput type="text" name="firstName" placeholder='Name' />
            <CustomInput type="text" name="lastName" placeholder='Surname' />
            <CustomInput type="number" name="age" placeholder='Age' />
            <CustomInput type="text" name="address" placeholder='Address' />
            <Space>
                <ErrorMessage message={error} />
                <CustomButton htmlType="submit">
                    {btnText}
                </CustomButton>
            </Space>
        </Form>
    </Card>
  )
}
