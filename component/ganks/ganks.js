// component/ganks/ganks.js

var Api = require('../../network/api.js')
var dateFormat = require('../../utils/dateformat.js')

Component({
  page: 1,

  /**
   * 组件的属性列表
   */
  properties: {
    gankType: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    ganks: [],
    loadingHidden: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    fetchData: function(clear) {
      this.page = clear ? 1 : ++this.page
      Api.fetchData(this.data.gankType, this.page, {
        success: res => {

          res = res.map(result => {
            // 如果是文章类型的 清除了源代码
            if (result["data_type"] == 1) {
              result["eg_url"] = ""
            }
            return result
          })


          var items = clear ? res : this.data.ganks.concat(res)

          this.setData({
            ganks: items,
            loadingHidden: items.length < Api.PAGE_SIZE
          })
        },
        complete: () => {
          if (clear) {
            setTimeout(() => {
              wx.stopPullDownRefresh()
            }, 1000)
          }
        }
      })
    },

    onItemClick: function(event) {
      var dataset = event.currentTarget.dataset
      var url = ""
      if (dataset.type == 1) {
        url = dataset.link_url
        wx.navigateTo({
          url: '../linkDetails/details?title=' + dataset.title + '&url=' + url
        })

      } else {
        url = dataset.url
        wx.navigateTo({
          url: '../details/details?title=' + dataset.title + '&url=' + url
        })
      }

    }
  }
})