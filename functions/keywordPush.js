function keywordPush(bot, text, person) {
  if(text.includes('餐') || text.includes('點心')) {
    bot.push(person, '豬涵吃飽飽 好開心🥳')
  }
  if(text.includes('棒球')) {
    bot.push(person, '幫豬涵的統一獅加油😆 不准看啦啦隊！')
  }
  if(text.includes('建喵')) {
    bot.push(person, '建喵壞壞 懲罰打屁屁🥺')
  }
  if(text.includes('豬涵')) {
    bot.push(person, '豬涵最喜歡建喵...的屁屁😘')
  }
  if(text.includes('鯊鯊')) {
    bot.push(person, '豬涵最喜歡咬鯊鯊🦈 不要阻止她！')
  }
  if(text.includes('車車')) {
    bot.push(person, '你知道豬涵最喜歡的車車是哪一隻嘛🤔 猜對有獎勵喔！')
  }
  if(text.includes('馬鈴薯')) {
    bot.push(person, '答對了！馬鈴薯最好吃了😋')
  }
}

module.exports = keywordPush