// userId
const karol = process.env.KAROL_USERID
const jianmiau = process.env.JIANMIAU_USERID

const {
  writeRecord,
  addAmount,
  checkCloseAmount,
  closeAccount,
} = require('../functions/expenseTracker')
const keywordPush = require('../functions/keywordPush')

async function expense(text, bot) {
  let replyMsg = ''
  // 記帳： JM記帳 年 月 日 星期 項目 商家 金額
  if (text.slice(0, 4) === 'JM記帳') {
    if (userId === jianmiau) {
      replyMsg = await writeRecord(text, '建喵', bot, karol)
    } else {
      replyMsg = await writeRecord(text, '豬涵', bot, karol)
      // keywordPush(bot, text, jianmiau)
    }
  }
  // 記帳加總： JM記帳加總 年 月
  if (text.slice(0, 4) === "JM記帳加總") {
    console.log("記帳加總text", text);
    replyMsg = await addAmount(text);
  }
  // 本月記帳加總： JM本月記帳加總
  if (text === "JM本月記帳加總") {
    console.log("本月記帳加總text", text);
    replyMsg = await addAmount(text);
  }
  // 結清： JM結清 年 月 當月金額
  if (text.slice(0, 4) === "JM結清") {
    console.log("JM結清text", text);
    const amountRight = await checkCloseAmount(text);
    if (amountRight) {
      replyMsg = await closeAccount(text);
      if (userId === karol) {
        bot.push(jianmiau, `豬涵已結清: ${text}`);
      } else {
        bot.push(karol, `建喵已結清: ${text}`);
      }
    } else {
      replyMsg = "金額不正確QQ";
    }
  }
}

module.exports = { expense }
