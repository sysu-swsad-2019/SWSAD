Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors: ["yellow", "green", "grey", "red"],
    pic_urls: ["../../images/general.png", '../../images/快递.png', '../../images/外卖.png', '../../images/资料.png', '../../images/问卷.png', '../../images/投简历.png', '../../images/组队请求.png', '../../images/其他.png'],
    state_urls: ['../../images/yellow_circle.png', '../../images/green_circle.png', '../../images/gray_circle.png', '../../images/red_circle.png'],
    state_texts: ['正在进行', '已完成', '尚未开始', '超过时限'],
    coin_url: "../../images/money_icon.png",
    people_url: "../../images/用户.png",
    task_id: [], // 所有任务的id
    count: 20,
    hideHeader: true,
    hideBottom: true,
    refreshTime: '', // 刷新的时间 
    contentlist: [], // 列表显示的数据源
    currentlist: [], // 当前的数据源
    currentPage: 10, // 当前页数  默认是1
    loadMoreData: '加载更多……',
    theight: 1050,
    hidetop: true,
    hidebottom: true,
    first: true, // 是否第一次加载
    haveTask: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initial();
  },

  onShow: function () {
    this.initial();
  },

  initial: function () {
    var date = new Date();
    this.setData({
      refreshTime: date.toLocaleTimeString(),
      hidebottom: true,
    });
    //console.log(date.toLocaleTimeString());
    var id = [];
    var that = this;
    var contents = [];
    var current = [];
    wx.request({
      url: getApp().globalData.server + 'task/getTaskByUsername', //仅为示例，并非真实的接口地址
      header: {
        'content-type': "application/x-www-form-urlencoded", // 默认值
        'cookie': wx.getStorageSync('cookieKey')
      },
      data: {
        userId: getApp().globalData.userInfo.moreInfo.id
      },
      method: "POST",
      success(res) {
        console.log(res);
        contents = res.data.data.list;
        //console.log(contents.length);
        //console.log(contents[2]);
        that.setData({
          contentlist: contents
        });
        var size = contents.length;
        if (size < 10)
          current = contents.slice(0, size);
        else
          current = contents.slice(0, 10)
        that.setData({
          currentlist: current
        });
        that.setData({
          first: false
        });
        that.setData({
          currentPage: current.length
        });
      }
    });
  },

  tapfunc: function (e) {
    var taskid = e.target.dataset.tid;
    var number = e.target.dataset.num;
    wx.navigateTo({
      url: '../acTaskDetail/acTaskDetail?tid=' + taskid
    });
  },

  mask: function (number) {
    var arr = number.split('');
    if (arr.length == 11) {
      arr.splice(3, 4, '*', '*', '*', '*');
    }
    return arr.join('');
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    setTimeout(this.hidefunc, 1000);
  },
  hidefunc: function () {
    var networkType;
    var that = this;
    wx.getNetworkType({
      success(res) {
        networkType = res.networkType;
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        console.log(networkType);
        if (networkType == "none") {
          that.setData({
            hidetop: false
          });
        } else {
          that.initial();
          that.setData({
            hidetop: true
          });
        }
      },
      fail(res) {
        console.log("request fail");
      }
    });
  },

  onReachBottom: function () {
    setTimeout(this.loadMore, 500);
  },


  loadMore: function () {
    var that = this;

    var current = that.data.currentlist;
    var content = that.data.contentlist;
    var newlist = [];
    if (current.length == content.length) {
      this.setData({
        hidebottom: false
      });
    } else {
      var cur = that.data.currentPage;
      var len = that.data.contentlist.length;
      console.log(cur);
      console.log(len);
      if (len - cur < 5) {
        current = current.concat(content.slice(cur, len));
        that.setData({
          currentPage: len,
          currentlist: current
        });
      } else {
        current = current.concat(content.slice(cur, cur + 5));
        that.setData({
          currentPage: cur + 5,
          currentlist: current
        });
      }
    }
  },

  refresh: function (e) {

  },

  getData: function () {
    var that = this;
    var pageIndex = that.data.currentPage;
    if (pageIndex == 1) { // 下拉刷新

      self.setData({
        allPages: dataModel.showapi_res_body.pagebean.allPages,
        contentlist: dataModel.showapi_res_body.pagebean.contentlist,
        hideHeader: true
      })
    }
  }
})