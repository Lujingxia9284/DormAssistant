//app.js
App({
  globalData: {
    _openid: "oPoCf4ufDIPpNFZaCOnJTNDMDjgY",
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
        console.log(custom)
        var propotion = wx.getSystemInfoSync().windowWidth / 375
        this.globalData.CustomBar = (custom.bottom + custom.top - e.statusBarHeight) * propotion;
      }
    })
  },


})
