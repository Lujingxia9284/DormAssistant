const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      var pages = getCurrentPages() //获取加载的页面
      var currentPage = pages[pages.length-1]
      var url = currentPage.route //当前页面url
      console.log(url)
      if(url == 'pages/publicBill/publicBill'){
        wx.reLaunch({
          url: '../../pages/index/index',
        })
      }else if(url== 'pages/nonPayment/nonPayment'){
        wx.reLaunch({
          url: '../../pages/publicBill/publicBill',
        })
      }else if(url== 'pages/addBill/addBill'){
        wx.reLaunch({
          url: '../../pages/publicBill/publicBill',
        })
      }else if(url== 'pages/dutyRoster/dutyRoster'){
        wx.reLaunch({
          url: '../../pages/index/index',
        })
      };


    },
    toHome(){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})