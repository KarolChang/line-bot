// userId
const karol = process.env.KAROL_USERID
const jianmiau = process.env.JIANMIAU_USERID

const { writeRecord, addAmount, checkCloseAmount, closeAccount } = require('../functions/expenseTracker')
const keywordPush = require('../functions/keywordPush')

async function expense(text, bot, userId) {
  let replyMsg = '輸入格式不正確！'
  const dataArr = text.split(' ').slice(1)
  // 記帳： JM記帳 年 月 日 星期 項目 商家 金額
  if (text.slice(0, 4) === 'JM記帳') {
    if (dataArr.length !== 7) {
      return replyMsg
    }
    if (userId === jianmiau) {
      replyMsg = await writeRecord(dataArr, '建喵')
      bot.push(karol, `建喵已發佈: ${text}`)
    } else {
      replyMsg = await writeRecord(dataArr, '豬涵')
      bot.push(karol, `豬涵已發佈: ${text}`)
      keywordPush(bot, text, karol)
      // bot.push(jianmiau, `豬涵已發佈: ${text}`)
      // keywordPush(bot, text, jianmiau)
    }
  }
  // 記帳加總： JM月記帳加總 年 月
  if (text.slice(0, 7) === 'JM月記帳加總') {
    if (dataArr.length !== 2) return replyMsg
    replyMsg = await addAmount(dataArr)
  }
  // 本月記帳加總： JM本月記帳加總
  if (text === 'JM本月記帳加總') {
    dataArr.push(new Date().getFullYear().toString(), (new Date().getMonth() + 1).toString())
    replyMsg = await addAmount(dataArr)
  }
  // 結清： JM結清 年 月 當月金額
  if (text.slice(0, 4) === 'JM結清') {
    if (dataArr.length !== 3) return replyMsg
    const amountRight = await checkCloseAmount(dataArr)
    if (amountRight) {
      replyMsg = await closeAccount(dataArr)
      if (userId === karol) {
        bot.push(jianmiau, `豬涵已結清: ${text}`)
      } else {
        bot.push(karol, `建喵已結清: ${text}`)
      }
    } else {
      replyMsg = '金額不正確QQ'
    }
  }
  return replyMsg
}

module.exports = { expense }
