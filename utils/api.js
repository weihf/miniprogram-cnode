const HOST_URI = 'https://cnodejs.org/api/v1'

const GET_TOPICS = '/topics'
const GET_TOPIC_BY_ID = '/topic/'

function obj2uri (obj) {
  return Object.keys(obj).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
  }).join('&')
}

module.exports = {
  // 获取列表数据
  getTopics: function (obj) {
    return HOST_URI + GET_TOPICS + '?' + obj2uri(obj)
  },
  // 获取内容页数据
  getTopicByID: function (id, obj) {
    return HOST_URI + GET_TOPIC_BY_ID + id + '?' + obj2uri(obj)
  }
}
