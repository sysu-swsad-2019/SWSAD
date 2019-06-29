// pages/registerPage/registerPage.js
var app = getApp()
var Util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    confirm: '',
    img_url: "../../images/加号.png"
  },

  // 选择图片上传

  Img_tap:function(e){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        upload(that, tempFilePaths);
      }
    })
  },

  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  confirmInput: function (e) {
    this.setData({
      confirm: e.detail.value
    })
  },

  registerButtonTap: function(e){
    if(this.data.username == ''||this.data.password == ''|| this.data.confirm == ''){
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else{
      wx.request({
        url: getApp().globalData.server + 'regist',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: Util.json2Form({ username: this.data.username, password: this.data.password }),
        complete: function (res) {
          console.log(res.data)
          if (res.data.code == 200) {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000
            })
            let timer = setTimeout(() => {
              clearTimeout(timer)
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
          else {
            console.log(res.data.message)
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '用户注册',
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