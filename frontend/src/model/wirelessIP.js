import axios from 'axios';

export const getdata = () => {
    return axios.get(`http://localhost:8000/wireless`)
    .then(response => 
        response.data
    )
    .catch((error) =>{
        console.log(error);
        window.makeAlert('error', 'Error', error);
    });
};