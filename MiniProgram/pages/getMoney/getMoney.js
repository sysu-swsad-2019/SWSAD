// pages/getMoney/getMoney.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      money: app.globalData.userInfo.moreInfo.money
    })
  },

  addMoney: function(){
    let tmp = Number(this.data.money) + Number(100)
    this.setData({
      money: tmp
    })
    app.globalData.userInfo.moreInfo.money = this.data.money
    var that = this
    wx.request({
      url: "http://172.26.17.164:8080/userinfo/setUserInfo",
      header: {
        "content-type": "application/json",
        'cookie': wx.getStorageSync('cookieKey')
      },
      method: "POST",
      data: {
        money: that.data.money
      },
      complete: function (res) {
        if (res.data.code == 200) {

          wx.showToast({
            title: '充值成功',
            icon: 'none'
          })
        }
        else {
          wx.showToast({
            title: '充值失败',
            icon: 'none'
          })
        }
      }
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