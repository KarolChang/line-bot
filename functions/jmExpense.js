const API = require('../apis/expense')

// 新增資料
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

// 取得全部資料
async function getRecordsAmount() {
  try {
    const { data } = await API.getAll()
    const nowYear = new Date().getFullYear()
    const nowMonth = new Date().getMonth() + 1
    let allAmount = 0
    data.forEach((item) => {
      if (new Date(item.date).getFullYear() === nowYear && new Date(item.date).getMonth() + 1 === nowMonth) {
        allAmount += item.amount
      }
    })
    return `${nowYear}/${nowMonth} 總金額: ${allAmount}`
  } catch (err) {
    console.error(`[ERROR]${err}`)
  }
}

module.exports = { createRecord, getRecordsAmount }
