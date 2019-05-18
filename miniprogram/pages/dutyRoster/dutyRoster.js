

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
    showView:false,
    value:6,
    showPicker:false, //值日生选择器是否出现
    

    // 时间选择器
    time: '12:01',
    arr1: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    arr2: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    arr2Value: 1,

   
  },

//值日周期复选框事件
  radioChange: function(){
    var that = this;
    that.setData({
      showPicker: (!that.data.showPicker)
    })
    console.log(this.data.showPicker);


  },

 
  bind1Change: function (e) {
    const val = e.detail.value
    this.setData({
      arr1Value: this.data.arr1[val[0]],
      
    })
  },
  bind2Change: function (e) {
    const val = e.detail.value
    this.setData({
      arr2Value: this.data.arr2[val[0]],


    })
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    var x = '2019-05-12'
    this.setData({
      speciallist: [
        { date: [x], background: '#6c9' },

      ],

    })
    this.modalDuty = this.selectComponent("#modalDuty");//通过给组件所起的id调用组件
    this.modalAlert = this.selectComponent("#modalAlert");
  },
  showModalDuty: function () {
    this.modalDuty.showModal()  
},
  closeModalDuty:function(){
    this.modalDuty.closeModal()  //打开关闭值日周期
  },
  showModalAlert: function () {
    this.modalAlert.showModal()  
  },
  closeModalAlert: function () {
    this.modalAlert.closeModal()  //打开关闭提醒设置
  },
  // 开启提醒绑定的函数
  setAlert:function(){ 
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    }) 
    console.log(this.data.showView);
    

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

