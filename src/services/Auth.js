import axios from 'axios'

export default class Auth {

  constructor(){
    axios.defaults.baseURL = 'http://localhost:8000/api'
  }

  isAuthenticated(){
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token')
  }

  login(email, password){
    return axios.post('auth/login', {email, password})
    .then((response) => {
      window.localStorage.setItem('token', response.data.access_token)
      this.setAuthorizationHeader()
    })
    .catch(() => {})
  }

  setAuthorizationHeader(){
    const token = window.localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export const authService = new Auth()
