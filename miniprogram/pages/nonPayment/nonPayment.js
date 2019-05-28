// miniprogram/pages/nonPayment/nonPayment.js
wx.cloud.init()
const db = wx.cloud.database()
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户相关信息
    Myopenid:'',
    openid:[],
    imageUrl:[],
    userInfo: [],
    time: '12:01',
    nonPayment:[],
    nonPaymentDetails:[],
    nickName:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {

    /**
     * 获取用户信息
     */
    this.setData({
      openid :app.globalData.userOpenid,
      imageUrl : app.globalData.imageUrl,
      Myopenid : app.globalData.Myopenid,
      userInfo : app.globalData.userInfo,
      nickName : app.globalData.nickName
    })
    var Myopenid=this.data.Myopenid
    var openid=this.data.openid
    var imageUrl=this.data.imageUrl
    var nonPayment=this.data.nonPayment
    var nonPaymentDetails=[]
    var sum;//计算总额

    db.collection('nonPayment').where({
      payNeedId : Myopenid,
      Payfinish : false
    })
    .get()
    .then(res=>{
      // 找到payneedid是本人的数据后遍历查找每个付款人的信息并设置总额
      console.log(res.data)
      // 将每个付款人的未付款汇总
      for(var i=0;i<openid.length;i++){
        sum=0
        nonPaymentDetails=[]
        if(openid[i]!=Myopenid){
          for(var j=0;j<res.data.length;j++){

            if(res.data[j]._openid==openid[i]){
              sum+=Number(res.data[j].amount)
              console.log('OK',i,res.data[j]._openid)
              nonPaymentDetails.push({
                billdate: res.data[j].billdate,
                billname: res.data[j].billname,
                billpart: res.data[j].billpart,
                billsum: res.data[j].amount
              })


            }
          }
          nonPayment.push({
            openid : openid[i],
            avtUrl : imageUrl[i],
            amount : sum,
            showDetails : false,
            bills: nonPaymentDetails
          })
        }
      }
      this.setData({
        nonPayment :nonPayment
      })
      // ------------------------------------



      console.log(nonPayment)
    })

    // db.collection('nonPayment').where({

    // })

  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  showDetail:function(e){
    console.log(e)
    var index=e.currentTarget.dataset.index
    var param={}
    var nonPayment=this.data.nonPayment
    var string = "nonPayment["+index+"].showDetails";
    param[string]=!nonPayment[index].showDetails
    this.setData(param)
  }



})