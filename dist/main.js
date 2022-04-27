"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_sdk_1 = require("@line/bot-sdk");
const express_1 = __importDefault(require("express"));
// import cors from 'cors'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// create LINE SDK config from env variables
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
// create LINE SDK client
const client = new bot_sdk_1.Client(config);
// express app
const app = (0, express_1.default)();
// app.use(cors())
// register a webhook handler with middleware
app.post('/callback', (0, bot_sdk_1.middleware)(config), async (req, res) => {
    console.log('req.body.events!!!', req.body.events);
    try {
        await handleReply(client, req.body.events[0]);
    }
    catch (err) {
        console.log('[ERROR ROUTE]', err);
        res.status(500).end();
    }
});
// event handler
const handleReply = async (client, event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
    // create a echoing text message
    const echo = { type: 'text', text: `有笨蛋說：${event.message.text}` };
    try {
        client.replyMessage(event.replyToken, echo);
    }
    catch (err) {
        console.log('[ERROR FUNCTION]', err);
    }
};
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`line bot is listening on http://localhost:${port}`);
});
