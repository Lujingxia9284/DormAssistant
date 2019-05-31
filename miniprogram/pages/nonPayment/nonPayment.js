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
    nickName:[],
    parts: [
      { part: "food",sum:0},
      { part: "restaurant",sum:0 },
      { part: "indigrent",sum:0 },
      { part: "dally",sum:0 },
      { part: "car",sum:0 },
      { part: "entertainment",sum:0 },
      { part: "elec",sum:0 },
      { part: "else",sum:0 },
    ],
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
      nickName : app.globalData.nickName
    })
    var Myopenid=this.data.Myopenid
    var openid=this.data.openid
    var imageUrl=this.data.imageUrl
    var nonPayment=[]
    var nickName=this.data.nickName
    var nonPaymentDetails=[]
    var sum;//计算总额


    wx.cloud.callFunction({
      // 云函数名称
      name: 'getNonPayment',
      // 传给云函数的参数
      data: {
        payNeedId : Myopenid,
        Payfinish : false
      },
      complete: res => {
        console.log('ok',res)
        var array=res.result.data
        var parts=this.data.parts
        var param = {}
        // 将每个付款人的未付款汇总
        for(var i=0;i<openid.length;i++){
          sum=0
          nonPaymentDetails=[]
          if(openid[i]!=Myopenid){
            for(var j=0;j<array.length;j++){

              if(array[j]._openid==openid[i]){
                array[j].amount=array[j].amount.substring(0,4)
                sum+=Number(array[j].amount)
                console.log('OK',i,array[j]._openid)
                nonPaymentDetails.push({
                  billdate: array[j].billdate,
                  billname: array[j].billname,
                  billpart: array[j].billpart,
                  billsum: array[j].amount,

                })


              }
            }
            nonPayment.push({
              openid : openid[i],
              avtUrl : imageUrl[i],
              amount : sum,
              nickname : nickName[i],
              showDetails : false,
              bills: nonPaymentDetails
            })
          }
        }

        for(var i=0;i<parts.length;i++){
          var partsum=0;
          for(var j=0;j<array.length;j++){

            if(array[j].billpart==parts[i].part){
              array[j].amount=array[j].amount.substring(0,4)
              partsum+=Number(array[j].amount);
            }
          }
          var string = "parts[" + i + "].sum";
          param[string]=partsum;
          this.setData(param);
        }

        this.setData({
          nonPayment :nonPayment,
          parts : parts
        })


      }
    })


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