// miniprogram/pages/addBill/addBill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-12-25',
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
  partindex:'',
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
  }



})