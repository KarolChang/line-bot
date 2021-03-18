// 引用linebot SDK
const lineBot = require('linebot')

// 用於辨識Line Channel的資訊
const bot = lineBot({
  channelId: process.env.Channel_Id,
  channelSecret: process.env.Channel_Secret,
  channelAccessToken: process.env.Channel_Access_Token
})

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
  // event.message.text是使用者傳給bot的訊息
  // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
  let replyMsg = `剛剛有笨蛋說: ${event.message.text}`
  if (event.message.text.includes('我愛豬涵')) {
    replyMsg = `帥氣的建喵說: ${event.message.text}\n恭喜獲得可愛豬涵一隻!`
  }
  event.reply(replyMsg).then(data => {
    // 當訊息成功回傳後的處理
    console.log('success')
  }).catch(error => console.log(error))
})

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', process.env.PORT || 3000, () => {
  console.log('LINE BOT START!')
})