// 引用linebot SDK
const lineBot = require('linebot')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 載入 functions
const movieMsg = require('./functions/movieMsg')
const { expense } = require('./actions/expense')

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
  if (text === '電影') {
    replyMsg = await movieMsg()
    console.log('電影', replyMsg)
  }
  if (text.slice(0, 2) === 'JM') {
    console.log(text)
    replyMsg = await expense(text, bot, userId)
  }

  event
    .reply(replyMsg)
    .then((data) => {
      console.log('success')
    })
    .catch((error) => console.log('error', error))
})

// express app
app.get('/jianmiau', (req, res) => {
  // bot.push(jianmiau, '哈囉 笨蛋建喵')
  bot.push(karol, '哈囉 笨蛋建喵')
  return res.send('哈哈')
})

app.post('/message', (req, res) => {
  console.log('req.body', req.body)
  if (req.body.userId === karol || req.body.userId === jianmiau) {
    bot.push(req.body.userId, req.body.message)
    return res.json({ status: 'success', message: `已成功傳送{${message}}給[${userId}]` })
  }
  return res.json({ status: 'error', message: '未傳送訊息[userId不正確]' })
})

// 主動發送訊息
// setTimeout(function () {
//   getMovie(bot, karol)
// }, 3000)

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', process.env.PORT || 3000, () => {
  console.log('LINE BOT START!')
})

app.listen(process.env.EXPRESS_PORT || 3001, () => {
  console.log('Express is running')
})
