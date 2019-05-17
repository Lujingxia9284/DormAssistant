Component({
  /**
   * 组件的属性列表（共有数据）
   */
  properties: {
    //modal出现动画类型
    fadeStyle: {
      type: String,
      value: '',
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），通常 newVal 就是新设置的数据， oldVal 是旧数        
        if (newVal == "slideUp") {//从下向上滑出
          this.setData({
            bottom: '-' + this.properties.height,
          })
        } else if (newVal == "slideDown") {//从上向下滑出
          this.setData({
            top: '-' + this.properties.height,
          })
        } else if (newVal == "slideRight") {//从左向右滑出
          this.setData({
            left: '-' + this.properties.width
          })
        } else if (newVal == "slideLeft") {//从右向左滑出
          this.setData({
            right: '-' + this.properties.width
          })
        }
      }
    },
    width: {
      type: String,
      value: '100%',
    },
    height: {
      type: String,
      value: '',
    },
    top: {
      type: String,
      value: ''
    },
    bottom: {
      type: String,
      value: ''
    },
    left: {
      type: String,
      value: ''
    },
    right: {
      type: String,
      value: ''
    },
    opacity: {
      type: String,
      value: '0'
    },
  },

  /**
   * 组件的初始数据（私有数据）
   */
  data: {
    //控制模态框打开关闭参数
    showModalStatus: false
  },
  options: {
    addGlobalClass: true, //使其可以使用全局样式
    multipleSlots: true //使其可以使用多个slot，用name区分
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //打开模态框
    showModal: function (event) {
      this.setData({
        showModalStatus: true
      })
      //需要等模态框出现再执行动画，否则无动画效果
      setTimeout(function () {
        if (this.properties.fadeStyle == "slideUp") {
          this.setData({
            bottom: 0,
            opacity: 1
          })
        } else if (this.properties.fadeStyle == "slideDown") {
          this.setData({
            top: 0,
            opacity: 1
          })
        } else if (this.properties.fadeStyle == "slideRight") {
          this.setData({
            left: 0,
            opacity: 1
          })
        } else if (this.properties.fadeStyle == "slideLeft") {
          this.setData({
            right: 0,
            opacity: 1
          })
        }

      }.bind(this), 100)
    },
    //关闭模态框
    closeModal: function () {
      //判断动画样式
      if (this.properties.fadeStyle == "slideUp") {
        this.setData({
          bottom: '-' + this.properties.height,
          opacity: 0
        })
      } else if (this.properties.fadeStyle == "slideDown") {
        this.setData({
          top: '-' + this.properties.height,
          opacity: 0
        })
      } else if (this.properties.fadeStyle == "slideRight") {
        this.setData({
          left: '-' + this.properties.width,
          opacity: 0
        })
      } else if (this.properties.fadeStyle == "slideLeft") {
        this.setData({
          right: '-' + this.properties.width,
          opacity: 0
        })
      }
      //等关闭动画完毕后再移除模态框和遮罩
      setTimeout(function () {
        this.setData({
          showModalStatus: false
        })
      }.bind(this), 400)
    }
  }
})
