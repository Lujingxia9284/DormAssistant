// miniprogram/pages/publicBill/publicBill.js
wx.cloud.init()
const app=getApp();
const db=wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Myopenid:'',
    openid:[],
    imageUrl:[],//从全局获取自己的信息
    billpart:[],//从数据库获取账单
    Mypeny:'',
    Otherpeny:'',
    billIndex:'',
    hideMod:true,
    dormid:''



  },
  onLoad:function(options){
    this.setData({
      openid :app.globalData.userOpenid,
      imageUrl: app.globalData.imageUrl,
      Myopenid : app.globalData.Myopenid,
      dormid : app.globalData.dormid
    })
    console.log(this.data.dormid)
  },

  onShow:function(options) {

    // 以升序取出数据库中的账单
    db.collection('bill').where({
      dormid : this.data.dormid
    })
    .orderBy('billdate','asc')
    .get().then(res=>{
      console.log(res.data)
      this.setData({
        billpart:res.data
      })
      console.log(this.data.billpart)

      var array=this.data.billpart;
      //相同日期的在同一时间线里
      for(var i=1;i<array.length;i++){
        if(array[i].billdate==array[i-1].billdate){
            array[i].equalDate=true
          }
      }
      console.log('排序成功')
      this.setData({
        billpart : array
      })
    })

    //实现我的付款和他人付款的更新
    db.collection('bill').where({
      dormid :this.data.dormid
      })
        .get().then(res=>{
      // res.data 是包含以上定义的两条记录的数组

            var array=res.data
            var Mysum=0
            var Othersum=0
            for(var i=0;i<array.length;i++){
              if(array[i]._openid==this.data.Myopenid){
                Mysum+=Number(array[i].billsum)
              }else{
                Othersum+=Number(array[i].billsum)
              }

            }
            this.setData({
              Mypeny : Mysum,
              Otherpeny : Othersum
            })
            console.log(res.data)
        })

  },
  ToAddBill:function(){
    wx.navigateTo({
      url:'../../pages/addBill/addBill'
    })
  },
  TononPayment:function(){
    wx.navigateTo({
      url:'../../pages/nonPayment/nonPayment'
    })
  },
  changeFinish:function(){
    console.log('点击后收款结束')
    var param={}
    var billpart=this.data.billpart
    var index=this.data.billIndex
    var string = "billpart["+index+"].Payfinish";
    param[string]=true
    this.setData(param)
    // console.log(billpart[index])
    console.log(billpart[index]._id)
    wx.cloud.callFunction({
      // 云函数名称
      name: 'payFinish',
      // 传给云函数的参数
      data: {
        ID : billpart[index]._id
      },
      complete: res => {
        console.log(res)
      }
    })




    this.setData({
      hideMod:true
    })
  },
  // ---------------------
  //
  //
  showModal:function(e) {
    console.log(e)
    console.log('展示模态框并且获取数组下标')

    var billIndex=e.currentTarget.dataset.index

    var Payfinish=this.data.billpart[billIndex].Payfinish
    console.log(Payfinish)
    if(Payfinish==false){
      this.setData({
        billIndex : billIndex,
        hideMod : false,
      })
    }

  },
  hideModal:function(e) {
    console.log('隐藏模态框')
    this.setData({
      hideMod:true
    })
  },


})