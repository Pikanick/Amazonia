import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api-th4xnpaosa-uc.a.run.app' // THE API (cloud function) URL
    // 'http://127.0.0.1:5001/clone-9bfce/us-central1/api' 
     
    
});

export default instance; 