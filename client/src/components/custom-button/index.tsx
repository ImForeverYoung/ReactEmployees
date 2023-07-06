import React from 'react';
import { Button, Form } from 'antd';
import { loadavg } from 'os';
type Props = {
  children: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
  danger?: boolean;
  loading?: boolean;
  shape?: 'default' | 'circle' | 'round' | undefined;
  icon?: React.ReactNode;
};
export const CustomButton: React.FC<Props> = ({
  children,
  htmlType = 'button',
  type,
  danger,
  loading,
  shape,
  icon,
  onClick
}) => {
  return (
    <Form.Item >
      <Button style={{fontSize: "20px",  height: "50px", marginTop: "20px"}}
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}>
        {children}
      </Button>
    </Form.Item>
  );
};
