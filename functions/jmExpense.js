const API = require('../apis/expense')

// async function createRecord(dataArr, person) {
//   // ['2021/12/16', '晚餐', '水餃', '八方', '金額', '豬涵']
//   return new Promise(async (resolve, reject) => {
//     try {
//       const input = {
//         date: dataArr[0],
//         item: dataArr[1],
//         merchant: dataArr[2],
//         amount: dataArr[3],
//         recorder: person
//       }
//       await API.create(input)
//       resolve('資料已寫入~\nhttps://karolchang.github.io/jm-expense-vue-ts/record')
//     } catch (err) {
//       reject(`[ERROR]${err}`)
//     }
//   })
// }

async function createRecord(dataArr, person) {
  try {
    const input = {
      date: dataArr[0],
      item: dataArr[1],
      merchant: dataArr[2],
      amount: dataArr[3],
      recorder: person
    }
    await API.create(input)
    return '資料已寫入~\nhttps://karolchang.github.io/jm-expense-vue-ts/record'
  } catch (err) {
    console.error(`[ERROR]${err}`)
  }
}

module.exports = { createRecord }
