import axios from 'axios';

export const getdata = () => {
    return axios.get(`http://192.168.0.100:8000/wireless`)
    .then(response => 
        response.data
    )
    .catch((error) =>{
        console.log(error);
        window.makeAlert('error', 'Error', error);
    });
};