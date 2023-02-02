import React, {useState, useEffect} from 'react';
import pets from './pets.png';
import './App.css';
import PetsList from './components/PetsList';
import { Button, Form, Input, Modal } from 'antd';
import { _postmascotaRequest } from './components/Api';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [postData, setPostData] = useState({
    loading: false,
    error: false,
    data: []
  });
  const reload=()=>window.location.reload();


  const showModal = () => {
    setIsModalOpen(true);
  };

  const onSubmit = (values) => {
    setPostData({ ...postData, loading: true, error: false });
    _postmascotaRequest(values, (status, data) => {
      if (status === 200) {
        form.resetFields();
        setPostData({ ...postData, loading: false, data: data });
      } else {
        setPostData({
          ...postData,
          loading: false,
          error: true,
          data: "Post school roll out form failed!"
        });
      }
    });
    setIsModalOpen(false);
    reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={pets} alt="pets" /> 
      </header>
      <div className="Listado">
        <h1>Listado de Mascotas</h1>
        <PetsList />
      </div>  
      <Button onClick={showModal}>Agregar Mascota</Button>
      <Modal 
        title="Agregar Mascota" 
        open={isModalOpen} 
        onCancel={handleCancel}
        footer={[
          <Button
            block
            key="submit"
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  onSubmit(values);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
          >
            OK
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'Porfavor llenar nombre!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Raza"
            name="raza"
            rules={[{ required: true, message: 'Porfavor llenar raza!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Descripcion"
            name="descripcion"
            rules={[{ required: true, message: 'Porfavor llenar descripcion!' }]}
          >
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>    
    </div>
  );
}

export default App;
