Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasklist: [{
        tid: 1,
        name: '帮忙取个快递哈哈哈哈哈',
        coin: 50,
        people: 100,
        type: 0,
        pic_url: '../../images/快递.png', //两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 0,
        state_url: '../../images/yellow_circle.png',
        state_text: '正在进行',
        description: '蜂巢5号柜，取件码11111，送到xxx谢谢！！',
      },
      {
        tid: 2,
        name: '帮忙买个麦当劳',
        coin: 60,
        people: 200,
        type: 1,
        pic_url: '../../images/外卖.png', //两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 2,
        state_url: '../../images/gray_circle.png',
        state_text: '尚未开始',
        description: '买个xxx套餐送到xxx谢谢！',
      },
      {
        tid: 3,
        name: '帮忙找下资料',
        coin: 70,
        people: 300,
        type: 2,
        pic_url: '../../images/资料.png', //两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 1,
        state_url: '../../images/green_circle.png',
        state_text: '已完成',
        description: '各位帮忙找下微信小程序的学习视频！！！挺急的，感谢！！',
      },
      {
        tid: 4,
        name: '帮忙填个问卷',
        coin: 80,
        people: 400,
        type: 3,
        pic_url: '../../images/问卷.png', //两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 0,
        state_url: '../../images/yellow_circle.png',
        state_text: '正在进行',
        description: '链接在此：http://xxxxxxx.com',
      },
      {
        tid: 5,
        name: '简历征集',
        coin: 90,
        people: 100,
        type: 4,
        pic_url: '../../images/投简历.png', //两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 3,
        state_url: '../../images/red_circle.png',
        state_text: '超过时限',
        description: '现收集应届毕业生简历50份，模板见http://xxxxxxx.com',
      },
      {
        tid: 6,
        name: '组队跑步去~',
        people: 10,
        coin: 20,
        type: 5,
        pic_url: '../../images/组队请求.png', //两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 0,
        state_url: '../../images/yellow_circle.png',
        state_text: '正在进行',
        description: '找个人一块跑步挣章啦！！',
      },
      {
        tid: 7,
        name: '我是充数的changwenceshichangwenceshichangwenceshi',
        coin: 100,
        people: 1,
        type: 6,
        pic_url: '../../images/其他.png', //两个url在请求时分别根据type和state获得，type对应见文档，state：0：yellow，1：green，2：gray，3：red
        state: 0,
        state_url: '../../images/yellow_circle.png',
        state_text: '正在进行',
        description: '不知道写啥就谢谢在座的各位吧',
      }
    ],

    colors: ["yellow", "green", "grey", "red"],
    coin_url: "../../images/money_icon.png",
    people_url: "../../images/用户.png",
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
          that.setData({
            hidetop: false
          });
        } else {
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