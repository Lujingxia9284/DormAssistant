// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const { billname, billsum, billdate, billpart, equalDate, Payfinish } = event
  const { OPENID, APPID } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
  await db.collection('bill').add({
    data: {
      billname: billname,
      _openid: OPENID,
      billsum: billsum,
      billdate: billdate,
      billpart: billpart,
      equalDate: false,
      Payfinish: false
    },
    success(res) {
      console.log('ok', res)
    }
  })

  return {
    OPENID,
    APPID
  }
}
