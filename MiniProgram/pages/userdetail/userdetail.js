// pages/userdetail/userdetail.js
var Util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromPage:0,
    uid:0,
    gender_url: '../../images/性别男.png',  //用户未填写就设为'../../images/white.png'
    grade:'',
    userInfo:null,
    tag:1,
    pic_urls: ["../../images/general.png", '../../images/快递.png', '../../images/外卖.png', '../../images/资料.png', '../../images/问卷.png', '../../images/投简历.png', '../../images/组队请求.png', '../../images/其他.png'],
    state_urls: ['../../images/yellow_circle.png', '../../images/green_circle.png', '../../images/gray_circle.png', '../../images/red_circle.png'],
    state_texts: ['正在进行', '已完成', '尚未开始', '超过时限'],

    // 参加的小组
    grouplist:[
      /*
      {
        name: '小程序学习小组ceshichangwenceshichangwenceshichangwencesh',
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
      }
      */
    ],

    //参与的任务
    tasklist: [
      /*
      {
        tid: 1,
        name: '帮忙取个快递',
        type: 0,
        pic_url: '../../images/快递.png',//两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 0,
        state_url: '../../images/yellow_circle.png',
        state_text: '正在进行',
        description: '蜂巢5号柜，取件码11111，送到xxx谢谢！！',
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
      }*/
    ],

  },
  //任务列表点击事件

  labelTap1: function (e) {
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

  groupItemTap: function (e) {
    var gid = e.currentTarget.dataset.gid
    console.log(gid)

    wx.navigateTo({
      url: '../groupdetail/groupdetail?gid=' + gid,
    })
  },

  taskItemTap: function (e) {
    var tid = e.currentTarget.dataset.tid
    console.log(tid)

    wx.navigateTo({
      url: '../detail/detail?tid=' + tid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if(options.fromPage == 1){
      this.data.fromPage = 1
    }
    else if (options.fromPage == 2){
      this.data.fromPage = 2
      this.data.uid = options.uid
      console.log(this.data.uid, this.data.fromPage)
    }

  },
  getmoreInfo:function(user){
    var that = this
    this.setData({
      userInfo: user,
      ['userInfo.iconpath']: user.iconpath == null ? '../../images/avatar.png' : user.iconpath.indexOf('http://') != -1 ? user.iconpath : getApp().globalData.server + user.iconpath
    })


    wx.request({
      url: getApp().globalData.server + 'group/findAllGroupByUser',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookieKey')
      },
      data: Util.json2Form({
        userId: user.id
      }),
      method: "POST",
      complete: function (res) {
        that.setData({
          grouplist: res.data.data.list
        })
        for (var i = 0; i < that.data.grouplist.length; i++) {
          var key = 'grouplist[' + i + '].iconpath'
          that.setData({
            [key]: that.data.grouplist[i].iconpath == null ? '../../images/小组.png' : that.data.grouplist[i].iconpath.indexOf('http://') != -1 ? that.data.grouplist[i].iconpath : getApp().globalData.server + that.data.grouplist[i].iconpath,
          })
        }
      }
    })

    wx.request({
      url: getApp().globalData.server + 'task/getTaskByUsername',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'cookie': wx.getStorageSync('cookieKey')
      },
      data: Util.json2Form({
        userId: user.id
      }),
      method: "POST",
      complete: function (res) {
        that.setData({
          tasklist: res.data.data.list
        })
        for (var i = 0; i < that.data.tasklist.length; i++) {
          that.setData({
            ['tasklist[' + i + '].pic_url']: that.data.pic_urls[that.data.tasklist[i].type],
            ['tasklist[' + i + '].state_url']: that.data.state_urls[that.data.tasklist[i].state],
            ['tasklist[' + i + '].state_text']: that.data.state_texts[that.data.tasklist[i].state]
          })
        }
      }
    })


    if (user.sex == '0') {
      this.setData({
        gender_url: '../../images/性别女.png'
      })
    }
    else if (user.sex == '1') {
      this.setData({
        gender_url: '../../images/性别男.png'
      })
    }
    else if (user.sex == '-1') {
      this.setData({
        gender_url: '../../images/white.png'
      })
    }
    if (user.grade == '-1') {
      this.setData({
        grade: '未填'
      })
    } else
      if (user.grade == '1') {
        this.setData({
          grade: '大一'
        })
      } else
        if (user.grade == '2') {
          this.setData({
            grade: '大二'
          })
        } else
          if (user.grade == '3') {
            this.setData({
              grade: '大三'
            })
          } else
            if (user.grade == '4') {
              this.setData({
                grade: '大四'
              })
            } else
              if (user.grade == '5') {
                this.setData({
                  grade: '研一'
                })
              } else
                if (user.grade == '6') {
                  this.setData({
                    grade: '研二'
                  })
                }
  },
  updateInfo:function(){
    var user
    var that = this
    if(this.data.fromPage == 1){
      user = getApp().globalData.userInfo.moreInfo
      this.getmoreInfo(user)
    }else
    if(this.data.fromPage == 2){
      wx.request({
        url: getApp().globalData.server + 'userinfo/getUserInfoById',
        header: {
          "content-type": "application/x-www-form-urlencoded",
          'cookie': wx.getStorageSync('cookieKey')
        },
        data: Util.json2Form({
          userId: that.data.uid
        }),
        method: "POST",
        complete: function (res) {
          that.getmoreInfo(res.data)
        }
      })
    }
    
 
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