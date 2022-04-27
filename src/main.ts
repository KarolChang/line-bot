import { Client, middleware, TextMessage, ClientConfig, MiddlewareConfig, WebhookEvent } from '@line/bot-sdk'
import express from 'express'
import { Express, Request, Response } from 'express'
// import cors from 'cors'
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// create LINE SDK config from env variables
const config: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.CHANNEL_SECRET
}

// create LINE SDK client
const client: Client = new Client(config)
// express app
const app: Express = express()
// app.use(cors())

// register a webhook handler with middleware
app.post('/callback', middleware(config as MiddlewareConfig), async (req: Request, res: Response) => {
  console.log('req.body.events!!!', req.body.events)
  try {
    await handleReply(client, req.body.events[0])
  } catch (err) {
    console.log('[ERROR ROUTE]', err)
    res.status(500).end()
  }
})

// event handler
const handleReply = async (client: Client, event: WebhookEvent) => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null)
  }
  // create a echoing text message
  const echo: TextMessage = { type: 'text', text: `有笨蛋說：${event.message.text}` }
  try {
    client.replyMessage(event.replyToken, echo)
  } catch (err) {
    console.log('[ERROR FUNCTION]', err)
  }
}

// listen on port
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`line bot is listening on http://localhost:${port}`)
})
