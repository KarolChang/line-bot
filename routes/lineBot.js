const express = require('express')
const router = express.Router()

const lineBot = require('linebot')
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

const linebotParser = bot.parser()
router.post('/', linebotParser)

module.exports = router
