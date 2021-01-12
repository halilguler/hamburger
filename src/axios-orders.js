import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-app-hamburger-default-rtdb.firebaseio.com/",
});

export default instance;