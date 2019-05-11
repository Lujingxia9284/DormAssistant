Page({

  /**
   * 页面的初始数据
   */
  data: {
    curYear: new Date().getFullYear(), // 年份
    curMonth: new Date().getMonth() + 1,// 月份 1-12
    day: new Date().getDate(), // 日期 1-31 若日期超过该月天数，月份自动增加
    header_show:true ,
   
    next:true,
    appear:false,
    closelaststyle:true,
    colored:"#DDDDDD",
    prev: true, // 上一个月按钮是否显示
    next: true, // 下一个月按钮是否显示\
    selectedDate:"",
    circle_show:false,//日期下方圆点
    mystatus: [],

   

  },
 
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var x = '2019-05-12'
    this.setData({
      speciallist: [
        { date: [x], background: '#6c9'},
        
      ],
     
    })
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})

