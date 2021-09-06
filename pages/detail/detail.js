const Api = require('../../utils/api.js')
const utils = require('../../utils/util.js')
Page({
  data: {
    title: '话题详情',
    detail: {},
    hidden: false
  },
  onLoad (options) {
    const id = options.id
    this.fetchData(id)
  },
  fetchData: function (id, data) {
    if (!id) return
    if (!data) data = {}
    const that = this
    wx.request({
      url: Api.getTopicByID(id, data),
      success: function (res) {
        that.setData({
          detail: res.data.data
        })
        setTimeout(function () {
          that.setData({
            hidden: true
          })
          const formateTime = utils.formatTime(that.data.detail.create_at)
          that.setData({
            'detail.create_at': formateTime
          })
          const replies = that.data.detail.replies
          for (let i = 0; i < replies.length; i++) {
            const time = 'detail.replies[' + i + '].create_at'
            const formateTime = utils.formatTime(replies[i].create_at)
            that.setData({
              [time]: formateTime
            })
          }
        })
      }
    })
  }
})
