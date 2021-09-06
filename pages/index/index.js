const Api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({
  data: {
    title: '首页列表',
    postsList: [],
    hidden: true,
    page: 1,
    limit: 20,
    tab: 'all'
  },
  onLoad: function () {
    this.fetchData({
      tab: this.data.tab,
      page: 1,
      limit: this.data.limit
    })
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.fetchData({
      tab: this.data.tab,
      page: 1,
      limit: this.data.limit
    })
  },
  // 上拉分页
  onReachBottom: function () {
    const that = this
    this.fetchData({
      tab: that.data.tab,
      page: that.data.page,
      limit: that.data.limit
    })
  },
  fetchData: function (data) {
    // 处理参数
    if (!data) data = {}
    if (!data.page) data.page = 1
    const that = this
    that.setData({
      hidden: false
    })
    wx.request({
      url: Api.getTopics(data),
      method: 'get',
      success: function (res) {
        if (res.data.data.length === 0) {
          wx.showToast({
            title: '没有更多数据'
          })
        } else if (res.data.data.length > 0) {
          that.setData({
            postsList: [...that.data.postsList, ...res.data.data],
            page: that.data.page + 1
          })
        }
        setTimeout(function () {
          for (let i = 0; i < that.data.postsList.length; i++) {
            const time = 'postsList[' + i + '].last_reply_at'
            const formateTime = utils.formatTime(that.data.postsList[i].last_reply_at)
            that.setData({
              [time]: formateTime
            })
          }

          that.setData({
            hidden: true
          })
        }, 300)
      },
      fail (error) {
        console.log(error)
      }
    })
  },
  onTapTag (e) {
    const tab = e.target.id
    this.setData({
      postsList: [],
      tab: tab,
      page: 1,
      limit: this.data.limit
    })
    this.fetchData({
      tab: this.data.tab,
      page: 1,
      limit: this.data.limit
    })
  },
  tapDetail (e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  }
})
