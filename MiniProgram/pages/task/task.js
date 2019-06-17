Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [{
        id: '0',
        task_title: "外卖代拿",
        user_name: "老张",
        phone: "15106058800"
      },
      {
        id: '1',
        task_title: "外卖代拿",
        user_name: "老张",
        phone: "15106058800"
      }
    ],
    count: 20,
    hideHeader: true,
    hideBottom: true,
    refreshTime: '', // 刷新的时间 
    contentlist: [], // 列表显示的数据源
    allPages: '', // 总页数
    currentPage: 1, // 当前页数  默认是1
    loadMoreData: '加载更多……',
    theight: 1050,
    hidetop: true,
    hidebottom: false
  },

  tapfunc: function(e) {
    wx.navigateTo({
      url: '../detail/detail'
    });
  },

  mask: function(number) {
    var arr = number.split('');
    if (arr.length == 11) {
      arr.splice(3, 4, '*', '*', '*', '*');
    }
    return arr.join('');
  },

  onPullDownRefresh: function() {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    setTimeout(this.hidefunc, 1000);
  },
  hidefunc: function() {
    var networkType;
    var that = this;
    wx.getNetworkType({
      success(res) {
        networkType = res.networkType;
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        console.log(typeof networkType);
        console.log(networkType);
        if (networkType == "none") {
          that.setData({ hidetop: false });
        } else {
          that.setData({ hidetop: true });
        }
      },
      fail(res) {
        console.log("request fail");
      }
    });
  },
  /*
  onReachBottom: function() {
    this.setData({
      hideBottom: false
    });
    setTimeout(this.loadMore, 500);
  },
  */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var content = [];
    for (let i = 0; i < 20; i++) {
      var title = "外卖" + i;
      var name = "老张" + i;
      var pho = "15106058800";
      pho = this.mask(pho);
      content.push({
        id: 'task' + i,
        task_title: title,
        user_name: name,
        phone: pho
      });
    }
    this.setData({
      contentlist: content
    });
    var date = new Date();
    this.setData({
      refreshTime: date.toLocaleTimeString()
    });
    console.log(date.toLocaleTimeString());
  },

  loadMore: function() {
    var that = this;
    var content = that.data.contentlist;
    for (let i = 0; i < 3; i++) {
      var title = "外卖" + that.data.count;
      var name = "老张" + that.data.count;
      var pho = "15106058800";
      that.data.count++;
      content.push({
        id: 'task' + i,
        task_title: title,
        user_name: name,
        phone: pho
      });
    }
    that.setData({
      contentlist: content
    });
    this.setData({
      hideBottom: true
    });
    console.log(this.data.contentlist);
  },

  refresh: function(e) {

  },

  getData: function() {
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