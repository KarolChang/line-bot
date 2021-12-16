import API from '../apis/expense'

async function createRecord(dataArr, person) {
  // ['2021/12/16', '晚餐', '水餃', '八方', '金額', '豬涵']
  try {
    const input = {
      date: dataArr[0],
      item: dataArr[1],
      merchant: dataArr[2],
      amount: dataArr[3],
      recorder: dataArr[4]
    }
    await API.create(input)
    return 'Hello'
  } catch (error) {
    console.error('error', error)
  }
}
