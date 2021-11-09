// 引用linebot SDK
const lineBot = require('linebot')

// 載入 functions
const movieMsg = require('./functions/movieMsg')
const { writeRecord, addAmount, checkCloseAmount, closeAccount } = require('./functions/expenseTracker')

// 用於辨識Line Channel的資訊
const bot = lineBot({
  channelId: process.env.Channel_Id,
  channelSecret: process.env.Channel_Secret,
  channelAccessToken: process.env.Channel_Access_Token
})

// userId
const karol = process.env.KAROL_USERID
const jianmiau = process.env.JIANMIAU_USERID

// 當有人傳送訊息給Bot時
bot.on('message', async function (event) {
  console.log(event)
  // event.message.text是使用者傳給bot的訊息
  const text = event.message.text
  const userId = event.source.userId
  // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
  let replyMsg = `剛剛有笨蛋說: ${text}`
  if (text.includes('我愛豬涵') && userId === jianmiau) {
    replyMsg = `帥氣的建喵說: ${text}\n恭喜獲得可愛豬涵一隻!`
  }
  if (text.includes('我愛建喵') && userId === karol) {
    replyMsg = `可愛豬涵說: ${text}\n恭喜獲得建喵屁屁一坨!`
  }
  if (text.includes('電影')) {
    replyMsg = await movieMsg()
    console.log('電影', replyMsg)
  }
  if (text.slice(0, 4) === 'JM記帳') {
    console.log('JM記帳', text)
    if(userId === jianmiau) {
      replyMsg = await writeRecord(text, '建喵')
      bot.push(karol, `建喵已發佈: ${text}`)
    } else {
      replyMsg = await writeRecord(text, '豬涵')
      bot.push(jianmiau, `豬涵已發佈: ${text}`)
      // if(text.includes('餐') || text.includes('點心')) {
      //   bot.push(jianmiau, '豬涵吃飽飽🥳 好開心(moon grin)')
      // }
    }
  }
  if(text.slice(0, 4) === '記帳加總') {
    console.log('記帳加總text', text)
    replyMsg = await addAmount(text)
  }
  if(text.slice(0, 4) === 'JM結清') {
    console.log('JM結清text', text)
    const amountRight = await checkCloseAmount(text)
    if(amountRight) {
      replyMsg = await closeAccount(text)
      if(userId === karol) {
        bot.push(jianmiau, `豬涵已結清: ${text}`)
      } else {
        bot.push(karol, `建喵已結清: ${text}`)
      }
    } else {
      replyMsg = '金額不正確QQ'
    }
  }

  if(text.includes('餐') || text.includes('點心')) {
    replyMsg = '豬涵吃飽飽🥳 好開心(moon grin)'
    // bot.push(karol, '豬涵吃飽飽🥳 好開心(moon grin)')
  }
  if(text.includes('棒球')) {
    replyMsg = '幫豬涵的統一獅加油😆'
    // bot.push(karol, '幫豬涵的統一獅加油😆')
  }
  if(text.includes('建喵')) {
    replyMsg = '建喵欠錢錢🥺 打屁屁(屁)'
    // bot.push(karol, '幫豬涵的統一獅加油😆')
  }

  event.reply(replyMsg).then(data => {
    console.log('success')
  }).catch(error => console.log(error))
})

// 主動發送訊息
// setTimeout(function () {
//   getMovie(bot, karol)
// }, 3000)

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', process.env.PORT || 3000, () => {
  console.log('LINE BOT START!')
})
