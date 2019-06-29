// pages/creategroup/creategroup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    description:''
  },

  GroupNameInput:function(e){
    this.setData({
      name: e.detail.value
    })
  },

  GroupDescriptionInput:function(e){
    this.setData({
      description:e.detail.value
    })
  },

  createGroupTap:function(){
    wx.request({
      url: getApp().globalData.server + 'group/insertGroup',
      header: {
        "content-type": "application/json",
        'cookie': wx.getStorageSync('cookieKey')
      },
      method: "POST",
      data: {
        name:this.data.name,
        description:this.data.description
      },
      complete: function (res) {
        console.log(res)
        if(res.data.code == 200){
          wx.showToast({
            title: '创建成功',
            icon:'none'
          })


        }
        else{
          wx.showToast({
            title: '创建失败',
            icon:'none'
          })
        }
        let timer = setTimeout(() => {
          clearTimeout(timer)
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
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