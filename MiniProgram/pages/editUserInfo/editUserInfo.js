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
    selection_list:[
      {
        title:'头像',
        img_url:'../../images/avatar.png',
        tap:'iconTap'
      },
      {
        title:'用户名',
        text:'a',
        tap:'usernameTap'
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

  usernameTap: function(){
    hiddenmodalInput:false

  },

  inputChange:function(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = app.globalData.userInfo.moreInfo
    var grade
    if (user.grade == '-1'){
      grade = '未填'
    }else 
    if(user.grade == '1'){
      grade = '大一'
    } else
    if (user.grade == '2') {
      grade = '大二'
    } else
    if (user.grade == '3') {
      grade = '大三'
    }else
    if(user.grade == '4'){
      grade = '大四'
    }else
    if(user.grade == '5'){
      grade = '研一'
    }else
    if(user.grade == '6'){
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
          title: '用户名',
          text: user.username,
          tap: 'usernameTap'
        },
        {
          title: '性别',
          text: user.sex=='0'?'女':'男',
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