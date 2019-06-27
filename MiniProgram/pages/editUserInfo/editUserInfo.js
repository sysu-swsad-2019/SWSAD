// pages/editUserInfo/editUserInfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // {"money":null,"phone":null,"university":null,"sex":"0","grade":null,"credit":null,"email":null,"iconpath":null,"academy":null,"username":"q"}
    hiddenmodalInput: true,
    input:'',
    input_text:'',
    index:0,
    selection_list:[
      {
        title:'头像',
        img_url:'../../images/avatar.png',
        tap:'iconTap'
      },
      {
        title:'昵称',
        text:'a',
        tap:'nicknameTap'
      },
      {
        title:'性别',
        text:'男',
        tap:'sexTap'
      },
      {
        title: '邮箱',
        text: 'xxxxx',
        tap:'emailTap'
      },
      {
        title:'电话',
        text:'xxxxx',
        tap:'phoneTap'
      },
      {
        title: '大学',
        text: 'xxxxx',
        tap:'universityTap'
      },
      {
        title: '学院',
        text: 'xxxxx',
        tap:'academyTap'
      },
      {
        title: '年级',
        text: 'xxxxx',
        tap: 'gradeTap'
      }
    ]
  },

  nicknameTap: function(){

    this.setData({
      input: '',
      hiddenmodalInput: false,
      input_text: '请输入昵称',
      index: 1
    })

  },

  emailTap: function(){
    this.setData({
      input: '',
      hiddenmodalInput: false,
      input_text: '请输入邮箱地址',
      index: 3
    })
  },

  phoneTap: function () {
    this.setData({
      input: '',
      hiddenmodalInput: false,
      input_text: '请输入电话',
      index: 4
    })
  },

  universityTap: function () {
    this.setData({
      input:'',
      hiddenmodalInput: false,
      input_text: '请输入大学名',
      index: 5
    })
  },

  academyTap: function () {
    this.setData({
      input: '',
      hiddenmodalInput: false,
      input_text: '请输入学院名',
      index: 6
    })
  },

  confirm:function(){
    var that = this
    console.log('confirm')
    console.log(this.data.input)
    if(this.data.input!=''){
      if (this.data.index == 1) {
        wx.request({
          url: "http://172.26.17.164:8080/userinfo/setUserInfo",
          header: {
            "content-type": "application/json",
            'cookie': wx.getStorageSync('cookieKey')
          },
          method: "POST",
          data: {
            nickname: that.data.input
          },
          complete: function (res) {
            if (res.data.code == 200) {
              app.globalData.userInfo.moreInfo.nickname = that.data.input
              that.setListData()
              wx.showToast({
                title: '修改成功',
                icon: 'none'
              })
            }
            else{
              wx.showToast({
                title: '修改失败',
                icon: 'none'
              })
            }
            that.setData({
              hiddenmodalInput: true,
            })
          }
        })
      }else
      if (this.data.index == 3) {
        wx.request({
          url: "http://172.26.17.164:8080/userinfo/setUserInfo",
          header: {
            "content-type": "application/json",
            'cookie': wx.getStorageSync('cookieKey')
          },
          method: "POST",
          data: {
            email: that.data.input
          },
          complete: function (res) {
            if (res.data.code == 200) {
              app.globalData.userInfo.moreInfo.email = that.data.input
              that.setListData()
              wx.showToast({
                title: '修改成功',
                icon: 'none'
              })
            }
            else {
              wx.showToast({
                title: '修改失败',
                icon: 'none'
              })
            }
            that.setData({
              hiddenmodalInput: true,
            })
          }
        })
      }else
      if (this.data.index == 4) {
        wx.request({
          url: "http://172.26.17.164:8080/userinfo/setUserInfo",
          header: {
            "content-type": "application/json",
            'cookie': wx.getStorageSync('cookieKey')
          },
          method: "POST",
          data: {
            phone: that.data.input
          },
          complete: function (res) {
            if (res.data.code == 200) {
              app.globalData.userInfo.moreInfo.phone = that.data.input
              that.setListData()
              wx.showToast({
                title: '修改成功',
                icon: 'none'
              })
            }
            else {
              wx.showToast({
                title: '修改失败',
                icon: 'none'
              })
            }
            that.setData({
              hiddenmodalInput: true,
            })
          }
        })
      }else
      if (this.data.index == 5) {
        wx.request({
          url: "http://172.26.17.164:8080/userinfo/setUserInfo",
          header: {
            "content-type": "application/json",
            'cookie': wx.getStorageSync('cookieKey')
          },
          method: "POST",
          data: {
            university: that.data.input
          },
          complete: function (res) {
            if (res.data.code == 200) {
              app.globalData.userInfo.moreInfo.university = that.data.input
              that.setListData()
              wx.showToast({
                title: '修改成功',
                icon: 'none'
              })
            }
            else {
              wx.showToast({
                title: '修改失败',
                icon: 'none'
              })
            }
            that.setData({
              hiddenmodalInput: true,
            })
          }
        })
      }else
      if (this.data.index == 6) {
        wx.request({
          url: "http://172.26.17.164:8080/userinfo/setUserInfo",
          header: {
            "content-type": "application/json",
            'cookie': wx.getStorageSync('cookieKey')
          },
          method: "POST",
          data: {
            academy: that.data.input
          },
          complete: function (res) {
            if (res.data.code == 200) {
              app.globalData.userInfo.moreInfo.academy = that.data.input
              
              that.setListData()
              wx.showToast({
                title: '修改成功',
                icon: 'none'
              })
            }
            else {
              console.log(that.data.input)
              wx.showToast({
                title: '修改失败',
                icon: 'none'
              })
            }
            that.setData({
              hiddenmodalInput: true,
            })
          }
        })
      }
    }
 
  },

  cancel:function(){
    console.log('cancel')
    this.setData({
      hiddenmodalInput: true,
    })
  },

  inputChange:function(e){
    this.setData({
      input: e.detail.value
    })
  },

  setListData:function(){
    var user = app.globalData.userInfo.moreInfo
    var grade
    if (user.grade == '-1') {
      grade = '未填'
    } else
      if (user.grade == '1') {
        grade = '大一'
      } else
        if (user.grade == '2') {
          grade = '大二'
        } else
          if (user.grade == '3') {
            grade = '大三'
          } else
            if (user.grade == '4') {
              grade = '大四'
            } else
              if (user.grade == '5') {
                grade = '研一'
              } else
                if (user.grade == '6') {
                  grade = '研二'
                }

    this.setData({
      selection_list: [
        {
          title: '头像',
          img_url: user.iconpath == null ? '../../images/avatar.png' : user.iconpath,
          tap: 'iconTap'
        },
        {
          title: '昵称',
          text: user.nickname,
          tap: 'nicknameTap'
        },
        {
          title: '性别',
          text: user.sex == '0' ? '女' : '男',
          tap: 'sexTap'
        },
        {
          title: '邮箱',
          text: user.email == null ? '未填' : user.email,
          tap: 'emailTap'
        },
        {
          title: '电话',
          text: user.phone == null ? '未填' : user.phone,
          tap: 'phoneTap'
        },
        {
          title: '大学',
          text: user.university == null ? '未填' : user.university,
          tap: 'universityTap'
        },
        {
          title: '学院',
          text: user.academy == null ? '未填' : user.academy,
          tap: 'academyTap'
        },
        {
          title: '年级',
          text: grade,
          tap: 'gradeTap'
        }
      ]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setListData()
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