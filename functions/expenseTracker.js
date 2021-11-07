const axios = require('axios')

const baseUrl = 'https://script.google.com/macros/s/AKfycbwnE26A5CyfSePy1zUn_3rMx84llJUH6DaAzdpii05kj-NRBNkB8FvZyJ3HWZ1JKVxS/exec'

function writeRecord(text) {
  return new Promise((resolve, reject) => {
    const dataArr = text.split(' ').slice(1)
    if(dataArr.length !== 7) {
      resolve('輸入格式不正確！')
    }
    const params = `?year=${dataArr[0]}&month=${dataArr[1]}&date=${dataArr[2]}&day=${encodeURIComponent(dataArr[3])}&item=${encodeURIComponent(dataArr[4])}&merchant=${encodeURIComponent(dataArr[5])}&amount=${dataArr[6]}`
    console.log('請求網址:', baseUrl + params)
    resolve(`請點擊以下連結去寫入資料:\n${baseUrl + params}\n到以下google sheet查看資料總覽跟偷吃豬涵豆腐的建喵算帳:\nhttps://docs.google.com/spreadsheets/d/1vaEXzsvnZotcS88xntc5_DTvF7w1NNJ8bu4dej_4lio/edit#gid=0`)
    // axios.get(baseUrl + params)
    //   .then((response) => {
    //     resolve('資料已寫入~\n跟偷吃豬涵豆腐的建喵算帳:\nhttps://docs.google.com/spreadsheets/d/1vaEXzsvnZotcS88xntc5_DTvF7w1NNJ8bu4dej_4lio/edit#gid=0')
    //   })
    //   .catch((err) => {
    //     reject('error: ', err)
    //   })
  })
}

module.exports = writeRecord