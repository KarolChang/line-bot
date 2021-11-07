// 引用linebot SDK
const lineBot = require('linebot')

// 載入 functions
const movieMsg = require('./functions/movieMsg')
const writeRecord = require('./functions/expenseTracker')

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
    replyMsg = await writeRecord(text)
    console.log('記帳', replyMsg)
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
