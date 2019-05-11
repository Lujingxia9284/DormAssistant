// miniprogram/pages/addBill/addBill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2018-12-25',
    bills:[
    {src:"../../image/food.png",name:"外卖"},
    {src:"../../image/restaurant.png",name:"聚餐"},
    {src:"../../image/indigrent.png",name:"食材"},
    {src:"../../image/dally.png",name:"日用品"},
    {src:"../../image/car.png",name:"交通"},
    {src:"../../image/entertainment.png",name:"娱乐"},
    {src:"../../image/flash.png",name:"电费"},
    {src:"../../image/else.png",name:"其他"},
    ]
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

})