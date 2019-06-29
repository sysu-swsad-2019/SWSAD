Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskInfo: [
      {
        title: "../../images/footer-icon-04.png",
        content: "发布者：",
        text: "",
      },

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
      }
    ],
    contents: {
    },
    typeInfo: ["不限制", "取快递", "拿外卖", "找资料", "填问卷", "征集简历", "找人组队", "其他"],
    sexInfo: ["不限制", "男", "女"],
    gradeInfo: ["不限制", "大一", "大二", "大三", "大四", "研一", "研二", "研三"],
    creditInfo: ["不限制", "100分", "95分及以上", "90分及以上"],
    groupInfo: ["不限制", "运动健将", "快乐肥宅", "高分学霸", "社交达人"],
    task_id: 0
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
      url: 'http://172.26.17.164:8080/task/getTaskById', //仅为示例，并非真实的接口地址
      data: {
        id: taskid
      },
      header: {
        'content-type': "application/x-www-form-urlencoded", // 默认值
        'cookie': wx.getStorageSync('cookieKey')
      },
      success(res) {
        console.log(res.data.data.task);
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
      }
    });
  },

  tapfunc: function () {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    var itemlist = this.data.contents;
    //console.log(userInfo);
    //console.log(itemlist);
    if (userInfo.sex != itemlist.sex && itemlist.sex != 0) {
      wx.showToast({
        title: '性别不符合要求',
        icon: 'none',
        duration: 2000
      });
    } else if (userInfo.grade != itemlist.grade && itemlist.grade != 0) {
      wx.showToast({
        title: '年级不符合要求',
        icon: 'none',
        duration: 2000
      });
    } else if (userInfo.credit < itemlist.creditMin && itemlist.creditMin != 0) {
      wx.showToast({
        title: '信誉不符合要求',
        icon: 'none',
        duration: 2000
      });
    } else {
    wx.request({
      url: 'http://172.26.17.164:8080/task/addUserInTask', //仅为示例，并非真实的接口地址
      data: {
        taskId: that.data.task_id
      },
      header: {
        'content-type': "application/x-www-form-urlencoded", // 默认值
        'cookie': wx.getStorageSync('cookieKey')
      },
      success(res) {
        console.log(res.data);
        /*
        if (res.data.message = "成功加入") {
          wx.showToast({
            title: "已领取任务",
            icon: 'none',
            duration: 4000
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 4000
          });
          wx.navigateBack({
            url: "../task/task"
          });
        }*/
      },
      fail(err) {
        console.log(err.data);
        wx.showToast({
          title: err.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    });
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