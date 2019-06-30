// pages/editGroupInfo/editGroupInfo.js

var Util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupInfo:null,
    gid:0,
    hiddenmodal:true,
    input_text:'',
    input:'',
    max_length:20,
    index:0,
    selection_list:[
      {
        title: '小组图标',
        img_url: '../../images/avatar.png',
        tap: 'iconTap'
      },
      {
        title: '小组名称',
        text: '。。。',
        tap: 'nameTap'
      },
      {
        title: '小组描述',
        text: '。。。',
        tap: 'descriptionTap'
      },
      {
        title: '小组成员',
        text: '',
        tap: 'memberTap'
      }
    ]
  },

  setListData:function(){
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

        that.data.groupInfo = res.data.data.group
        that.setData({
          ['selection_list[0].img_url']: that.data.groupInfo.iconpath == null ? '../../images/小组.png' : that.data.groupInfo.iconpath.indexOf('http://') != -1 ? that.data.groupInfo.iconpath : getApp().globalData.server + that.data.groupInfo.iconpath,
          ['selection_list[1].text']: that.data.groupInfo.name,
          ['selection_list[2].text']: that.data.groupInfo.description
        })
        
      }
    })
  },

  iconTap: function () {
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

  nameTap: function () {

    this.setData({
      input: '',
      hiddenmodal: false,
      input_text: '请输入小组名称',
      index: 1
    })

  },

  descriptionTap: function () {

    this.setData({
      input: '',
      hiddenmodal: false,
      input_text: '请输入小组描述',
      index: 2
    })

  },

  inputChange: function (e) {
    this.setData({
      input: e.detail.value
    })
  },

  cancel: function () {
    console.log('cancel')
    this.setData({
      hiddenmodal: true,
    })
  },

  confirm: function () {
    var that = this
    console.log('confirm')
    console.log(this.data.input)
    if (this.data.input != '') {
      if (this.data.index == 1) {
        wx.request({
          url: getApp().globalData.server + 'group/updateGroupById',
          header: {
            "content-type": "application/json",
            'cookie': wx.getStorageSync('cookieKey')
          },
          method: "POST",
          data: {
            name: that.data.input,
            id: that.data.gid
          },
          complete: function (res) {
            if(res.data.code == 200){
              that.setData({
                ['selection_list[1].text']: that.data.input,
              })
              wx.showToast({
                title: '修改成功',
                icon: 'none'
              })
            }
          }
        })
      }
      else if(this.data.index == 2){
        wx.request({
          url: getApp().globalData.server + 'group/updateGroupById',
          header: {
            "content-type": "application/json",
            'cookie': wx.getStorageSync('cookieKey')
          },
          method: "POST",
          data: {
            description: that.data.input,
            id: that.data.gid
          },
          complete: function (res) {
            if (res.data.code == 200) {
              that.setData({
                ['selection_list[2].text']: that.data.input,
              })
              wx.showToast({
                title: '修改成功',
                icon: 'none'
              })
            }
          }
        })
      }
    }
    this.setData({
      hiddenmodal: true
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gid : options.gid
    })
    this.setListData()
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

function upload(page, path) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),
  console.log(page.data.gid)
    wx.uploadFile({
    url: getApp().globalData.server + 'group/setGroupIcon',
      filePath: path[0],
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data",
        'cookie': wx.getStorageSync('cookieKey')
      },
      data: {
        groupId: page.data.gid
      },
      complete: function (res) {
        if (res.statusCode == 200) {
          page.setListData()
          wx.showToast({
            title: '修改成功',
            icon: 'none'
          })
        }
        else {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
        }

      }
    })
}