// pages/groupdetail/groupdetail.js
var Util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid:0,
    groupInfo:null,
    tag:1,
    pic_urls: ["../../images/general.png", '../../images/快递.png', '../../images/外卖.png', '../../images/资料.png', '../../images/问卷.png', '../../images/投简历.png', '../../images/组队请求.png', '../../images/其他.png'],
    state_urls: ['../../images/yellow_circle.png', '../../images/green_circle.png', '../../images/gray_circle.png', '../../images/red_circle.png'],
    state_texts: ['正在进行', '已完成', '尚未开始', '超过时限'],
    button_text:'',
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

  taskItemTap: function (e) {
    var tid = e.currentTarget.dataset.tid
    console.log(tid)

    wx.navigateTo({
      url: '../detail/detail?tid=' + tid,
    })
  },
  
  userItemTap: function(e){
    var uid = e.currentTarget.dataset.uid
    console.log(uid)

    wx.navigateTo({
      url: '../userdetail/userdetail?fromPage=2&uid=' + uid,
    })
  },

  btnTap: function(){
    if(this.data.button_text == '申请加入'){
      var that = this
      wx.request({
        url: getApp().globalData.server + 'group/addUserInGroup',
        header: {
          "content-type": "application/x-www-form-urlencoded",
          'cookie': wx.getStorageSync('cookieKey')
        },
        data: Util.json2Form({
          groupId: that.data.gid
        }),
        method: "POST",
        complete: function (res) {
          if(res.data.code == 200){
            wx.request({
              url: getApp().globalData.server + 'group/updateGroupById',
              header: {
                "content-type": "application/json",
                'cookie': wx.getStorageSync('cookieKey')
              },
              method: "POST",
              data: {
                memberNum: Number(that.data.groupInfo.memberNum) + 1,
                id: that.data.gid
              },
              complete: function (res) {
                wx.showToast({
                  title: '加入成功',
                  icon: 'none'
                })
                that.updateInfo()
              }
            })
          }
          else{
            wx.showToast({
              title: '加入失败，' + res.data.message,
              icon: 'none'
            })
          }
        }
      })
    }
    else if (this.data.button_text == '管理小组'){
      wx.navigateTo({
        url: '../editGroupInfo/editGroupInfo?gid='+this.data.gid
      })
    }
    else if(this.data.button_text == '离开小组'){
      var that = this
      wx.request({
        url: getApp().globalData.server + 'group/deleteUserInGroup',
        header: {
          "content-type": "application/x-www-form-urlencoded",
          'cookie': wx.getStorageSync('cookieKey')
        },
        data: Util.json2Form({
          groupId: that.data.gid
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
                  title: '离开成功',
                  icon: 'none'
                })
                that.updateInfo()
              }
            })
          }
          else {
            wx.showToast({
              title: '离开失败，' + res.data.message,
              icon: 'none'
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

    console.log(options.gid)
    this.setData({
      gid: options.gid
    })

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
          button_text: res.data.data.group.creator == getApp().globalData.userInfo.moreInfo.id ? '管理小组' : '申请加入',
          ['groupInfo.iconpath']: res.data.data.group.iconpath == null ? '../../images/小组.png' : res.data.data.group.iconpath.indexOf('http//') != -1 ? res.data.data.group.iconpath : getApp().globalData.server + res.data.data.group.iconpath
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
                button_text: getApp().globalData.userInfo.moreInfo.id == that.data.userList[i].id && that.data.button_text != '管理小组' ? '离开小组' : that.data.button_text,
                [key1]: that.data.userList[i].iconpath == null ? '../../images/avatar.png' : that.data.userList[i].iconpath.indexOf('http://') != -1 ? that.data.userList[i].iconpath : getApp().globalData.server + that.data.userList[i].iconpath,
                [key2]: that.data.userList[i].id == that.data.groupInfo.creator ? '组长' : '成员',
                [key3]: that.data.userList[i].sex == 1 ? '../../images/性别男.png' : that.data.userList[i].sex == 0 ? '../../images/性别女.png' : '../../images/white.png'
              })
            }

          }
        })
      
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
        that.setData({
          tasklist: res.data.data.list,

        })
        for (var i = 0; i < that.data.tasklist.length; i++){
          that.setData({
            ['tasklist[' + i + '].pic_url']: that.data.pic_urls[that.data.tasklist[i].type],
            ['tasklist[' + i + '].state_url']: that.data.state_urls[that.data.tasklist[i].state],
            ['tasklist[' + i + '].state_text']: that.data.state_texts[that.data.tasklist[i].state]
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
    this.updateInfo()

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