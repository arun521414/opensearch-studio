import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:9200',
  withCredentials : true,
  auth : {
    username : 'admin',
    password : 'Arun@521414'
  }
})


export { api }
