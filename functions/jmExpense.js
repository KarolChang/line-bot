const API = require('../apis/expense')
// userId
const karol = process.env.KAROL_USERID
const jianmiau = process.env.JIANMIAU_USERID

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
async function closeMonthlyNotClosedTotal(dataArr, userId, bot) {
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
    console.log('formattedRecordIds', formattedRecordIds)
    console.log('totalAmount', totalAmount)
    await API.close({
      records: formattedRecordIds,
      totalAmount,
      recorder: userId === jianmiau ? '建喵' : '豬涵'
    })
    if (userId === karol) {
      bot.push(jianmiau, `豬涵已結清: ${text}`)
    } else {
      bot.push(karol, `建喵已結清: ${text}`)
    }
    return `${dataArr[0]}/${dataArr[1]} $${dataArr[2]} 已結清~\nhttps://karolchang.github.io/jm-expense-vue-ts/record`
  } catch (err) {
    console.error(`[ERROR]${err}`)
  }
}

module.exports = { createRecord, getRecordsAmount, closeMonthlyNotClosedTotal }
