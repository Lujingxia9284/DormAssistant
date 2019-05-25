// miniprogram/pages/publicBill/publicBill.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    Mypeny:'',
    billpart:[],//从全局变量获取账单
    billIndex:'',
    hideMod:true,
    openid:app.globalData._openid,
    userInfo:{},

  },
  onShow:function(options) {

    this.setData({
      userInfo: app.globalData.userInfo,
    })
    console.log(this.data.userInfo)
    const db=wx.cloud.database();

    db.collection('bill').orderBy('billdate','asc')
    .get().then(res=>{
      console.log(res.data)
      this.setData({
        billpart:res.data
      })
      console.log(this.data.billpart)

      var array=this.data.billpart;
      // var s='';
      // //按日期对账单进行排序
      // for(var i=1;i<array.length;i++){
      //   for(var j=i;j>0;j--){
      //     if(array[j].billdate<array[j-1].billdate){
      //       s=array[j-1];
      //       array[j-1]=array[j];
      //       array[j]=s;
      //     }
      //   }
      // }
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
      _openid: 'oPoCf4ufDIPpNFZaCOnJTNDMDjgY',


      })
        .get().then(res=>{
      // res.data 是包含以上定义的两条记录的数组

            var array=res.data
            var sum=0
            for(var i=0;i<array.length;i++){
              sum+=Number(array[i].billsum)
            }
            this.setData({
              Mypeny : sum
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
    var string = "billpart["+this.data.billIndex+"].Payfinish";
    param[string]=true
    this.setData(param)

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