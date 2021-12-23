// userId
const karol = process.env.KAROL_USERID
const jianmiau = process.env.JIANMIAU_USERID

const { writeRecord, addAmount, checkCloseAmount, closeAccount } = require('../functions/expenseTracker')
const keywordPush = require('../functions/keywordPush')
const { createRecord, getMonthlyNotClosedTotal, closeMonthlyNotClosedTotal } = require('../functions/jmExpense')

async function expense(text, bot, userId) {
  let replyMsg = '輸入格式不正確！'
  const dataArr = text.split(' ').slice(1)
  /////////////// web版本 ///////////////
  // 記帳： JM記帳 年 月 日 星期 項目 商家 金額
  if (text.slice(0, 4) === 'JM記帳') {
    if (userId === jianmiau) {
      replyMsg = await createRecord(dataArr, '建喵')
      bot.push(karol, `建喵已發佈: ${text}`)
      keywordPush(bot, text, jianmiau)
      keywordPush(bot, text, karol)
    } else {
      replyMsg = await createRecord(dataArr, '豬涵')
      bot.push(jianmiau, `豬涵已發佈: ${text}`)
      keywordPush(bot, text, jianmiau)
      keywordPush(bot, text, karol)
    }
  }
  // 本月未結清金額： JM本月未結清金額
  if (text === 'JM本月未結清金額') {
    replyMsg = await getMonthlyNotClosedTotal()
  }
  // 月未結清金額： JM月未結清金額 年 月
  if (text.slice(0, 8) === 'JM月未結清金額') {
    replyMsg = await getMonthlyNotClosedTotal(dataArr[0], dataArr[1])
  }
  // 結清： JM結清 年 月 月金額
  if (text.slice(0, 4) === 'JM結清') {
    if (dataArr.length !== 3) return replyMsg
    replyMsg = await closeMonthlyNotClosedTotal(dataArr, userId, bot)
  }

  /////////////// excel版本 ///////////////
  // 記帳： JM+記帳 年 月 日 星期 項目 商家 金額
  if (text.slice(0, 5) === 'JM+記帳') {
    if (dataArr.length !== 7) {
      return replyMsg
    }
    if (userId === jianmiau) {
      replyMsg = await writeRecord(dataArr, '建喵')
      bot.push(karol, `建喵已發佈: ${text}`)
      keywordPush(bot, text, jianmiau)
      keywordPush(bot, text, karol)
    } else {
      replyMsg = await writeRecord(dataArr, '豬涵')
      bot.push(jianmiau, `豬涵已發佈: ${text}`)
      keywordPush(bot, text, jianmiau)
      keywordPush(bot, text, karol)
    }
  }
  // 記帳加總： JM+月記帳加總 年 月
  if (text.slice(0, 8) === 'JM+月記帳加總') {
    if (dataArr.length !== 2) return replyMsg
    replyMsg = await addAmount(dataArr)
  }
  // 本月記帳加總： JM+本月記帳加總
  if (text === 'JM+本月記帳加總') {
    dataArr.push(new Date().getFullYear().toString(), (new Date().getMonth() + 1).toString())
    replyMsg = await addAmount(dataArr)
  }
  // 結清： JM+結清 年 月 當月金額
  if (text.slice(0, 5) === 'JM+結清') {
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
