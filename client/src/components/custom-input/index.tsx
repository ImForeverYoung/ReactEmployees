import React from 'react'
import {Form,Input} from 'antd'
type Props = {
    name: string;
    placeholder: string;
    type?: string | undefined;

}
const CustomInput: React.FC<Props> = ({name,placeholder,type='text'}) => {
  return (
    <Form.Item
        name={name}
        rules={[{required: true, message: "Necessary field"}]}
        shouldUpdate={true}
    >   
        <Input 
            placeholder={placeholder}
            type = {type}
            size='large'
        >
        </Input>
    </Form.Item>
  )
}


export default CustomInput;
