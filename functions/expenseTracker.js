const axios = require('axios')
const formatTime = require('../utils/formatTime')

const baseUrl = 'https://script.google.com/macros/s/AKfycbwYV2fgQ8H6fVxNow-Sc4jyjys_P9xs5O35DsYbLidxPo-Dioo-3icItmJvr_fBjm8p/exec'
// process.env.GOOGLE_SHEET_URL

function writeRecord(text, person) {
  return new Promise((resolve, reject) => {
    const dataArr = text.split(' ').slice(1)
    if(dataArr.length !== 7) {
      resolve('輸入格式不正確！')
    }
    const params = `?year=${dataArr[0]}&month=${dataArr[1]}&date=${dataArr[2]}&day=${encodeURIComponent(dataArr[3])}&item=${encodeURIComponent(dataArr[4])}&merchant=${encodeURIComponent(dataArr[5])}&amount=${dataArr[6]}&record_person=${encodeURIComponent(person)}&record_time=${encodeURIComponent(formatTime())}`
    console.log('請求網址:', baseUrl + params)

    axios.get(baseUrl + params)
      .then((response) => {
        resolve('資料已寫入~\n跟偷吃豬涵豆腐的建喵算帳:\nhttps://docs.google.com/spreadsheets/d/1vaEXzsvnZotcS88xntc5_DTvF7w1NNJ8bu4dej_4lio/edit#gid=0')
      })
      .catch((err) => {
        reject('error: ', err)
      })
  })
}

function addAmount(text) {
  return new Promise((resolve, reject) => {
    const dataArr = text.split(' ').slice(1)
    if(dataArr.length !== 2) {
      resolve('輸入格式不正確！')
    }
    const params = `?year=${dataArr[0]}&month=${dataArr[1]}`
    console.log('請求網址:', baseUrl + params)
    // resolve(`請點擊以下連結以寫入資料:\n${baseUrl + params}\n跟偷吃豬涵豆腐的建喵算帳:\nhttps://docs.google.com/spreadsheets/d/1vaEXzsvnZotcS88xntc5_DTvF7w1NNJ8bu4dej_4lio/edit#gid=0`)

    axios.get(baseUrl + params)
      .then((response) => {
        console.log('response', response)
        const amount = 1000
        resolve(`${dataArr[0]}/${dataArr[1]} 總金額: ${amount}`)
      })
      .catch((err) => {
        reject('error: ', err)
      })
  })
}

module.exports = { writeRecord, addAmount }