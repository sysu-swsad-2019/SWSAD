// pages/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    projectSource: '',
    tagShow1: false,
    tagShow2: true,
    iconpath: '',
    userListInfo: [{
      icon: '../../images/footer-icon-04.png',
      text: '领取的任务',
      tap:'acceptTaskTap'
    }, {
      icon: '../../images/iconfont-dingdan.png',
      text: '发布的任务',
      tap: 'releaseTaskTap'
    }, {
      icon: '../../images/footer-icon-01.png',
      text: '我的闲钱币',
      tap: 'coinTap'
    }, {
      icon: '../../images/个人资料.png',
      text: '个人资料',
      tap: 'personalInfoTap'
    },{
      icon: '../../images/修改资料.png',
      text: '用户设置',
      tap: 'modifyInfoTap'
    },{
      icon: '../../images/iconfont-kefu.png',
      text: '联系客服'
    }]
  },

  acceptTaskTap: function (e) {
    if (app.globalData.userInfo.isLogin) {
      wx.navigateTo({
        url: '../taskaccept/taskaccept',
      })
    }
    else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }

    console.log(e);
  },
  releaseTaskTap: function (e) {

    if (app.globalData.userInfo.isLogin) {
      wx.navigateTo({
        url: '../taskrelease/taskrelease',
      })
    // console.log(e);
    }
    else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  modifyInfoTap: function(){
    if(app.globalData.userInfo.isLogin){
      wx.navigateTo({
        url: '../editUserInfo/editUserInfo'
      })
    }
    else{
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
    }
   
  },

  coinTap:function(){

    if (app.globalData.userInfo.isLogin) {
      wx.navigateTo({
        url: '../getMoney/getMoney',
      })
    }
    else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  personalInfoTap:function(){
    if (app.globalData.userInfo.isLogin) {
      wx.navigateTo({
        url: '../userdetail/userdetail?fromPage=1',
      })
    }
    else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("onLoad")
    /*
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
      
    }*/
  },

  clickLogin:function(e) {
    
    wx.navigateTo({
      url: '../loginPage/loginPage?id=1'
    })
  }
  ,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    console.log("onShow")
    if (app.globalData.userInfo.isLogin) {
      this.setData({
        tagShow1: true,
        tagShow2: false,
      })
      console.log(app.globalData.userInfo.moreInfo)
      if (app.globalData.userInfo.moreInfo==null){
        
        wx.request({
          url: getApp().globalData.server + 'userinfo/getUserInfo',
          header: {
            "content-type": "application/x-www-form-urlencoded",
            'cookie': wx.getStorageSync('cookieKey')
          },
          method: "POST",
          complete: function (res) {
            // {"money":null,"phone":null,"university":null,"sex":"0","grade":null,"nickname":"91d213c3bbd24787ba97c73bac785ac7","credit":null,"uuid":"91d213c3bbd24787ba97c73bac785ac7","email":null,"iconpath":null,"academy":null,"username":"q"}
            app.globalData.userInfo.moreInfo = res.data
            console.log(JSON.parse(res.data))
            console.log(app.globalData.userInfo.moreInfo.username)
            that.setData({
              userInfo: res.data
            })
            if(that.data.userInfo.iconpath!=null){
              that.setData({
                iconpath: that.data.userInfo.iconpath.indexOf('http://') != -1 ? that.data.userInfo.iconpath:getApp().globalData.server + that.data.userInfo.iconpath
              })
              console.log(that.data.iconpath)
            }
            else{
              that.setData({
                iconpath: '../../images/avatar.png'
              })
            }
          }
        })
      }else{
        this.setData({
          userInfo: app.globalData.userInfo.moreInfo
        })
        if (this.data.userInfo.iconpath != null) {
          this.setData({
            iconpath: that.data.userInfo.iconpath.indexOf('http://') != -1 ? that.data.userInfo.iconpath : getApp().globalData.server + that.data.userInfo.iconpath
          })
          console.log(this.data.iconpath)
        }
        else {
          this.setData({
            iconpath: '../../images/avatar.png'
          })
        }
      }

    }
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