// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { ID } = event

  await db.collection('bill').doc(ID).update({
    data: {
      Payfinish: true
    }
  })
  await db.collection('nonPayment').where({
    billID: ID
  }).update({
    data: {
      Payfinish: true
    }
  })

  return{
    ID
  }

  
}