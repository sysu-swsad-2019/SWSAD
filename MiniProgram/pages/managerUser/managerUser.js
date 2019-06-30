// pages/managerUser/managerUser.js

var Util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid:0,
    userList:[],
    groupInfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.gid = options.gid

    this.updateInfo()
  },

  updateInfo:function(){
    var that = this
    wx.request({
      url: getApp().globalData.server + 'group/findById',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookieKey')
      },
      data: Util.json2Form({
        groupId: that.data.gid
      }),
      method: "POST",
      complete: function (res) {
        that.setData({
          groupInfo: res.data.data.group,
        })
          wx.request({
            url: getApp().globalData.server + 'group/findAllUserInGroup',
            header: {
              "content-type": "application/x-www-form-urlencoded",
              'cookie': wx.getStorageSync('cookieKey')
            },
            data: Util.json2Form({
              groupId: that.data.gid
            }),
            method: "POST",
            complete: function (res) {
              that.setData({
                userList: res.data.data.list,
              })
              for (var i = 0; i < that.data.userList.length; i++) {
                var key1 = "userList[" + i + "].iconpath"
                var key2 = "userList[" + i + "].role_text"
                var key3 = "userList[" + i + "].gender_url"
                that.setData({
                  [key1]: that.data.userList[i].iconpath == null ? '../../images/avatar.png' : that.data.userList[i].iconpath.indexOf('http://') != -1 ? that.data.userList[i].iconpath : getApp().globalData.server + that.data.userList[i].iconpath,
                  [key2]: that.data.userList[i].id == that.data.groupInfo.creator ? '组长' : '成员',
                  [key3]: that.data.userList[i].sex == 1 ? '../../images/性别男.png' : that.data.userList[i].sex == 0 ? '../../images/性别女.png' : '../../images/white.png'
                })
              }

            }
          })
      }
    })
  },

  kickoutTap:function(e){
    var uid = e.currentTarget.dataset.uid
    console.log(uid)
    var that = this
    wx.request({
      url: getApp().globalData.server + 'group/deleteUserInGroupByCreator',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookieKey')
      },
      data: Util.json2Form({
        groupId: that.data.gid,
        userId:uid
      }),
      method: "POST",
      complete: function (res) {
        if (res.data.code == 200) {
          wx.request({
            url: getApp().globalData.server + 'group/updateGroupById',
            header: {
              "content-type": "application/json",
              'cookie': wx.getStorageSync('cookieKey')
            },
            method: "POST",
            data: {
              memberNum: Number(that.data.groupInfo.memberNum) - 1,
              id: that.data.gid
            },
            complete: function (res) {
              wx.showToast({
                title: '请出成功',
                icon: 'none'
              })
              that.updateInfo()
            }
          })
        }
        else {
          wx.showToast({
            title: '请出失败，' + res.data.message,
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