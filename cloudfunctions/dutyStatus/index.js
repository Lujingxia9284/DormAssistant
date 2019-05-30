const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('dutyStatus').doc('1cfa02f8-c33f-4ab4-9f5c-5c3e0e04dee2').set({
      // data 传入需要局部更新的数据
      data: {
        dutyDay: event.dutyDay,
        dutyWeek:event.dutyWeek,
        mode: event.mode,
        dormid:event.dormid,
      }
    })
  } catch (e) {
    console.error(e)
  }
}