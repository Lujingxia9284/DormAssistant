const app = getApp()
wx.cloud.init()
const db = wx.cloud.database()
var arrayValue=1  //几天1人选择器的值 默认一天
var dutyWeek = ["周日", "周一", "周一", "周一", "周一", "周一", "周日", "周一",]
var nowDate
var mode=true  //选择值日模式，false为固定日期


Page({

  data: {
    curYear: new Date().getFullYear(), // 年份
    curMonth: new Date().getMonth() + 1,// 月份 1-12
    day: new Date().getDate(), // 日期 1-31 若日期超过该月天数，月份自动增加
    header_show: true,
    next: true,
    appear: false,
    closelaststyle: true,
    colored: "#DDDDDD",
    prev: true, // 上一个月按钮是否显示
    next: true, // 下一个月按钮是否显示\
    selectedDate: "",
    circle_show: false,//日期下方圆点
    mystatus: [],
    showView: false,
    value: [],
    showPicker: true, //值日生选择器是否出现 false是固定日期
    speciallist: [
      { date: '2019-05-12', background: '#6c9' },
    ],




    // 时间选择器
    time: '12:01',
    arr1: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    array: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],


  },

  //值日周期复选框事件
  radio1Change: function () {
    var that = this;
    that.setData({
      showPicker: false
    })
    console.log(that.data.showPicker);
  },
  radio2Change: function () {
    var that = this;
    that.setData({
      showPicker: true
    })
    console.log(that.data.showPicker);
  },

  //---------viewPicker绑定事件---------------------------------------------
  bindChange: function (e) {
    const val = e.detail.value
    arrayValue = this.data.array[val[0]]
    this.setData({
      arrayValue: this.data.array[val[0]]
    })

  },

  bind1Change: function (e) {
    const val = e.detail.value
    dutyWeek[0] = this.data.arr1[val[0]]
    this.setData({
      arr1Value: this.data.arr1[val[0]],

    })

    console.log("滚动视图的值1：" + this.data.arr1Value)
  },
  bind2Change: function (e) {
    const val = e.detail.value
    dutyWeek[1] = this.data.arr1[val[0]]
    this.setData({
      arr1Value: this.data.arr1[val[0]],

    })
    console.log("滚动视图的值2：" + this.data.arr1Value)
  },
  bind3Change: function (e) {
    const val = e.detail.value
    dutyWeek[2] = this.data.arr1[val[0]]
    this.setData({
      arr1Value: this.data.arr1[val[0]],

    })
    console.log("滚动视图的值3：" + this.data.arr1Value)
  },
  bind4Change: function (e) {
    const val = e.detail.value
    dutyWeek[3] = this.data.arr1[val[0]]
    this.setData({
      arr1Value: this.data.arr1[val[0]],

    })
    console.log("滚动视图的值4：" + this.data.arr1Value)
  },
  bind5Change: function (e) {
    const val = e.detail.value
    dutyWeek[4] = this.data.arr1[val[0]]
    this.setData({
      arr1Value: this.data.arr1[val[0]],

    })
    console.log("滚动视图的值5：" + this.data.arr1Value)
  },
  bind6Change: function (e) {
    const val = e.detail.value
    dutyWeek[5] = this.data.arr1[val[0]]
    this.setData({
      arr1Value: this.data.arr1[val[0]],

    })
    console.log("滚动视图的值6：" + this.data.arr1Value)
  },
  bind7Change: function (e) {
    const val = e.detail.value
    dutyWeek[6] = this.data.arr1[val[0]]
    this.setData({
      arr1Value: this.data.arr1[val[0]],

    })
    console.log("滚动视图的值7：" + this.data.arr1Value)
  },
  bind8Change: function (e) {
    const val = e.detail.value
    this.setData({
      arr1Value: this.data.arr1[val[0]],

    })
    console.log("滚动视图的值8：" + this.data.arr1Value)
  },

  //========时间选择器绑定事件
  TimeChange: function () {
    this.setData({
      time: e.detail.value
    })
  },





  onLoad: function (options) {
    wx.stopPullDownRefresh()//停止下拉刷新
    var that = this
    that.setData({
      imageUrl: app.globalData.imageUrl
    })
   

    db.collection('dutyStatus').where({
      dormid: app.globalData.dormid
    }).get({
      success: function (res) {
        if (JSON.stringify(res.data)=="[]"){
          console.log("aaaaaxiebuwanle")
          console.log("初始值："+arrayValue)
          wx.cloud.callFunction({
            name: 'dutyStatus',
            data: {
              dutyDay: arrayValue,
              dutyWeek: dutyWeek,
              mode: that.data.showPicker,
              dormid: app.globalData.dormid
            },
            success: function (res) {}
          })
        }
        else{
          console.log("读取的数据："+JSON.stringify(res.data))
          arrayValue = res.data[0].dutyDay
        console.log("这里的arrayValue："+arrayValue)
        console.log("arrayValue" + arrayValue)
        dutyWeek = res.data[0].dutyWeek
        mode = res.data[0].mode
        console.log("mode:" + mode)
        that.setData({
          arrayValue: res.data[0].dutyDay
        })
        }
      }
        })

    //----------获取当前时间---------------------
    var date = new Date();
    var nowMonth = date.getMonth() + 1;
    var strDate = date.getDate();
    if (nowMonth >= 1 && nowMonth <= 9) {
      nowMonth = "0" + nowMonth;
    }

    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    nowDate = date.getFullYear() + "-" + nowMonth + "-" + strDate;
    console.log("日期：" + nowDate)


    //-------获取用户数量和下标索引-----------
    that.setData({
      length: Object.keys(app.globalData.userOpenid).length
    })
    console.log("宿舍人数" + that.data.length)
    for (var i = 0; i < that.data.length; i++) {
      if (app.globalData.userOpenid[i] == app.globalData.Myopenid) {
        that.setData({
          index: i
        })
        console.log("当前用户在宿舍中排位：" + that.data.index)
      }

    }





    that.modalDuty = that.selectComponent("#modalDuty");//通过给组件所起的id调用组件
    that.modalAlert = that.selectComponent("#modalAlert");
  },


  //-------从dateTemp起days天后的数据---------------------------------------
  newDay: function getNewDay(dateTemp, days) {
    var dateTemp = dateTemp.split("-");
    var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式  
    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
    var rDate = new Date(millSeconds);
    var year = rDate.getFullYear();
    var month = rDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var date = rDate.getDate();
    if (date < 10) date = "0" + date;
    return (year + "-" + month + "-" + date);
  },
  //------------------计算某一天为周几---------------
  getWeekByDay: function getWeekByDay(dayValue) { //dayValue=“2014-01-01”
    var day = new Date(Date.parse(dayValue.replace(/-/g, '/'))); //将日期值格式化
    var today = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六"); //创建星期数组
    // console.log(today[day.getDay()])
    return today[day.getDay()];  //返一个星期中的某一天，其中0为星期日
  },

  //------按钮值日周期绑定函数----------
  showModalDuty: function () {

    this.modalDuty.showModal()
    console.log("用户头像" + this.data.imageUrl)
  },
  closeModalDuty: function () {
    var that = this
    console.log("完成后的数据："+arrayValue)
    mode=that.data.showPicker
    console.log("关闭模态框前的mode："+mode)
   
    that.modalDuty.closeModal()  //打开关闭值日周期
    wx.cloud.callFunction({
      name: 'dutyStatus',
      data: {
        dutyDay: arrayValue,
        dutyWeek: dutyWeek,
        mode: that.data.showPicker,
        dormid:app.globalData.dormid
      },
      success: function (res) {
        console.log("云函数调用成功！") // 3
        that.onLoad()
        that.onShow()
      },
      fail: console.error
    })

  },
  showModalAlert: function () {
    this.modalAlert.showModal()
  },
  closeModalAlert: function () {
    this.modalAlert.closeModal()  //打开关闭提醒设置
  },
  // 开启提醒绑定的函数
  
  setAlert: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
    console.log(this.data.showView);


  },

  onShow: function () {
    this.onLoad()
    var that=this
    if (mode) {
                var dict = [];
                console.log("打印arrayValue：" + arrayValue)


                console.log("循环" + nowDate)
                for (var i = arrayValue * that.data.index; i < arrayValue * (that.data.index + 1); i++) {
                  dict.push({
                    date: that.newDay(nowDate, i),
                    background: '#6c9'
                  });
                  var tempDay = that.newDay(nowDate, i)
                  for (var j = that.data.length * arrayValue; j < 100; j = j + that.data.length * arrayValue) {
                    dict.push({
                      date: that.newDay(tempDay, j),
                      background: '#6c9'
                    });
                  }

                }
                that.setData({ speciallist: dict })
                console.log("当前用户的值日天——1" + JSON.stringify(that.setData.speciallist))

              }
              else {
                var dict = []
                for (var i = 0; i < 100; i++) {
                  var tempDay = that.newDay(nowDate, i)
                  if (that.getWeekByDay(tempDay) == dutyWeek[that.data.index]) {

                    dict.push({
                      date: tempDay,
                      background: '#6c9'
                    });
                  }
                }
                that.setData({ speciallist: dict })
                console.log("当前用户的值日天——2" + JSON.stringify(that.setData.speciallist))
          
        }





  },
//----------下拉刷新--------------------
  onPullDownRefresh: function () {
    
    this.onLoad(); //重新加载onLoad()
    this.onShow();
  },




  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  

  }

          })