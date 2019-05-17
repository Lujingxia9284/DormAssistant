//index.js
const app = getApp()
var util=require('../../util/util.js')


Page({
  data: {

    // avatarUrl: './user-unlogin.png',
    // userInfo: {},
    // logged: false,
    // takeSession: false,
    // requestResult: ''
    state: [
      { path: '../../image/bed.png', name: '睡觉', width: 59, height: 62 },
      { path: '../../image/study.png', name: '学习', width: 45, height: 62 },
      { path: '../../image/fun.png', name: '娱乐', width: 64, height: 62 },
      { path: '../../image/outdoor.png', name: '外出', width: 64, height: 62 }
    ],
    left: 180,
    Users: [
      {}, {}
    ],
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    hasUserInfo: false,
    // -------
    //
    // ----实现状态滑动---
    changeX: app.globalData.changeX,
    lastchangeX: 0,
    wholeWidth: '',
    state: [
      { path: '../../image/bed.png', name: '睡觉', width: 59, height: 62 },
      { path: '../../image/study.png', name: '学习', width: 45, height: 62 },
      { path: '../../image/fun.png', name: '娱乐', width: 64, height: 62 },
      { path: '../../image/outdoor.png', name: '外出', width: 64, height: 62 }
    ],
    // -------------------

    // ----公告栏和模态框-----
    hideMod: true,
    AnnouceMent: [
      { content: "明天有大事要做", date: '2019.01.03' },
      { content: "明天有大事要做", date: '2019.05.03' },
      // {content:"明天有大事要做",date:'2019.06.03'},
    ],
    Index: '',
  },

  ChangeState: function (e) {
    var left = this.left;
    var clientX = e.touches[0].clientX;

    // Users:[
    // {},{}
    // ],

    // ----获取用户-----
   


    // ----------------


    left = e.touches[0].clientX;
    this.setData({ left: left });

  },
  TopublicBill: function () {

  },
  
  addAnnoucement:function(){
    var AnnouceMent=this.data.AnnouceMent
    var DATE=util.formatDate(new Date())
    console.log(DATE)
    AnnouceMent.push({
      content:'',
      date:DATE
    })
    this.setData({
      AnnouceMent : AnnouceMent,
      hideMod:false,
      Index:AnnouceMent.length-1
    })

  },


  TopublicBill:function(){

    wx.navigateTo({
      url: '../../pages/publicBill/publicBill',
    })
  },
  TodutyRoster: function () {
    wx.navigateTo({
      url: '../../pages/dutyRoster/dutyRoster',
    })

  },



// 登陆


  onLoad: function (options) {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

// 滑动状态栏

  bindchagehandle:function(e){
    // console.log(e.detail.x)
    var lastchangeX=this.data.lastchangeX
    this.setData({
      lastchangeX :e.detail.x
    })

  },
  bindtouchendhandle:function(e){
    console.log('需要传到后台保存状态')
    this.setData({
     wholeWidth: wx.getSystemInfoSync().windowWidth
   })
    var propotion=this.data.wholeWidth/375

    var changeX=this.data.changeX
    var lastchangeX=this.data.lastchangeX
    if(lastchangeX<56*propotion){
      lastchangeX=31*propotion
    }else if(lastchangeX>=56*propotion&&lastchangeX<125*propotion){
      lastchangeX=95*propotion
    }else if(lastchangeX>=125*propotion&&lastchangeX<195*propotion){
      lastchangeX=163*propotion
    }else if(lastchangeX>=195*propotion){
      lastchangeX=231*propotion
    }
    this.setData({
      changeX : lastchangeX
    })
  },
  //
  //


  // 模态框
  showModal:function(e) {
    console.log('展示模态框')
    this.setData({
      hideMod : false,
      disableScroll:true,
      Index:e.currentTarget.dataset.index
    })
  },
  hideModal:function(e) {
    console.log('隐藏模态框')
    this.setData({
      hideMod:true
    })
  },

  Modalhandle:function(e){
    console.log('输入的同时改变公告栏的内容')
    var param={}
    console.log(e.detail.value)
    var annoucement=this.data.AnnouceMent
    var string = "AnnouceMent["+this.data.Index+"].content";
    param[string]=e.detail.value
    this.setData(param)
  },

// 实现左滑
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },
  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 30 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    console.log('列表左滑')
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  DeleteHandle:function(e){
    var AnnouceMent=this.data.AnnouceMent

    AnnouceMent.splice(e.currentTarget.dataset.index,1)
    this.setData({
      AnnouceMent : AnnouceMent,
    })
  }



})