//app.js
App({
  globalData:{
    billevent:[
      {date:"12-13",
        name:"对方对",
        money:'200',
        line:"../../image/line.png",
        img:"../../image/flash.png",
        finish:"../../image/unfinished.png",
        Payfinish:false,
        equalDate:false,
      },
      {date:"02-28",
        name:"复仇者联盟",
        money:'200',
        line:"../../image/line.png",
        img:"../../image/flash.png",
        finish:"../../image/unfinished.png",
        Payfinish:false,
        equalDate:false,
      },
      {date:"12-13",
        name:"复仇者联盟",
        money:'200',
        line:"../../image/line.png",
        img:"../../image/flash.png",
        finish:"../../image/unfinished.png",
        Payfinish:false,
        equalDate:false,
      },
      {date:"05-13",
        name:"复仇者联盟",
        money:'200',
        line:"../../image/line.png",
        img:"../../image/flash.png",
        finish:"../../image/unfinished.png",
        Payfinish:false,
        equalDate:false,
      },
      {date:"05-13",
        name:"复仇者联盟",
        money:'200',
        line:"../../image/line.png",
        img:"../../image/flash.png",
        finish:"../../image/unfinished.png",
        Payfinish:false,
        equalDate:false,
      },
      {date:"05-13",
        name:"复仇者联盟",
        money:'200',
        line:"../../image/line.png",
        img:"../../image/flash.png",
        finish:"../../image/unfinished.png",
        Payfinish:false,
        equalDate:false,
      },
    ],
  },

  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    // this.globalData = {},
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },


})
