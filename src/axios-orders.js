import axios from 'axios'

const Instance = axios.create({
  baseURL: 'https://burger-app-c590b.firebaseio.com/'
})

export default Instance
