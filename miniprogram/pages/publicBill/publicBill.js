// miniprogram/pages/publicBill/publicBill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bill:[
    {person:"我的付款",num:'200'},
    {person:"他人付款",num:'110'},
    ],
    billpart:[
      {date:"04.13",
      name:"电影",
      money:'200',
      line:"../../image/line.png",
      img:"../../image/flash.png",
      finish:"../../image/unfinished.png",
      },
      {date:"04.13",
      name:"电影",
      money:'200',
      line:"../../image/line.png",
      img:"../../image/flash.png",
      finish:"../../image/unfinished.png",
      },
      {date:"04.13",
      name:"电影",
      money:'200',
      line:"../../image/line.png",
      img:"../../image/flash.png",
      finish:"../../image/unfinished.png",
      },
    ],
    num:'',
  },
  onLoad(options) {
    var num=this.num;
    this.setData({ num: this.data.billpart.length})

  },


})