Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskInfo: [
      {
        title: '../../images/ios-shijian.png',
        content: '结束时间：',
        text: "",
      }, {
        title: '../../images/bianhao.png',
        content: '发布数量：',
        text: "",
      }, {
        title: '../../images/type.png',
        content: '任务类型：',
        text: "",
      }, {
        title: '../../images/gender.png',
        content: '性别要求：',
        text: ""
      }, {
        title: '../../images/647.png',
        content: '年级要求：',
        text: ""
      }, {
        title: '../../images/credit.png',
        content: '信誉要求：',
        text: ""
      }],
    contents: {
    },
    typeInfo: ["不限制", "取快递", "拿外卖", "找资料", "填问卷", "征集简历", "找人组队", "其他"],
    sexInfo: ["不限制", "男", "女"],
    gradeInfo: ["不限制", "大一", "大二", "大三", "大四", "研一", "研二", "研三"],
    creditInfo: ["不限制", "100分", "95分及以上", "90分及以上"],
    groupInfo: ["不限制", "运动健将", "快乐肥宅", "高分学霸", "社交达人"],
    task_id: 0,
    user_id: 0,
    sub_btn: {
      color: "#3b750b",
      text: "任务结束"
    },
    students: [],
    currentIndex: 0,
    hideModal: true,
    nocancel: false
  },

  numtostr: function (num) {
    if (num / 10 < 1)
      return "0" + num;
    else
      return "" + num;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var taskid = 1;
    var taskid = options.tid;
    this.setData({ task_id: taskid });
    var that = this;
    wx.request({
      url: getApp().globalData.server + 'task/getTaskById', //仅为示例，并非真实的接口地址
      data: {
        id: taskid
      },
      header: {
        'content-type': "application/x-www-form-urlencoded", // 默认值
        'cookie': wx.getStorageSync('cookieKey')
      },
      success(res) {
        //console.log(res);
        //console.log(res.data.data.task);
        var taskcontent = res.data.data.task;
        var datenum = taskcontent.endtime;
        var date = new Date(datenum);
        var str = "";
        str = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + " " + that.numtostr(date.getHours()) + ":" + that.numtostr(date.getMinutes()) + ":" + that.numtostr(date.getSeconds());
        //console.log(str);
        var task_info = that.data.taskInfo;
        task_info[1].text = str;
        task_info[2].text = taskcontent.acceptNumLimit;
        task_info[3].text = that.data.typeInfo[taskcontent.type];
        task_info[4].text = that.data.sexInfo[taskcontent.sex];
        task_info[5].text = that.data.gradeInfo[taskcontent.grade];
        task_info[6].text = that.data.creditInfo[taskcontent.creditMin];
        //task_info[7].text = that.data.groupInfo[taskcontent.groupId];
        that.setData({ taskInfo: task_info });
        that.setData({ contents: taskcontent });
        //that.setData({ user_id: taskcontent.releaseUser});
      }
    });
  },

  tapfunc: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.server + 'task/findAllUserInTask', 
      data: {
        taskId: that.data.task_id,
      },
      header: {
        'content-type': "application/x-www-form-urlencoded", // 默认值
        'cookie': wx.getStorageSync('cookieKey')
      },
      success(res) {
        console.log(res.data.data.list);
        that.setData({students: res.data.data.list});
        that.setData({hideModal: false});
      }
    });
  },

  confirm: function() {
    var that = this;
    var index = this.data.currentIndex;
    var user_id = this.data.students[index].id;
    console.log(user_id);
    
    wx.request({
      url: getApp().globalData.server + 'task/finishTask', //仅为示例，并非真实的接口地址
      data: {
        taskId: that.data.task_id,
        userId: user_id
      },
      header: {
        'content-type': "application/x-www-form-urlencoded", // 默认值
        'cookie': wx.getStorageSync('cookieKey')
      },
      success(res) {
        console.log(res);
        that.setData({ hideModal: true });
        wx.showModal({
          title: '提示',
          content: '任务结束',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.navigateBack({
                url: "../taskrelease/taskrelease"
              })
            }
          }
        })
      }
    });
  },

  cancel: function() {
    this.setData({hideModal: true});
  },

  bindPickerChange: function(e) {
    //console.log(e.detail.value["0"]);
    this.setData({ currentIndex: e.detail.value["0"]});
  }
})