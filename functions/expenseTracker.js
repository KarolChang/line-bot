const axios = require('axios')
const formatTime = require('../utils/formatTime')

const baseUrl = process.env.GOOGLE_SHEET_URL

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

    axios.get(baseUrl + params)
      .then((response) => {
        const amount = response.data
        resolve(`${dataArr[0]}/${dataArr[1]} 總金額: ${amount}`)
      })
      .catch((err) => {
        reject('error: ', err)
      })
  })
}

function closeAccount(text) {
  return new Promise((resolve, reject) => {
    const dataArr = text.split(' ').slice(1)
    if(dataArr.length !== 3) {
      resolve('輸入格式不正確！')
    }

    // 比對金額
    let params = `?year=${dataArr[0]}&month=${dataArr[1]}`
    console.log('請求網址:', baseUrl + params)
    
    axios.get(baseUrl + params)
      .then((response) => {
        const amount = response.data
        console.log('amount', amount)
        console.log('amount(type)', typeof(amount))
        console.log('Number(dataArr[2])', Number(dataArr[2]))
        if(amount !== Number(dataArr[2])) {
          resolve('金額不正確QQ')
        }
      })
      .catch((err) => {
        reject('error: ', err)
      })

    // 結清
    params = `?year=${dataArr[0]}&month=${dataArr[1]}&totalAmount=${dataArr[2]}}`
    console.log('請求網址:', baseUrl + params)

    axios.get(baseUrl + params)
      .then((response) => {
        resolve(`${dataArr[0]}/${dataArr[1]} $${dataArr[2]}已結清~\n跟偷吃豬涵豆腐的建喵算帳:\nhttps://docs.google.com/spreadsheets/d/1vaEXzsvnZotcS88xntc5_DTvF7w1NNJ8bu4dej_4lio/edit#gid=0`)
      })
      .catch((err) => {
        reject('error: ', err)
      })
  })
}

module.exports = { writeRecord, addAmount, closeAccount }