import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:9200',
  withCredentials : true,
  auth : {
    username : 'admin',
    password : 'Arun@521414'
  }
})


export { api }
