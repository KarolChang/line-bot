import axios from 'axios'
const baseURL = 'http://jm-expense-mysql.herokuapp.com'
const apiHelper = axios.create({
  baseURL
})

export default {
  // getAll() {
  //   return apiHelper.get('/record/all')
  // },
  // getOne(id) {
  //   return apiHelper.get(`/record/${id}`)
  // },
  create(data) {
    return apiHelper.post('/record/create', data)
  },
  // edit(id, data) {
  //   return apiHelper.put(`/record/edit/${id}`, data)
  // },
  close(data) {
    return apiHelper.put('/close', data)
  }
}
