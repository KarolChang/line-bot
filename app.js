// 引用linebot SDK
const lineBot = require('linebot')

// 載入 movieMsg
// const movieMsg = require('./movieMsg')

// 用於辨識Line Channel的資訊
const bot = lineBot({
  channelId: process.env.Channel_Id,
  channelSecret: process.env.Channel_Secret,
  channelAccessToken: process.env.Channel_Access_Token
})

// userId
const karol = process.env.KAROL_USERID
const jianmiau = process.env.JIANMIAU_USERID

// function
const axios = require('axios')

const Url = 'https://movie-list.alphacamp.io/api/v1/movies/'
const imageUrl = 'https://movie-list.alphacamp.io/posters/'

function movieMsg () {
  axios.get(Url).then(response => {
    const movies = []
    movies.push(...response.data.results)
    const movie = movies[Math.floor(Math.random() * movies.length)]
    const movieTitle = movie.title
    const movieDescription = movie.description
    const movieImage = imageUrl + movie.image
    // console.log(userId, `今日電影推薦: ${movieTitle}\n電影描述: ${movieDescription}\n電影海報: ${movieImage}`)
    // bot.push(userId, `今日電影推薦: ${movieTitle}\n電影描述: ${movieDescription}\n電影海報: ${movieImage}`)
    return `今日電影推薦: ${movieTitle}\n電影描述: ${movieDescription}\n電影海報: ${movieImage}`
  })
    .catch(err => console.log(err))
}

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
  console.log(event)
  // event.message.text是使用者傳給bot的訊息
  const text = event.message.text
  const user = event.source.userId
  // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
  let replyMsg = `剛剛有笨蛋說: ${text}`
  if (text.includes('我愛豬涵') && user === jianmiau) {
    replyMsg = `帥氣的建喵說: ${text}\n恭喜獲得可愛豬涵一隻!`
  }
  if (text.includes('我愛建喵') && user === karol) {
    replyMsg = `可愛豬涵說: ${text}\n恭喜獲得建喵屁屁一坨!`
  }
  if (text.includes('電影')) {
    replyMsg = movieMsg()
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

