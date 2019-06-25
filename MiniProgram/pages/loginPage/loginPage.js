// pages/loginPage/loginPage.js
var Util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:''
  },

  usernameInput: function(e){
    this.setData({
      username: e.detail.value
    })
  },

  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  loginButtonTap: function(e){
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else{
      wx.request({
        url: "http://172.26.17.164:8080/login",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: Util.json2Form({ username: this.data.username, password: this.data.password }),
        complete: function (res) {
          if(res.data.code == 200){

            if (res && res.header && res.header['Set-Cookie']) {
              wx.setStorageSync('cookieKey', res.header['Set-Cookie']);   //保存Cookie到Storage
            }
            // cookie
            let cookie = wx.getStorageSync('cookieKey');//取出Cookie
            let header = { 'Content-Type': 'application/x-www-form-urlencoded' };
            if (cookie) {
              header.Cookie = cookie;
            }
            console.log(cookie)

            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })

            //测试cookie
            wx.request({
              url: "http://172.26.17.164:8080/userinfo/getUserInfo",
              header: {
                "content-type": "application/x-www-form-urlencoded",
                'cookie': wx.getStorageSync('cookieKey')
              },
              method: "POST",
              complete: function (res) {
                console.log(res.data)
              }
            })
           
          }
          else{
            wx.showToast({
              title: res.data.message,
              icon:'none',
              duration: 2000
            })
          }
        }
      })
    }
  },

  forgetPasswordTap: function(e){
    wx.showToast({
      title: '忘记密码',
      icon: 'none',
      duration: 2000
    })
  },

  registerButtonTap: function (e) {
    wx.navigateTo({
      url: '../registerPage/registerPage',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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