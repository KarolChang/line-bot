function keywordPush(text, person) {
  if(text.includes('餐') || text.includes('點心')) {
    bot.push(person, '豬涵吃飽飽 好開心🥳')
  }
  if(text.includes('棒球')) {
    bot.push(person, '幫豬涵的統一獅加油😆 不准看啦啦隊！')
  }
  if(text.includes('建喵')) {
    bot.push(person, '建喵壞壞 懲罰打屁屁🥺')
  }
}

module.exports = keywordPush