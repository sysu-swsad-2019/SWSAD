Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskInfo: [
      {
        title: "../../images/footer-icon-04.png",
        content: "发布者："
      },

      {
      title: '../../images/ios-shijian.png',
      content: '结束时间：',
    }, {
      title: '../../images/bianhao.png',
      content: '发布数量：',
    }, {
      title: '../../images/type.png',
      content: '任务类型：',
    }, {
      title: '../../images/gender.png',
      content: '性别要求：'
    }, {
      title: '../../images/647.png',
      content: '年级要求：'
    }, {
      title: '../../images/credit.png',
      content: '信誉要求：'
    }, {
      title: '../../images/group.png',
      content: '兴趣小组：'
    }],
    contents: {
      uerInfo: {},

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'test.php', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
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