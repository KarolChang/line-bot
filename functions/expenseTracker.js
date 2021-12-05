const axios = require('axios')
const formatTime = require('../utils/formatTime')

const baseUrl = process.env.GOOGLE_SHEET_URL

function writeRecord(dataArr, person) {
  return new Promise((resolve, reject) => {
    const params = `?year=${dataArr[0]}&month=${dataArr[1]}&date=${dataArr[2]}&day=${encodeURIComponent(dataArr[3])}&item=${encodeURIComponent(dataArr[4])}&merchant=${encodeURIComponent(dataArr[5])}&amount=${dataArr[6]}&record_person=${encodeURIComponent(person)}&record_time=${encodeURIComponent(formatTime())}`

    axios.get(baseUrl + params)
      .then((response) => {
        resolve('資料已寫入~\n跟偷吃豬涵豆腐的建喵算帳:\nhttps://docs.google.com/spreadsheets/d/1vaEXzsvnZotcS88xntc5_DTvF7w1NNJ8bu4dej_4lio/edit#gid=0')
      })
      .catch((err) => {
        reject(`[ERROR]${err}`)
      })
  })
}

function addAmount(dataArr) {
  return new Promise((resolve, reject) => { 
    const params = `?year=${dataArr[0]}&month=${dataArr[1]}`

    axios.get(baseUrl + params)
      .then((response) => {
        const amount = response.data
        resolve(`${dataArr[0]}/${dataArr[1]} 總金額: ${amount}`)
      })
      .catch((err) => {
        reject(`[ERROR]${err}`)
      })
  })
}

function checkCloseAmount(dataArr) {
  return new Promise((resolve, reject) => {
    // 比對金額
    let params = `?year=${dataArr[0]}&month=${dataArr[1]}`
    
    axios.get(baseUrl + params)
      .then((response) => {
        const amount = response.data
        if(amount !== Number(dataArr[2])) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
      .catch((err) => {
        reject(`[ERROR]${err}`)
      })
  })
}

function closeAccount(dataArr) {
  return new Promise((resolve, reject) => {
    // 結清
    params = `?year=${dataArr[0]}&month=${dataArr[1]}&totalAmount=${dataArr[2]}`
    console.log('請求網址:', baseUrl + params)

    axios.get(baseUrl + params)
      .then((response) => {
        console.log('response.data', response.data)
        resolve(`${dataArr[0]}/${dataArr[1]} $${dataArr[2]} 已結清~\n跟偷吃豬涵豆腐的建喵算帳:\nhttps://docs.google.com/spreadsheets/d/1vaEXzsvnZotcS88xntc5_DTvF7w1NNJ8bu4dej_4lio/edit#gid=0`)
      })
      .catch((err) => {
        reject(`[ERROR]${err}`)
      })
  })
}

module.exports = { writeRecord, addAmount, checkCloseAmount, closeAccount }