import React from 'react';
import { Alert, Space, Spin } from 'antd';
import { useCurrentQuery } from '../../../app/services/auth';
import styles from './auth.module.css';
type Props = {
  children: JSX.Element;
};

export const Auth: React.FC<Props> = ({ children }) => {
  const { isLoading } = useCurrentQuery();
  if (isLoading) {
    return (
      <div className={styles.auth_main}>
        
        
        <Space>
          <Spin tip="Loading..." size="large">
            <div className={styles.content}/>
          </Spin>
        </Space>
        
      </div>
    );
  }
  return children;
};
