Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents: [{
        title: "学生爱好调查",
        id: 122345,
        status: "已发布",
        date: 0,
        answers: 0
      },
      {
        title: "学生爱好调查",
        id: 122345,
        status: "草稿",
        date: 0,
        answers: 0
      }
    ],
    id: 100
  },

  editfunc: function() {
    wx.showLoading({
      title: '加载中',
    });

    setTimeout(function () {
      wx.hideLoading()
    }, 2000);
  },

  deletefunc: function(event) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '删除当前问卷',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          var itemlist = that.data.contents;
          var index = itemlist.findIndex(function(s) {
            return s.id == event.target.dataset.index;
          });
          console.log(index);
          itemlist.splice(index, 1);
          that.setData({
            contents: itemlist
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  },

  addfunc: function() {
    var itemlist = this.data.contents;
    var time = new Date();
    var timestr = (time.getMonth() + 1) + "月" + time.getDate() + "日 " + time.getHours() + ":" + time.getMinutes();
    var content = {
      title: "外卖口味调查",
      id: 122345,
      status: "草稿",
      date: 0,
      answers: 0
    };
    content.date = timestr;
    content.id = this.data.id;
    content.title = content.title + content.id;
    this.setData({
      id: this.data.id + 1
    });
    itemlist.push(content);
    this.setData({
      contents: itemlist
    });
  },

  switch: function() {
    wx.navigateTo({
      url: '../detail/detail'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var time = new Date();
    var timestr = (time.getMonth() + 1) + "月" + time.getDate() + "日 " + time.getHours() + ":" + time.getMinutes();
    var content = {
      title: "学生",
      id: 122345,
      status: "草稿",
      date: 0,
      answers: 0
    };
    content.date = timestr;
    content.id = this.data.id;
    console.log(content.id);
    this.setData({
      id: this.data.id + 1
    });
    var itemlist = [];
    itemlist.push(content);
    this.setData({
      contents: itemlist
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})