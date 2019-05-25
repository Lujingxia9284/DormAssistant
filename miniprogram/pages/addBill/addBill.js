// miniprogram/pages/addBill/addBill.js
var util = require('../../util/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2019-05-08',

    partindex: 0,
    parts: [
      { part: "food", name: "外卖", click: true },
      { part: "restaurant", name: "聚餐", click: false },
      { part: "indigrent", name: "食材", click: false },
      { part: "dally", name: "日用品", click: false },
      { part: "car", name: "交通", click: false },
      { part: "entertainment", name: "娱乐", click: false },
      { part: "elec", name: "电费", click: false },
      { part: "else", name: "其他", click: false },
    ],
    // 用户信息
    nonPay: [
      { openid: 'oPoCf4ufDIPpNFZaCOnJTNDMDjgY', payDuty: true, amount: '' },
      { openid: '2', payDuty: true, amount: '' },
      { openid: '3', payDuty: true, amount: '' },
      { openid: '4', payDuty: true, amount: '' }
    ],

    // 金额总数
    billmoney: '',
    flat: true,
    paynum: ''

  },
  onShow: function (options) {
    //获取当前的日期
    var time = util.format_Date(new Date())
    this.setData({
      paynum: this.data.nonPay.length,
      date: time
    })
    console.log(this.data.paynum)

  },

  Selcethandle: function (e) {
    console.log('点击选择分类')
    var index = e.currentTarget.dataset.index
    this.setData({
      partindex: index
    })
  },

  DateChange(e) {
    console.log('改变时间，最好能获取当前日期时间')
    this.setData({
      date: e.detail.value
    })
  },

  BillMoney: function (e) {
    console.log('输入的金额')
    var billmoney = this.data.billmoney
    this.setData({
      billmoney: e.detail.value
    })
    // var nonPay=this.data.nonPay;
    // for(var i=0;i<nonPay.length;i++){
    //   if(nonPay[i].payDuty==true){
    //     nonPay[i].amount = e.detail.value/this.data.paynum
    //     console.log(nonPay[i].amount)
    //   }
    // }
    console.log(billmoney)
  },

  PersonalCost: function (e) {
    console.log('失去焦点时获取输入的金额')
    //
    var value = e.detail.value;
    var index = e.currentTarget.dataset.index;
    var param = {};
    var nonPay = this.data.nonPay;
    var string = "nonPay[" + index + "].amount";
    param[string] = value
    console.log(param)
    this.setData(param)
    var sum = 0;

    for (var i = 0; i < nonPay.length; i++) {
      if (nonPay[i].payDuty == true) {
        sum += Number(nonPay[i].amount)
      }
    }
    console.log('sum', sum)
    this.setData({
      billmoney: sum
    })

  },

  flatHandle: function () {
    console.log('决定是e否要平摊')
    var flat = this.data.flat
    var nonPay = this.data.nonPay;
    for (var i = 0; i < nonPay.length; i++) {
      nonPay[i].amount = ''
    }
    this.setData({
      flat: !flat,
      nonPay: nonPay
    })
  },

  payNeed: function (e) {
    console.log(e)
    console.log('点击已决定用户需不需要付款')

    var index = e.currentTarget.dataset.index
    var param = {}
    var nonPay = this.data.nonPay
    var string = "nonPay[" + index + "].payDuty";
    param[string] = !nonPay[index].payDuty
    console.log(param)
    this.setData(param)
    var paynum = this.data.paynum + (nonPay[index].payDuty ? 1 : -1)
    this.setData({
      paynum: paynum
    })


  },



  getForm: function (e) {
    console.log(e)
    var formdata = e.detail.value;
    //将每个成员应付的金额从表单中独立成数组出来
    var PersonCost = []
    for (let i in formdata) {
      PersonCost.push(formdata[i])
    }

    PersonCost.splice(0, 3)
    // ----------------
    console.log(PersonCost)
    var index = this.data.partindex;
    var parts = this.data.parts;
    console.log(parts[index].part)
    if (formdata.billsum == '' && this.data.flat) {
      console.log(formdata)
      wx.showToast({
        title: '金额不能为空!',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (formdata.billname == '') {
      wx.showToast({
        title: '账单名不能为空!',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      formdata.billdate = formdata.billdate.substring(5, formdata.billdate.length)
      //运用云函数传递给数据库
      wx.cloud.init()
      wx.cloud.callFunction({
        // 云函数名称
        name: 'billsubmit',
        // 传给云函数的参数
        data: {
          billname: formdata.billname,
          billsum: this.data.billmoney,
          billdate: formdata.billdate,
          billpart: parts[index].part,
          equalDate: false,
          Payfinish: false
        },
        complete: res => {
          console.log(res)

        }
      })
      //传递未付款信息
      const db = wx.cloud.database()
      var array = this.data.nonPay
      var j = 0;
      for (var i = 0; i < array.length; i++) {
        if (array[i].payDuty == true) {
          db.collection('nonPayment').add({
            data: {
              payNeedId: array[i].openid,
              amount: PersonCost[j]
            }
          }).then(res => {
            console.log(res)
          })
          j += 1;
        }

      }



      wx.navigateTo({
        url: '../../pages/publicBill/publicBill',
      })
    }

  }
})