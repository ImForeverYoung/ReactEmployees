import React from 'react'
import { Link, Navigate, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employees';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import Layout from '../../components/layout';
import { Descriptions, Divider, Modal, Space } from 'antd';
import { CustomButton } from '../../components/custom-button';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ErrorMessage } from '../../components/error-message';
import { Paths } from '../../paths';
import { isErrorWithMessage } from '../../utilities/isErrorWithMessage';
type Params = {
    id: string;
}
export const Employee = () => {
    const navigate = useNavigate();
    const [error,setError] = React.useState('');
    const params = useParams<Params>();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const {data,isLoading} = useGetEmployeeQuery(params.id || "");
    const [removeEmployee] = useRemoveEmployeeMutation();
    const user = useSelector(selectUser);
    if(isLoading) {
        return <span>Загрузка</span>
    }
    if(!data) {
        return <Navigate to="/" />
    }
    const showModel = () => {
        setIsModalOpen(true);
    }
    const hideModel = () => {
        setIsModalOpen(false);
    }
    const handleDeleteUser = async () => {
        hideModel();
        try {
            await removeEmployee(data.id).unwrap();
            navigate(`${Paths.status}/deleted`)
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
        <Descriptions title="Информация о сотруднике" bordered>
            <Descriptions.Item label="Имя" span={3}>
                {`${data.firstName} ${data.lastName}`}
            </Descriptions.Item>
            <Descriptions.Item label="Возраст" span={3}>
                {`${data.age}`}
            </Descriptions.Item>
            <Descriptions.Item label="Адрес" span={3}>
                {`${data.address}`}
            </Descriptions.Item>
        </Descriptions>
        {
            user?.id===data.userId && (
                <>
                    <Divider orientation='left'>Действия</Divider>
                    <Space>
                        <Link to={`/employee/edit/${data.id}`}>
                            <CustomButton shape="round" 
                                type="default" icon={<EditOutlined />}>
                                Редактировать
                            </CustomButton>
                        </Link>
                        <CustomButton shape="round"
                            danger onClick={showModel}
                            icon={<DeleteOutlined/>}>
                            Удалить
                        </CustomButton>
                    </Space>
                </>
            )
        }
        <ErrorMessage message={error}/>
        <Modal title="Подтвердите удаление!"
            open={isModalOpen}
            onOk={handleDeleteUser}
            onCancel={hideModel}
            okText="Подтвердить"
            cancelText="Отменить">
                Вы действительно хотите удалить сотрудника?
        </Modal>
    </Layout>
  )
}
