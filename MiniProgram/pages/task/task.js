Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrls:[
      '../../images/slider3.jpg',
      '../../images/slider1.jpg',
      '../../images/slider4.jpg',
      '../../images/slider2.jpg',
    ],
    colors: ["yellow", "green", "grey", "red"],
    pic_urls: ["../../images/general.png",'../../images/快递.png', '../../images/外卖.png', '../../images/资料.png', '../../images/问卷.png', '../../images/投简历.png', '../../images/组队请求.png', '../../images/其他.png'],
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

  create_tap:function(){
    if (getApp().globalData.userInfo.isLogin) {
      wx.navigateTo({
        url: '../release/release',
      })
    }
    else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        url: getApp().globalData.server + 'task/getAllTask', //仅为示例，并非真实的接口地址
        header: {
          'content-type': "application/x-www-form-urlencoded", // 默认值
        },
        success(res) {
          //console.log(res.data);
          contents = res.data.data.list;
          //console.log(contents.length);
          //console.log(contents[2]);
          that.setData({ contentlist: contents });
          var size = contents.length;
          if (size < 10)
            current = contents.slice(0, size);
          else
            current = contents.slice(0,10)
          that.setData({currentlist: current});
          that.setData({first: false});
          that.setData({currentPage: current.length});
        }
      });
  },

  tapfunc: function (e) {
    var taskid = e.target.dataset.tid;
    var number = e.target.dataset.num;
    var userInfo = wx.getStorageSync('userInfo');
    //console.log(getApp().globalData.userInfo.isLogin);
    if (getApp().globalData.userInfo.isLogin == true) {
      wx.request({
        url: getApp().globalData.server + 'task/findAllUserInTask', //仅为示例，并非真实的接口地址
        data: {
          taskId: taskid
        },
        header: {
          'content-type': "application/x-www-form-urlencoded", // 默认值
          'cookie': wx.getStorageSync('cookieKey')
        },
        success(res) {
          //console.log(res.data.data.list);
          var userlist = res.data.data.list;
          
          var curnumber = res.data.data.list.length;
            if (curnumber <= number) {
              let isExist = false;
              for (let i = 0; i < userlist.length; i++) {
                if (userlist[i].username == userInfo.username)
                  isExist = true;
              }
              if (isExist == true) {
                wx.showModal({
                  title: '提示',
                  content: '已领取任务',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                });
              } else {
                wx.navigateTo({
                  url: '../detail/detail?tid=' + taskid
                });
              }
            } else {
              wx.showModal({
                title: '提示',
                content: '任务人数已满',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              });
            }
        },
        fail(err) {
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登陆',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            wx.navigateTo({
              url: '../loginPage/loginPage'
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    }
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
  
  onReachBottom: function() {
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
      //console.log(cur);
      //console.log(len);
      if (len - cur < 5) {
        current = current.concat(content.slice(cur, len));
        that.setData({currentPage: len, currentlist: current});
      } else {
        current = current.concat(content.slice(cur, cur+5));
        that.setData({ currentPage: cur+5, currentlist: current });
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