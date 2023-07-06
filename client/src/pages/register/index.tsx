import React, { useState } from 'react';
import { Card, Form, Input, Row, Space, Typography } from 'antd';
import Layout from '../../components/layout';

import CustomInput from '../../components/custom-input';
import PasswordInput from '../../components/password-input';
import { CustomButton } from '../../components/custom-button';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { useRegisterMutation } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utilities/isErrorWithMessage';
import { User } from '@prisma/client';
import { ErrorMessage } from '../../components/error-message';

type RegisterData = Omit<User, "id"> & {confirmPassword: string}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error,setError] = useState('');
  const [registerUser] = useRegisterMutation();
  const register = async(data: RegisterData) => {
    try {
      await registerUser(data).unwrap();
      navigate('/');
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
        <Card title="Зарегестрируйтесь" style={{ width: '30rem' }}>
          <Form onFinish={register}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput name="confirmPassword" placeholder="Confirm password" />
            <CustomButton type="primary" htmlType="submit">
              Зарегестрироваться
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Already registered? <Link to={Paths.login}>Login!</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
export default Register;
