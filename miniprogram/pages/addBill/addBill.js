// miniprogram/pages/addBill/addBill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2019-05-08',
    parts:[
    {part:"food",name:"外卖",click:true},
    {part:"restaurant",name:"聚餐",click:false},
    {part:"indigrent",name:"食材",click:false},
    {part:"dally",name:"日用品",click:false},
    {part:"car",name:"交通",click:false},
    {part:"entertainment",name:"娱乐",click:false},
    {part:"elec",name:"电费",click:false},
    {part:"else",name:"其他",click:false},
    ],
    partindex:0,
    Bill:[
    {}
    ],
    billmoney:'',
    flat:true,
    payDuty:true

  },
  DateChange(e) {
    console.log('改变时间，最好能获取当前日期时间')
    this.setData({
      date: e.detail.value
    })
  },
  BillMoney:function(e){
    console.log('输入的金额')
    var billmoney=this.data.billmoney
    this.setData({
      billmoney : e.detail.value
    })
    console.log(billmoney)
  },
  PersonalCost:function(e){
    console.log('失去焦点时获取输入的金额')
    var value=e.detail.value
    this.setData({
      billmoney : value,
      value : ''
    })
  },
  flatHandle:function(e){
    console.log('决定是否要平摊')
    var flat=this.data.flat
    this.setData({
      flat : !flat
    })
  },
  payNeed:function(e){
    console.log('点击已决定用户需不需要付款')
    var payDuty=this.data.payDuty
    this.setData({
      payDuty : !payDuty
    })
  },
  Selcethandle:function(e){
    console.log('点击选择分类')
    var index=e.currentTarget.dataset.index
    this.setData({
      partindex : index
    })
  },


  getForm:function(e){
    console.log(e)
    var formdata=e.detail.value;
    var index=this.data.partindex;
    var parts=this.data.parts;
    console.log(parts[index].part)
    if(formdata.billsum==''){
      wx.showToast({
        title: '金额不能为空!',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }else if(formdata.billname==''){
      wx.showToast({
        title: '账单名不能为空!',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }else{
      formdata.billdate=formdata.billdate.substring(5,formdata.billdate.length)
      const db=wx.cloud.database();
      db.collection("bill").add({
        data:{
          billname : formdata.billname,
          billsum:formdata.billsum,
          billdate:formdata.billdate,
          billpart :parts[index].part,
          equalDate : false,
          Payfinish : false
        }
      }).then(res=>{
        console.log("添加至数据库成功",res)
        wx.navigateTo({
        url: '../../pages/publicBill/publicBill',
    })
      }).catch(res=>{
        console.log("添加失败",res)
      })
    }

  }



})