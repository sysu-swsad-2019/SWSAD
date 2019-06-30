// pages/release/release.js
//获取应用实例
var app = getApp();
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromPage:-1,
    groupId:-1,
    hidden:true,
    taskNum:0,
    userInfo: {},
    titleCount: 0, //标题字数
    contentCount: 0, //正文字数
    title: '', //标题内容
    content: '', //正文内容
    imgs: [],
    showError: false,
    startTime: null,
    endTime: null,
    dateTimeArray: null,
    dateTime: null,
    startYear: 2000,
    endYear: 2050,
    number: 1,
    disable1: false,
    disable2: false,
    disable3: false,
    disable4: false,
    longTime: null,
    reward: 1,
    type: 0,
    gender: 0,
    grade: 0,
    score: 0,
    group: 0,
    selectArray1: [
      { "text": "不限制" },
      { "text": "取快递" },
      { "text": "拿外卖" },
      { "text": "找资料" },
      { "text": "填问卷" },
      { "text": "征集简历" },
      { "text": "找人组队" },
      { "text": "其他" },
    ],
    selectArray2: [
      { "text": "不限制" },
      { "text": "男" },
      { "text": "女" },
    ],
    selectArray3: [
      { "text": "不限制" },
      { "text": "大一" },
      { "text": "大二" },
      { "text": "大三" },
      { "text": "大四" },
      { "text": "研一" },
      { "text": "研二" },
      { "text": "研三" },
    ],
    selectArray4: [
      { "text": "不限制" },
      { "text": "100分" },
      { "text": "95分及以上" },
      { "text": "90分及以上" },
    ],
    selectArray5: [
      { "text": "不限制" },
      { "text": "运动健将" },
      { "text": "快乐肥宅" },
      { "text": "高分学霸" },
      { "text": "社交达人" },
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.fromPage == 1){
      this.data.fromPage=1
      this.data.groupId = options.gid
      this.data.taskNum = options.taskNum
    }
    this.data.reward.toFixed(1);
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj.dateTimeArray.pop();
    var lastTime = obj.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  changeDateTime(e) {
    var time = require('../../utils/util.js');
    var start = new Date();
    // 除以1000取消毫秒的影响
    var sjc = Date.parse(time.formatTime(start));
    this.setData({
      startTime: sjc
    });
    // console.log(this.data.startTime);
    var end = new Date(this.data.dateTimeArray[0][this.data.dateTime[0]], this.data.dateTimeArray[1][this.data.dateTime[1]] - 1, this.data.dateTimeArray[2][this.data.dateTime[2]], this.data.dateTimeArray[3][this.data.dateTime[3]], this.data.dateTimeArray[4][this.data.dateTime[4]]);
    // 除以1000取消毫秒的影响
    sjc = Date.parse(time.formatTime(end));
    this.setData({
      dateTime: e.detail.value,
      endTime: sjc
    });
    console.log(end);
    console.log(this.data.endTime);
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  listenerTitle(e) {
    this.setData({
      'title': e.detail.value,
      titleCount: e.detail.value.length
    });
  },
  listenerTextarea(e) {
    this.setData({
      'content': e.detail.value,
      contentCount: e.detail.value.length
    });
  },
  prevNum1() {
    this.setData({
      number: this.data.number >= 500 ? 500 : this.data.number + 1,
      disabled1: this.data.number !== 1 ? false : true,
      disabled2: this.data.number !== 500 ? false : true
    });
    // console.log(this.data.number);
  },
  nextNum1() {
    this.setData({
      number: this.data.number <= 1 ? 1 : this.data.number - 1,
      disabled1: this.data.number !== 1 ? false : true,
      disabled2: this.data.number !== 500 ? false : true
    });
    // console.log(this.data.number);
  },
  reducelongTap: function (e) {
    this.data.longTime = setInterval(() => {
      if (this.data.number == 0) {
        clearInterval(this.data.longTime)
        return;
      }
      this.setData({
        number: this.data.number <= 1 ? 1 : this.data.number - 1,
        disabled1: this.data.number !== 1 ? false : true,
        disabled2: this.data.number !== 500 ? false : true
      });
      // console.log(this.data.number);
    }, 50)
  },
  addlongTap: function (e) {
    this.data.longTime = setInterval(() => {
      if (this.data.number >= 500) {
        clearInterval(this.data.longTime)
        return;
      }
      this.setData({
        number: this.data.number >= 500 ? 500 : this.data.number + 1,
        disabled1: this.data.number !== 1 ? false : true,
        disabled2: this.data.number !== 500 ? false : true
      });
      // console.log(this.data.number);
    }, 50)
  },
  prevNum2() {
    this.setData({
      reward: this.data.reward >= 99 ? 99 : this.data.reward + 1,
      // reward: this.data.reward.toFixed(1),
      disabled3: this.data.reward !== 1 ? false : true,
      disabled4: this.data.reward !== 99 ? false : true
    });
    // console.log(this.data.reward);
  },
  nextNum2() {
    this.setData({
      reward: this.data.reward <= 1 ? 1 : this.data.reward - 1,
      // reward: this.data.reward.toFixed(1),
      disabled3: this.data.reward !== 1 ? false : true,
      disabled4: this.data.reward !== 99 ? false : true
    });
    // console.log(this.data.number);
  },
  reducelongTap1: function (e) {
    this.data.longTime = setInterval(() => {
      if (this.data.reward == 1) {
        clearInterval(this.data.longTime)
        return;
      }
      this.setData({
        reward: this.data.reward <= 1 ? 1 : this.data.reward - 1,
        // reward: this.data.reward.toFixed(1),
        disabled3: this.data.reward !== 1 ? false : true,
        disabled4: this.data.reward !== 99 ? false : true
      });
      // console.log(this.data.reward);
    }, 50)
  },
  addlongTap1: function (e) {
    this.data.longTime = setInterval(() => {
      if (this.data.reward >= 99) {
        clearInterval(this.data.longTime)
        return;
      }
      this.setData({
        reward: this.data.reward >= 99 ? 99. : this.data.reward + 1,
        // reward: this.data.reward.toFixed(1),
        disabled3: this.data.reward !== 1 ? false : true,
        disabled4: this.data.reward !== 99 ? false : true
      });
      // console.log(this.data.reward);
    }, 50)
  },
  leave: function (e) {
    clearInterval(this.data.longTime);
  },
  choosePhoto: function () {
    var _this = this;
    wx.chooseImage({
      sourceType: ['album'],
      success: function (res) {
        const images = _this.data.imgs.concat(res.tempFilePaths)
        _this.setData({
          // 限制最多只能留下3张照片
          imgs: images.length <= 3 ? images : images.slice(0, 3)
        });
      }
    });
  },
  removeImage(e) {
    //删除图片
    var _this = this;
    const idx = e.target.dataset.idx
    var _imgs = _this.data.imgs;
    _imgs.splice(idx, 1);
    _this.setData({
      imgs: _imgs
    });
  },
  previewPhoto: function (e) {
    var _this = this;
    //预览图片
    wx.previewImage({
      current: _this.data.imgs[e.target.dataset.index],  // 当前预览的图片
      urls: _this.data.imgs  // 所有要预览的图片
    });
  },
  getType: function (e) {
    this.setData({
      type: e.detail.id
    });
    // console.log(e.detail.id);
  },
  getGender: function (e) {
    this.setData({
      gender: e.detail.id
    });
  },
  getGrade: function (e) {
    this.setData({
      grade: e.detail.id
    });
  },
  getScore: function (e) {
    this.setData({
      score: e.detail.id
    });
  },
  getGroup: function (e) {
    this.setData({
      group: e.detail.id
    });
  },
  submit: function () {
    var userInfo = getApp().globalData.userInfo.moreInfo;
    var umoney = userInfo.money;
    if (umoney < this.data.reward) {
      wx.showModal({
        title: '提示',
        content: '金钱不足',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {

      if (!app.globalData.userInfo.isLogin) {
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        })
      }
      var _this = this, title = '', content = '', imgs = '';
      if (app.g_status) {
        app.showErrorModal(app.g_status, '提交失败');
        return;
      }
      _this.setData({
        showError: true
      });
      if (!_this.data.title || !_this.data.content) {
        // 标题，内容不能为空
        return false;
      }
      wx.showModal({
        title: '提示',
        content: '是否确认提交任务？',
        success: function (res) {
          if (res.confirm) {
            // title = '【' + app._user.wx.nickName + '】' + _this.data.title;
            // content = _this.data.content + '\r\n\r\n' + _this.data.content;
            // if (_this.data.imgs.length) {
            //   _this.data.imgs.forEach(function (e) {
            //     imgs += '\r\n\r\n' + '![img](' + e + '?imageView2/2/w/750/interlace/0/q/88|watermark/2/text/V2Xph43pgq4=/font/5b6u6L2v6ZuF6buR/fontsize/500/fill/I0VGRUZFRg==/dissolve/100/gravity/SouthEast/dx/10/dy/10)';
            //   });
            //   content += imgs;
            // }
            // app.showLoadToast();
            // console.log(_this.data.endTime);

            wx.request({
              url: getApp().globalData.server + 'task/insertTask',
              data: {
                taskname: _this.data.title,
                starttime: _this.data.startTime,
                endtime: _this.data.endTime,
                type: _this.data.type,
                releaseUser: 1233456,
                acceptNumLimit: _this.data.number,
                hasTargetLimit: 1,
                description: _this.data.content,
                sex: _this.data.gender,
                grade: _this.data.grade,
                creditMin: _this.data.score,
                groupId: _this.data.groupId,
                reward: _this.data.reward,
                state: 0
              },
              method: 'POST',
              header: {
                'content-type': 'application/json',
                'cookie': wx.getStorageSync('cookieKey')
              },
              success: function (res) {
                // if (res.data.status === 200) {
                //   var text = '提交成功';
                //   wx.showModal({
                //     title: '提交成功',
                //     content: text,
                //     showCancel: false,
                //     success: function (res) {
                //       wx.navigateBack();
                //     }
                //   });
                // } else {
                //   app.showErrorModal(res.data.message, '提交失败');
                // }
                if(_this.data.fromPage==1){
                  wx.request({
                    url: getApp().globalData.server + 'group/updateGroupById',
                    header: {
                      "content-type": "application/json",
                      'cookie': wx.getStorageSync('cookieKey')
                    },
                    method: "POST",
                    data: {
                      taskNum: Number(_this.data.taskNum) + 1,
                      id: _this.data.groupId
                    },
                    complete: function (res) {
                    }
                  })
               }

                app.showErrorModal(res.data.message, '提交成功');
                wx.navigateBack();


              },
              fail: function (res) {
                app.showErrorModal(res.errMsg, '提交失败');
              },
              complete: function () {
                wx.hideToast();
              }
            });
          }
        }
      });
    }
  }
})