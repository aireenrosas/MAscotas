import axios from 'axios';

export default axios.create({
    baseURL: "http://127.0.0.1:8000/backend_api/mascotas",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})

export async function _postmascotaRequest(
    mascotaRequestForm,
    callback
  ) {  
    console.log("form values", mascotaRequestForm);
    try {
      let data = {};
      let status = "";
      await axios.post("http://127.0.0.1:8000/backend_api/mascotas/", mascotaRequestForm, {
        headers: { 'accept': 'application/json','content-type': 'application/json'
        },})
        .then(resp => { 
            data = resp.data;
            status = resp.status;
            console.log("Se guardo correctamente!");
        })
  
      callback(status, data);
    } catch (e) {
      callback(e.status);
      console.log("Hubo un error al guardar!", e);
    }
  }