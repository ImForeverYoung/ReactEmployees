import { Layout, Space, Typography, Button } from 'antd';
import styles from './Header.module.css';
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { CustomButton } from '../custom-button';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/auth/authSlice';

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <Layout.Header className={styles.header}>
      <Space className={styles.headerElement}>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="ghost">
            <Typography.Title level={1}>STAFF</Typography.Title>
          </CustomButton>
        </Link>
        
      </Space>
      <Space className={styles.headerElement}>
        {
          user && `Hello, ${user.name}`
        }
        
      </Space>
      
      {user ? (
        <Space className={styles.headerElement}>
          <CustomButton type="ghost" icon={<LoginOutlined />} 
          onClick={onLogoutClick}>
            Выйти
          </CustomButton>
        </Space>
      ) : (
        <Space className={styles.headerElement}>
          <Link to={Paths.register}>
            <CustomButton 
            type="primary" icon={<UserOutlined />}>
              Register
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton type="primary" icon={<LoginOutlined />}>
              Login
            </CustomButton>
          </Link>
        </Space>
      )}
      
    </Layout.Header>
  );
};

export default Header;
