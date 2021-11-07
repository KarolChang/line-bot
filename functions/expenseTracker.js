const axios = require('axios')

const baseUrl = 'https://script.google.com/macros/s/AKfycbz8o9qxdFYhDld_RM3oDcEONLFqKlXDg2kibompKpHh-7JJBSQ1rtZcsqqL2ap0rbkf/exec'
// process.env.GOOGLE_SHEET_URL

function writeRecord(text, person) {
  return new Promise((resolve, reject) => {
    const dataArr = text.split(' ').slice(1)
    if(dataArr.length !== 7) {
      resolve('輸入格式不正確！')
    }
    const params = `?year=${dataArr[0]}&month=${dataArr[1]}&date=${dataArr[2]}&day=${encodeURIComponent(dataArr[3])}&item=${encodeURIComponent(dataArr[4])}&merchant=${encodeURIComponent(dataArr[5])}&amount=${dataArr[6]}&record_person=${encodeURIComponent(person)}&record_time=${new Date().getTime()}`
    console.log('請求網址:', baseUrl + params)
    // resolve(`請點擊以下連結以寫入資料:\n${baseUrl + params}\n跟偷吃豬涵豆腐的建喵算帳:\nhttps://docs.google.com/spreadsheets/d/1vaEXzsvnZotcS88xntc5_DTvF7w1NNJ8bu4dej_4lio/edit#gid=0`)

    axios.get(baseUrl + params)
      .then((response) => {
        resolve('資料已寫入~\n跟偷吃豬涵豆腐的建喵算帳:\nhttps://docs.google.com/spreadsheets/d/1vaEXzsvnZotcS88xntc5_DTvF7w1NNJ8bu4dej_4lio/edit#gid=0')
      })
      .catch((err) => {
        reject('error: ', err)
      })
  })
}

module.exports = writeRecord