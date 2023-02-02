import React, {useState, useEffect} from 'react';
import { Avatar, Button, List } from 'antd';
import API from "./Api";
import axios from 'axios';


function PetsList() {
    const [mascotas, setMascotas] = useState([]);

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/backend_api/mascotas/${id}/`)
        .then(res => {
            let items = [...mascotas];
            let index = items.findIndex(item => item.id === id);
            items.splice(index, 1);
            setMascotas(items);
            refreshMascotas();
        })
        .catch(error => {
            console.error(error);
        });
    }
    
    useEffect (() => {
        refreshMascotas();
    }, [mascotas])

    const refreshMascotas = () => {
      API.get("/")
        .then((res) => {
        setMascotas(res.data);        
        })
        .catch(console.error);
    };
    return(
      <List
        itemLayout="horizontal"
        dataSource={mascotas}
        renderItem={(item) => (
        <List.Item>
            <List.Item.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={item['nombre']}
            description={item['descripcion']}
            />
            <Button onClick={() => handleDelete(item['id'])}>Eliminar</Button>
        </List.Item>
        )}
      />
    )
}

export default PetsList;