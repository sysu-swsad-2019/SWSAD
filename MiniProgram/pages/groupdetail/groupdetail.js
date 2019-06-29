// pages/groupdetail/groupdetail.js
var Util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid:0,
    name: '小程序学习小组',
    description: '欢迎大家的加入！changwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshichangwenceshi',
    imgurls: ['../../images/defaultGroupImg.jpg'],
    memberNum: 100,
    taskNum: 50,
    tag:1,
    tasklist:[
      /*
      {
        tid: 1,
        name: '帮忙取个快递',
        type: 0,
        pic_url:  '../../images/快递.png',//两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 0,
        state_url: '../../images/yellow_circle.png',
        state_text: '正在进行',
        description:'蜂巢5号柜，取件码11111，送到xxx谢谢！！',
      },
      {
        tid: 2,
        name: '帮忙买个麦当劳',
        type: 1,
        pic_url: '../../images/外卖.png',//两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 2,
        state_url: '../../images/gray_circle.png',
        state_text: '尚未开始',
        description: '买个xxx套餐送到xxx谢谢！',
      },
      {
        tid: 3,
        name: '帮忙找下资料',
        type: 2,
        pic_url: '../../images/资料.png',//两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 1,
        state_url: '../../images/green_circle.png',
        state_text: '已完成',
        description: '各位帮忙找下微信小程序的学习视频！！！挺急的，感谢！！',
      },
      {
        tid: 4,
        name: '帮忙填个问卷',
        type: 3,
        pic_url: '../../images/问卷.png',//两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 0,
        state_url: '../../images/yellow_circle.png',
        state_text: '正在进行',
        description: '链接在此：http://xxxxxxx.com',
      },
      {
        tid: 5,
        name: '简历征集',
        type: 4,
        pic_url: '../../images/投简历.png',//两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 3,
        state_url: '../../images/red_circle.png',
        state_text: '超过时限',
        description: '现收集应届毕业生简历50份，模板见http://xxxxxxx.com',
      },
      {
        tid: 6,
        name: '组队跑步去~',
        type: 5,
        pic_url: '../../images/组队请求.png',//两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 0,
        state_url: '../../images/yellow_circle.png',
        state_text: '正在进行',
        description: '找个人一块跑步挣章啦！！',
      },
      {
        tid: 7,
        name: '我是充数的changwenceshichangwenceshichangwenceshi',
        type: 6,
        pic_url: '../../images/其他.png',//两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 0,
        state_url: '../../images/yellow_circle.png',
        state_text: '正在进行',
        description: '不知道写啥就谢谢在座的各位吧',
      }
      */
    ],
    userList:[
      /*
      {
        uid:1,
        name: '刘备',
        pic_url: '../../images/用户.png',
        gender: 1,
        gender_url:'../../images/性别男.png',
        money:25,
        role:0,
        role_text:'组长'
      },
      {
        uid: 2,
        name: '关羽',
        pic_url: '../../images/用户.png',
        gender: 1,
        gender_url: '../../images/性别男.png',
        money: 100,
        role:1,
        role_text:'管理'
      },
      {
        uid: 3,
        name: '张飞',
        pic_url: '../../images/用户.png',
        gender: 1,
        gender_url: '../../images/性别男.png',
        money: 100,
        role:1,
        role_text: '管理'
      },
      {
        uid: 4,
        name: '简雍',
        pic_url: '../../images/用户.png',
        gender: 1,
        gender_url: '../../images/性别男.png',
        money: 100,
        role: 2,
        role_text: '成员'
      },
      {
        uid: 5,
        name: '糜夫人',
        pic_url: '../../images/用户.png',
        gender: 0,
        gender_url: '../../images/性别女.png',
        money: 100,
        role: 2,
        role_text: '成员'
      },
      {
        uid: 6,
        name: '刘禅',
        pic_url: '../../images/用户.png',
        gender: -1,  //表示用户未填性别
        gender_url: '../../images/white.png',
        money: '1.1w',
        role: 2,
        role_text: '成员'
      },
      */
    ]

  },

  group_img_preview:function(event){

  },

  labelTap1:function(e){
    this.setData({
      tag: 1
    })
    console.log(this.data.tag)
  },

  labelTap2: function (e) {
    this.setData({
      tag: 2
    })
    console.log(this.data.tag)
  },

  labelTap3: function (e) {
    this.setData({
      tag: 3
    })
    console.log(this.data.tag)
  },

  taskItemTap: function(e){

  },
  
  userItemTap: function(e){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.gid)
    this.setData({
      gid: options.gid
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
        console.log(res.data.data)
      }
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
        console.log(res.data.data)
      }
    })

    wx.request({
      url: getApp().globalData.server + 'group/findAllTaskInGroup',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookieKey')
      },
      data: Util.json2Form({
        groupId: that.data.gid
      }),
      method: "POST",
      complete: function (res) {
        console.log(res.data.data)
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