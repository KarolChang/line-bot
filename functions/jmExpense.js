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

// 取得當月未結清加總，若金額相同就結算
async function closeMonthlyNotClosedTotal(dataArr, user) {
  try {
    const { data } = await API.getAll()
    const year = Number(dataArr[0])
    const month = Number(dataArr[1])
    const amount = Number(dataArr[2])
    let totalAmount = 0
    let recordIds = ''
    data.forEach((item) => {
      if (
        new Date(item.date).getFullYear() === year &&
        new Date(item.date).getMonth() + 1 === month &&
        !item.isClosed
      ) {
        totalAmount += item.amount
        recordIds += `${item.id.toString()},`
      }
    })
    // 去掉最後一個逗號
    const formattedRecordIds = recordIds.slice(0, recordIds.length - 1)
    if (totalAmount !== amount) return '金額不正確QQ'
    await API.close(formattedRecordIds, totalAmount, user)
  } catch (err) {
    console.error(`[ERROR]${err}`)
  }
}

// 結算當月紀錄
async function closeMonthlyRecords(dataArr) {
  try {
    const { data } = await API.getAll()
    const year = Number(dataArr[0])
    const month = Number(dataArr[1])
    const amount = Number(dataArr[2])
    let totalAmount = 0
    data.forEach((item) => {
      if (
        new Date(item.date).getFullYear() === year &&
        new Date(item.date).getMonth() + 1 === month &&
        !item.isClosed
      ) {
        totalAmount += item.amount
      }
    })
    return totalAmount === amount
  } catch (err) {
    console.error(`[ERROR]${err}`)
  }
}

module.exports = { createRecord, getRecordsAmount, closeMonthlyNotClosedTotal }
