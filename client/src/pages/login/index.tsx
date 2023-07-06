import { Card, Form, Input, Row, Space, Typography } from 'antd'
import Layout from '../../components/layout'
import React from 'react'
import CustomInput from '../../components/custom-input'
import PasswordInput from '../../components/password-input'
import { CustomButton } from '../../components/custom-button'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { UserData, useLoginMutation } from '../../app/services/auth'
import { isErrorWithMessage } from '../../utilities/isErrorWithMessage'
import { ErrorMessage } from '../../components/error-message'

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error,setError] = React.useState('');
  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap(); // json parse analogue
      navigate("/");
    } catch(e) {
      const canBeError = isErrorWithMessage(e);
      if(canBeError) {
        setError(e.data.message);
      } else {
        setError('Неизвестная ошибка.')
      }
    }
  }
  return (
    <Layout>
        <Row align="middle" justify="center">
          <Card title="Войдите" style={{width:"30rem"}}>
            <Form onFinish={login}>
              <CustomInput type="email" name="email" placeholder='Email' />
              <PasswordInput name="password" placeholder='Password' />
              <CustomButton
                type="primary" htmlType='submit'>
                  Войти
              </CustomButton>
            </Form>
            <Space direction='vertical' size="large">
              <Typography.Text style={{fontSize: "19px"}}>
                No account? <Link to={Paths.register}>Register!</Link>
              </Typography.Text>
              <ErrorMessage message={error} />
            </Space>
          </Card>
        </Row>
    </Layout>
    
  )
}

export default Login;


