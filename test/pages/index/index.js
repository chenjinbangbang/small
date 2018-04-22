//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList: [
      {
        img: '/images/yun5.jpg',
        title: '平安贷款',
        shortDesc: '22周岁以上即可'
      },
      {
        img: '/images/yun5.jpg',
        title: '支付宝',
        shortDesc: '不看工作，不看流水'
      },
      {
        img: '/images/yun5.jpg',
        title: '网商贷',
        shortDesc: '18周岁以上即可'
      }
    ]
    //proList: null,
  },
  onLoad: function () {
    //console.log(app.globalData.host);
    app.globalData.host = 'test'; //可set
    //console.log(app.globalData.host);
    app.globalData.host = 'test';

    this.setData({ //改变data的数据
      test: '01',
    })
    //this.getProList()
  },
  //绑定事件
  toDetail(e) {
    console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    let proList = this.data.proList;
    let title = proList[index].title;
    // wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面
    //   url: '/pages/detail/detail?title='+title, //使用url传值
    // });

    wx.setStorage({ //使用setStorage传值
      key: 'title',
      data: title,
    })
    wx.navigateTo({
      url: '/pages/detail/detail',
    });

  },
  getProList() {
    wx.request({
      url: 'http://localhost:3100/api/users/code',
      method: 'get',
      success(res) {
        console.log(res);
        self.setData({
          proList: res.data
        });
      }
    });
  },
  copy() {
    if (wx.setClipboardData) {
      wx.setClipboardData({
        data: '这是我要复制的内容',
        success(res) {
          wx.showModal({
            title: '复制成功',
            content: '内容已经复制成功！',
            success(res) {
              if (res.confirm) {
                wx.getClipboardData({
                  success(res) {
                    console.log(res.data);
                  }
                })
              }
            }
          });
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '您的微信版本太低，请升级',
      });
    }

  }
})
