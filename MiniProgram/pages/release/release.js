// pages/release/release.js
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleCount: 0, //标题字数
    contentCount: 0, //正文字数
    title: '', //标题内容
    content: '', //正文内容
    imgs: [],
    showError: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    _imgs.splice(idx,1);
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
  submit: function () {
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
          title = '【' + app._user.wx.nickName + '】' + _this.data.title;
          content = _this.data.content + '\r\n\r\n' + _this.data.content;
          if (_this.data.imgs.length) {
            _this.data.imgs.forEach(function (e) {
              imgs += '\r\n\r\n' + '![img](' + e + '?imageView2/2/w/750/interlace/0/q/88|watermark/2/text/V2Xph43pgq4=/font/5b6u6L2v6ZuF6buR/fontsize/500/fill/I0VGRUZFRg==/dissolve/100/gravity/SouthEast/dx/10/dy/10)';
            });
            content += imgs;
          }
          app.showLoadToast();
          wx.request({
            url: app._server + '/api/feedback.php',
            data: app.key({
              openid: app._user.openid,
              title: title,
              body: content
            }),
            method: 'POST',
            success: function (res) {
              if (res.data.status === 200) {
                var text = '反馈成功，您可通过访问 ' + res.data.data.html_url + ' 了解反馈动态';
                wx.showModal({
                  title: '反馈成功',
                  content: text,
                  showCancel: false,
                  success: function (res) {
                    wx.navigateBack();
                  }
                });
              } else {
                app.showErrorModal(res.data.message, '提交失败');
              }
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
})