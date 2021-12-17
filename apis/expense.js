const axios = require('axios')
const baseURL = 'http://jm-expense-mysql.herokuapp.com'
const apiHelper = axios.create({
  baseURL
})

const API = {
  create(data) {
    return apiHelper.post('/record/create', data)
  },
  close(data) {
    return apiHelper.put('/close', data)
  }
}

module.exports = { API }
