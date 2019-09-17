import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-app-c590b.firebaseio.com'
})

export default instance
