// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentlist:[
      /*
      {
        name:'小程序学习小组ceshichangwenceshichangwenceshichangwencesh',
        description:'欢迎大家的加入！changwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshi',
        imgurl:'../../images/defaultGroupImg.jpg',
        memberNum:100,
        taskNum:50
      },
      {
        name: '小程序学习小组',
        description: '欢迎大家的加入！changwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshi',
        imgurl: '../../images/defaultGroupImg.jpg',
        memberNum: 100,
        taskNum: 50
      },
      {
        name: '小程序学习小组',
        description: '欢迎大家的加入！changwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshi',
        imgurl: '../../images/defaultGroupImg.jpg',
        memberNum: 100,
        taskNum: 50
      },
      {
        name: '小程序学习小组',
        description: '欢迎大家的加入！changwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshi',
        imgurl: '../../images/defaultGroupImg.jpg',
        memberNum: 100,
        taskNum: 50
      },
      {
        name: '小程序学习小组',
        description: '欢迎大家的加入！changwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshi',
        imgurl: '../../images/defaultGroupImg.jpg',
        memberNum: 100,
        taskNum: 50
      },
      {
        name: '小程序学习小组',
        description: '欢迎大家的加入！changwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshi',
        imgurl: '../../images/defaultGroupImg.jpg',
        memberNum: 100,
        taskNum: 50
      },
      {
        name: '三年二班',
        description: '欢迎大家的加入！',
        imgurl: '../../images/defaultGroupImg.jpg',
        memberNum: 100,
        taskNum: 50
      },
      {
        name: '公益组团',
        description: '为了公益时，冲鸭！！',
        imgurl: '../../images/defaultGroupImg.jpg',
        memberNum: 100,
        taskNum: 50
      },
      {
        name: '公益组团',
        description: '为了公益时，冲鸭！！',
        imgurl: '../../images/defaultGroupImg.jpg',
        memberNum: 100,
        taskNum: 50
      }*/
    ]
  },
  listItemTap:function(e){
    var gid = e.currentTarget.dataset.gid
    console.log(gid)

    if (getApp().globalData.userInfo.isLogin) {
      wx.navigateTo({
        url: '../groupdetail/groupdetail?gid='+gid,
      })
    }
    else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  create_tap:function(e){
    if (getApp().globalData.userInfo.isLogin) {
      wx.navigateTo({
        url: '../creategroup/creategroup',
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
    var that = this
    wx.request({
      url: getApp().globalData.server + 'group/findAllGroup',
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      complete: function (res) {
        that.setData({
          contentlist :res.data.data.list
        })
      }
    })
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