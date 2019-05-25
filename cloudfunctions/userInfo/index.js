// 云函数入口文件

const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

var imageUrl=[]
var openid=[]



// 云函数入口函数
exports.main =  (event, context) => {
  // try {
   
    return res=db.collection('userInfo').field({
      url: true,
      _openid:true
    })
      .get()
      .then(
        res => {
          for (var i = 0; i < res.data.length; i++) 
            {
              imageUrl[i] = res.data[i].url;
              openid[i] = res.data[i]._openid;
            }
          console.log(imageUrl)
          console.log(openid)
          return imageUrl,openid
        },
        

      )

  // } catch (e) {
  //   console.error(e)
  // }
  // return imageUrl
}



