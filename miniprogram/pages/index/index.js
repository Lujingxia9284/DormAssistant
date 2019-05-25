const app = getApp()
var util = require('../../util/util.js')
var userId
var userDormid    //变量存储数据库记录id和相应的dormid和分享过来的shareDormid
var shareDormid = userDormid
var share          //判断是否别人转发过来的
wx.cloud.init()
const db = wx.cloud.database()
var imageUrl = []    //存储相同dormid的imageUrl
var userOpenid = []  //存储相同dormid的openid
var openid   //获取当前用户的openid
var usere    //储存获取用户信息点击按钮返回值e





Page({
  data: {
    shareDormid: "hhhhhhhhhhhhhhh",
    refreshStatus: false,//是否下拉刷新
    state: [
      { path: '../../image/bed.png', name: '睡觉', width: 59, height: 62 },
      { path: '../../image/study.png', name: '学习', width: 45, height: 62 },
      { path: '../../image/fun.png', name: '娱乐', width: 64, height: 62 },
      { path: '../../image/outdoor.png', name: '外出', width: 64, height: 62 }
    ],
    left: 180,
    Users: [{}, {}],
    hasUserInfo: false,

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



    // ----获取用户-----



    // ----------------


    left = e.touches[0].clientX;
    this.setData({ left: left });

  },


  addAnnoucement: function () {
    var AnnouceMent = this.data.AnnouceMent
    var DATE = util.formatDate(new Date())
    console.log(DATE)
    AnnouceMent.push({
      content: '',
      date: DATE
    })
    this.setData({
      AnnouceMent: AnnouceMent,
      hideMod: false,
      Index: AnnouceMent.length - 1
    })

  },

  //------------------页面路由-----------------------
  TopublicBill: function () {
    wx.navigateTo({
      url: '../../pages/publicBill/publicBill',
    })
  },
  TodutyRoster: function () {
    wx.navigateTo({
      url: '../../pages/dutyRoster/dutyRoster',
    })
  },

  // 滑动状态栏

  bindchagehandle: function (e) {
    // console.log(e.detail.x)
    var lastchangeX = this.data.lastchangeX
    this.setData({
      lastchangeX: e.detail.x
    })

  },
  bindtouchendhandle: function (e) {
    console.log('需要传到后台保存状态')////
    // console.log(app.globalData.userInfo)
    this.setData({
      wholeWidth: wx.getSystemInfoSync().windowWidth
    })
    var propotion = this.data.wholeWidth / 375

    var changeX = this.data.changeX
    var lastchangeX = this.data.lastchangeX
    if (lastchangeX < 56 * propotion) {
      lastchangeX = 31 * propotion
    } else if (lastchangeX >= 56 * propotion && lastchangeX < 125 * propotion) {
      lastchangeX = 95 * propotion
    } else if (lastchangeX >= 125 * propotion && lastchangeX < 195 * propotion) {
      lastchangeX = 163 * propotion
    } else if (lastchangeX >= 195 * propotion) {
      lastchangeX = 231 * propotion
    }
    this.setData({
      changeX: lastchangeX
    })
  },


  // -----------------模态框----------------
  showModal: function (e) {
    console.log('展示模态框')
    this.setData({
      hideMod: false,
      disableScroll: true,
      Index: e.currentTarget.dataset.index
    })
  },
  hideModal: function (e) {
    console.log('隐藏模态框')
    this.setData({
      hideMod: true
    })
  },

  Modalhandle: function (e) {
    console.log('输入的同时改变公告栏的内容')
    var param = {}
    console.log(e.detail.value)
    var annoucement = this.data.AnnouceMent
    var string = "AnnouceMent[" + this.data.Index + "].content";
    param[string] = e.detail.value
    this.setData(param)
  },

  //--------------------滑动条-----------------------

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
  DeleteHandle: function (e) {
    var AnnouceMent = this.data.AnnouceMent

    AnnouceMent.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      AnnouceMent: AnnouceMent,
    })
  },

  //-----------------分享给好友带参数---------
  onShareAppMessage: function () {
    var that = this;

    return {
      title: '舍佐',
      path: '/pages/index/index?userDormid=' + userDormid,

    }

  },


  // 登陆

  //-----------------------onLoad------------------
  onLoad: function (options) {
    wx.stopPullDownRefresh()
    var that = this



    console.log('userDormid' + userDormid)
    var that = this;
    //-----处理转发分享的参数-------
    if (options.userDormid) {
      share = true
      shareDormid = options.userDormid
    };

    //========控制显示
    // wx.cloud.callFunction({
    //   name: 'getOpenid',
    //   complete: res => {
    //     console.log('云函数获取到的当前用户openid: ', res.result.openId)
    //     openid = res.result.openId;
    //     //查询数据库是否有当前用户的数据
    //     db.collection('userInfo').where({

    //       _openid: openid

    //     }).get({
    //       //数据库中已有当前用户数据
    //       success: res => {
    //         console.log("hhhhhhhhhhhhhhhhh:" + res.data)
    //         if (res.data != "") {

    //           that.setData({

    //            hasUserInfo: true
    //           })
    //           console.log("hasUserInfo:"+that.data.hasUserInfo)
    //       }
    //         }
    //     })
    //         }
    //         })














    wx.showShareMenu({
      withShareTicket: true
    });


    //-----用户数据设全局--------------------------------------------------------------
    // if (app.globalData.userInfo) {
    //   that.setData({
    //     // userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (that.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     that.setData({
    //       // userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })

    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       that.setData({
    //         // userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }


  },

  onShow: function () {


  },


  //--------------下拉刷新监听函数
  onPullDownRefresh: function () {

    this.setData({ refreshStatus: true })
    this.getUserInfo(usere); //
  },


  //---------------获取用户信息按钮的绑定事件-------------------------------
  getUserInfo: function (e) {
    var that = this
    usere = e
    console.log('用户信息:' + e.detail.userInfo)

    // ============重构==============
    // 获取当前用户的openid 
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的当前用户openid: ', res.result.openId)
        openid = res.result.openId;
        //查询数据库是否有当前用户的数据
        db.collection('userInfo').where({

          _openid: openid

        }).get({
          //数据库中已有当前用户数据
          success: res => {
            console.log("hhh:" + res.data)
            if (res.data == "") {
              console.log("数据库中没有当前用户数据")

              db.collection('userInfo').add({
                data: {

                  user: e.detail.userInfo.avatarUrl

                }
              }).then(res => {
                console.log("成功添加当前用户数据，该条记录id为：" + res._id)
                userId = res._id
                //如果是用户分享
                if (share) {
                  db.collection('userInfo').doc(userId).update({
                    data: {
                      dormid: shareDormid
                    }
                  }).then(
                    res => {
                      console.log("添加记录的dormid为:" + shareDormid)
                      // db.collection('userInfo').doc(userId).get().then(res => {
                      //   console.log(res.data.dormid)
                      userDormid = shareDormid

                      // })
                    })

                }


                else {
                  db.collection('userInfo').doc(userId).update({
                    data: {

                      dormid: userId
                    }
                  }).then(
                    res => {
                      console.log("添加记录的dormid为:" + res.data)

                      // db.collection('userInfo').doc(userId).get().then(res => {
                      //   console.log(res.data.dormid)
                      userDormid = userId


                      // })
                    })

                }





              })

            }
            else {
              console.log("数据库中已有当前用户数据")
              console.log("当前用户的dormid：" + res.data[0].dormid)
              userDormid = res.data[0].dormid
              //获取有相同dormid的用户数据

            }
          },



          complete: res => {
            db.collection('userInfo').where({

              dormid: userDormid

            }).get().then(
              res => {
                for (var i = 0; i < res.data.length; i++) {
                  imageUrl[i] = res.data[i].user
                  userOpenid[i] = res.data[i]._openid
                }
                app.globalData.imageUrl = imageUrl
                app.globalData.userOpenid = userOpenid
                that.setData({ imageUrl: app.globalData.imageUrl })
                // console.log(that.data.imageUrl)
                console.log("全局相同dormid的数据imageUrl:" + app.globalData.imageUrl)
                console.log("全局相同dormid的数据userOpenid:" + app.globalData.userOpenid)

              }
            )
          }


        })


        that.setData({
          hasUserInfo: true
        })

      },






    })
  }
})