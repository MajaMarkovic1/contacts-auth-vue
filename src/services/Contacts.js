import axios from 'axios'

export default class Contacts {
  constructor () {
    axios.defaults.baseURL = 'http://localhost:8000/api/'
  }

  getAll () {
    return axios.get('contacts')
  }

  add (contact) {
    return axios.post('contacts', contact)
  }

  remove (id) {
    return axios.delete(`contacts/${id}`)
  }

  edit (contact) {
    return axios.put(`contacts/${contact.id}`, contact)
  }

  get (id) {
    return axios.get(`contacts/${id}`)
  }
}

export const contacts = new Contacts()
