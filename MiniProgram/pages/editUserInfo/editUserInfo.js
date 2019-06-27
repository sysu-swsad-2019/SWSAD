// pages/editUserInfo/editUserInfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // {"money":null,"phone":null,"university":null,"sex":"0","grade":null,"credit":null,"email":null,"iconpath":null,"academy":null,"username":"q"}
    hiddenmodal:true,
    hiddenmodalPicker:true,
    hiddenmodalInput: true,
    input:'',
    input_text:'',
    index:0,
    sexArr: [
      '女',
      '男'
    ],
    gradeArr: [
      '大一',
      '大二',
      '大三',
      '大四',
      '研一',
      '研二',
    ],
    grade:'',
    sex:'',
    sexIndex:-1,
    gradeIndex:-1,
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

  iconTap:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        upload(that, tempFilePaths);
      }
    })
  },

  bindChange:function(e){
    const val = e.detail.value;
    console.log(val)
    if(this.data.index == 2){
      this.setData({
        sex:this.data.sexArr[val[0]],
        sexIndex:val[0]
      })
      
    }
    else if(this.data.index == 7){
      this.setData({
        grade:this.data.gradeArr[val[0]],
        gradeIndex:val[0]+1
      })
    }
  },
  nicknameTap: function(){

    this.setData({
      input: '',
      hiddenmodalInput: false,
      hiddenmodal:false,
      input_text: '请输入昵称',
      index: 1
    })

  },

  emailTap: function(){
    this.setData({
      input: '',
      hiddenmodalInput: false,
      hiddenmodal: false,
      input_text: '请输入邮箱地址',
      index: 3
    })
  },

  phoneTap: function () {
    this.setData({
      input: '',
      hiddenmodalInput: false,
      hiddenmodal: false,
      input_text: '请输入电话',
      index: 4
    })
  },

  universityTap: function () {
    this.setData({
      input:'',
      hiddenmodalInput: false,
      hiddenmodal: false,
      input_text: '请输入大学名',
      index: 5
    })
  },

  academyTap: function () {
    this.setData({
      input: '',
      hiddenmodalInput: false,
      hiddenmodal: false,
      input_text: '请输入学院名',
      index: 6
    })
  },

  sexTap:function(){
    this.setData({
      hiddenmodalPicker: false,
      hiddenmodal: false,
      index: 2
    })
  },

  gradeTap: function () {
    this.setData({
      hiddenmodalPicker: false,
      hiddenmodal: false,
      index: 7
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
              hiddenmodal: true,
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
              hiddenmodal: true,
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
              hiddenmodal: true,
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
              hiddenmodal: true,
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
              hiddenmodal: true,
              hiddenmodalInput: true,
            })
          }
        })
      }
    }
    else{
      if(this.data.index==2){

        wx.request({
          url: "http://172.26.17.164:8080/userinfo/setUserInfo",
          header: {
            "content-type": "application/json",
            'cookie': wx.getStorageSync('cookieKey')
          },
          method: "POST",
          data: {
            sex: that.data.sexIndex
          },
          complete: function (res) {
            if (res.data.code == 200) {
              app.globalData.userInfo.moreInfo.sex = that.data.sexIndex
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
              hiddenmodal: true,
              hiddenmodalInput: true,
              hiddenmodalPicker: true,
            })
          }
          
        })
      }else 
      if(this.data.index==7){
        wx.request({
          url: "http://172.26.17.164:8080/userinfo/setUserInfo",
          header: {
            "content-type": "application/json",
            'cookie': wx.getStorageSync('cookieKey')
          },
          method: "POST",
          data: {
            grade: that.data.gradeIndex
          },
          complete: function (res) {
            if (res.data.code == 200) {
              app.globalData.userInfo.moreInfo.grade = that.data.gradeIndex
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
              hiddenmodal: true,
              hiddenmodalInput: true,
              hiddenmodalPicker: true,
            })
          }

        })
      }
    }
  },

  cancel:function(){
    console.log('cancel')
    this.setData({
      hiddenmodal: true,
      hiddenmodalInput: true,
      hiddenmodalPicker:true,
    })
  },

  inputChange:function(e){
    this.setData({
      input: e.detail.value
    })
  },

  setListData:function(){
    let user = app.globalData.userInfo.moreInfo
    if (user.grade == '-1') {
      this.setData({
        grade : '未填'
      })
      
    } else
      if (user.grade == '1') {
        this.setData({
          grade : '大一'
        })
      } else
        if (user.grade == '2') {
          this.setData({
            grade : '大二'
          })
        } else
          if (user.grade == '3') {
            this.setData({
              grade : '大三'
            })
          } else
            if (user.grade == '4') {
              this.setData({
                grade : '大四'
              })
            } else
              if (user.grade == '5') {
                this.setData({
                  grade : '研一'
                })
              } else
                if (user.grade == '6') {
                  this.setData({
                    grade : '研二'
                  })
                }
    if(user.sex == '0'){
      this.setData({
        sex:'女'
      })
    }else 
    if (user.sex == '1'){
      this.setData({
        sex:'男'
      })
    }else if(user.sex=='-1'){
      this.setData({
        sex: '未填'
      })
    }
    console.log(user.iconpath)
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
          text: this.data.sex,
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
          text: this.data.grade,
          tap: 'gradeTap'
        }
      ],
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

function upload(page, path) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),
    wx.uploadFile({
      url: "http://172.26.17.164:8080/userinfo/setUserIcon",
      filePath: path[0],
      name: 'file',
      header: { 
        "Content-Type": "multipart/form-data;charset=utf-8" ,
        'cookie': wx.getStorageSync('cookieKey')
      },
      complete: function (res) {
        
        var data = JSON.parse(res.data);
        console.log(data)
        if(res.statusCode == 200){
          app.globalData.userInfo.moreInfo.iconpath = "http://172.26.17.164:8080/"+data.data.iconURL
          page.setListData()
          console.log(app.globalData.userInfo.moreInfo.iconpath)
          wx.showToast({
            title:'修改成功',
            icon:'none'
          })
        }
        else{
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
        }
      }
    })
}