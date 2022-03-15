import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Input, InputNumber, Divider } from 'antd';
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;
const { Title } = Typography;

const ProductModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fieldstate, setFieldState] = useState({});

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    console.log("fieldstate", fieldstate)

    const data = JSON.stringify(fieldstate)
    const url = `http://localhost:3000/api/product/add`;
    const headers = {
      'Content-Type': 'application/json'
    };
    const response = await fetch(url, { method: 'POST', body:data, headers });
    const resData = await response.json();
    console.log("resData", resData)

    props.getAllData()

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button style={{ background: '#fc5530', border: "1px solid #fc5530" }} className="add-product" type="primary" shape="circle" icon={<PlusOutlined />} onClick={showModal}>
      </Button>
      <Modal title="Add New Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Divider orientation="left"><Text strong>Name</Text></Divider>
            <Input 
            style={{ width: '100%', marginBottom: "10px" }} 
            size="large" 
            placeholder="Name"
            onChange={e => setFieldState({...fieldstate, name: e.target.value})}
            />
          
            <Divider orientation="left"><Text strong>Price</Text></Divider>
            <InputNumber 
            style={{ width: '100%', marginBottom: "10px" }} 
            size="large" 
            placeholder="Price"
            onChange={e => setFieldState({...fieldstate, price: e})}
            />

            <Divider orientation="left"><Text strong>Image</Text></Divider>
            <Input 
            style={{ width: '100%', marginBottom: "10px" }} 
            size="large" 
            placeholder="Please provide a image URL"
            onChange={e => setFieldState({...fieldstate, img_url: e.target.value})}
            />

      </Modal>
    </>
  );
};

export default ProductModal;