
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
var nickName = []    //存储相同doemid的nickName
var openid   //获取当前用户的openid
var usere    //储存获取用户信息点击按钮返回值e





Page({
  data: {
    shareDormid: "hhhhhhhhhhhhhhh",
    refreshStatus: false,//是否下拉刷新
    openid : '',
    left: 180,
    Users: [],
    hasUserInfo: true,

    // ----实现状态滑动---
    propotion : wx.getSystemInfoSync().windowWidth/375,
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
    AnnouceMent: [],
    Index: '',
    fillHegiht:''
  },

  addAnnoucement: function () {
    var AnnouceMent = this.data.AnnouceMent
    var DATE = util.formatDate(new Date())
    console.log(app.globalData.dormid)


    db.collection('Annoucement').add({
      data: {
        content: '',
        date: DATE,
        dormid: app.globalData.dormid
      }
    }).then(res => {
      console.log(res)
      AnnouceMent.push({
        content: '',
        date: DATE,
        _id: res._id,
      })
      this.setData({
        AnnouceMent: AnnouceMent,
        hideMod: false,
        Index: AnnouceMent.length - 1
      })
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
    console.log(e)
    var propotion = this.data.propotion
    var index=e.currentTarget.dataset.index
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
//页面实时修改
    var param = {}
    var Users = this.data.Users
    var string = "Users[" + index + "].stateLocation";
    param[string] =lastchangeX/propotion
    this.setData(param)
//更新到数据库
    db.collection('userInfo').doc(userId).update({
          data: {
            stateLocation : lastchangeX/propotion
          }
        }).then(res => {

        })


  },



  changeAnnoucement: function (e) {
    console.log(e.detail.value)
    var index = this.data.Index
    var AnnouceMent = this.data.AnnouceMent
    wx.cloud.callFunction({
      // 云函数名称
      name: 'annoucementUpdate',
      // 传给云函数的参数
      data: {
        ID: AnnouceMent[index]._id,
        content: e.detail.value
      },
      complete: res => {
        console.log(res)
      }
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
      ListTouchDirection: this.data.ListTouchStart - e.touches[0].pageX > 30 ? 'left' : 'right'
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
    var index = e.currentTarget.dataset.index
    var id = AnnouceMent[index]._id

    AnnouceMent.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      AnnouceMent: AnnouceMent,
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'annoucementDelete',
      // 传给云函数的参数
      data: {
        ID: id,
      },
      complete: res => {
        console.log(res)

      }
    })
  },



  //-----------------分享给好友带参数---------
  onShareAppMessage: function (res) {
    var that = this;
    console.log("分享带参数")
    if (res.from === 'button') {
    return {
      title: app.globalData.myNickName+'邀请你进入舍佐',
      path: '/pages/index/index?userDormid=' + userDormid,
      imageUrl:'../../image/shareImage.png'

    }
    }
    else if (res.from === 'menu'){
      return {
        title: app.globalData.myNickName + '邀请你进入舍佐',
        path: '/pages/index/index',
        imageUrl: '../../image/shareImage.png'

      }

    }

  },



  // 登陆

  //-----------------------onLoad------------------
  onLoad: function (options) {
    console.log(this.data.propotion)
    wx.stopPullDownRefresh()//停止下拉刷新
    var that = this
    var query = wx.createSelectorQuery();
    query.select('#state').boundingClientRect()
    query.exec((res) => {
      console.log(res)
      // 获取list高度
      var stateHeight=res[0].height
      var fillHegiht=1334-128-res[0].height-420;
      this.setData({
        fillHegiht : fillHegiht
      })

    })

    console.log('userDormid' + userDormid)
    var that = this;
    //-----处理转发分享的参数-------
    if (options.userDormid) {
      share = true
      shareDormid = options.userDormid
    };



    wx.showShareMenu({
      withShareTicket: true
    });


  },

  onShow: function () {
    var that=this
    console.log(app.globalData.dormid)
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的当前用户openid: ', res.result.openId)
        openid = res.result.openId;
        app.globalData.Myopenid = res.result.openId;
        this.setData({
          openid : res.result.openId
        })
        //查询数据库是否有当前用户的数据
        db.collection('userInfo').where({

          _openid: openid

        }).get({
          //数据库中已有当前用户数据
          success: res => {
            console.log("hhh:" + res.data)
            if (res.data == "") {
              console.log("数据库中没有当前用户数据")
              that.setData({
                hasUserInfo: false
              })

            }
            else {
              console.log("数据库中已有当前用户数据")
              console.log("当前用户的dormid：" + res.data[0].dormid)
              userDormid = res.data[0].dormid
              //获取有相同dormid的用户数据

              that.setData({
                hasUserInfo: true
              })


            }
          },



          complete: res => {
            db.collection('Annoucement').where({
              dormid: userDormid
            })
            .get()
            .then(res => {
              console.log(res.data)
              this.setData({
                AnnouceMent: res.data,

              })
            })




            db.collection('userInfo').where({

              dormid: userDormid

            }).get().then(
              res => {
                console.log("res.data:" ,res.data)
                this.setData({
                  Users :  res.data
                })
                console.log('Users',this.data.Users)
                for (var i = 0; i < res.data.length; i++) {
                  imageUrl[i] = res.data[i].user
                  userOpenid[i] = res.data[i]._openid
                  nickName[i] = res.data[i].nickName
                  if(res.data[i]._openid==openid){
                    app.globalData.myAvatar=res.data[i].user
                    app.globalData.myNickName=res.data[i].nickName
                  }
                }
                app.globalData.imageUrl = imageUrl
                app.globalData.userOpenid = userOpenid
                app.globalData.nickName = nickName
                app.globalData.dormid = res.data[0].dormid
                that.setData({ imageUrl: app.globalData.imageUrl })
                // console.log(that.data.imageUrl)
                console.log("全局相同dormid的数据imageUrl:" + app.globalData.imageUrl)
                console.log("全局相同dormid的数据userOpenid:" + app.globalData.userOpenid)

              }
            )
          }


        })




      },






    })

  },


  //--------------下拉刷新监听函数
  onPullDownRefresh: function () {

    this.setData({ refreshStatus: true })
    this.onLoad(); //
    this.onShow();

  },


  //---------------获取用户信息按钮的绑定事件-------------------------------
  getUserInfo: function (e) {
    var that = this
    usere = e
    console.log('用户信息:' + JSON.stringify(e.detail.userInfo))

    // ============重构==============
    // 获取当前用户的openid
    db.collection('userInfo').add({
      data: {

        user: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        stateLocation : 31


      }
    }).then(res=>{
      console.log("成功添加当前用户数据，该条记录id为：" + res._id)
      userId = res._id
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

      }else{
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
      that.onShow()
    })

  }

})


