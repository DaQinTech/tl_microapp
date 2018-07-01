var t = require("../../api.js"), a = getApp(), e = !1, i = !1;
var utils = require("../../utils/utils.js");

Page({
  data: {
    cat_id: "",
    page: 1,
    cat_list: [],
    goods_list: [],
    sort: 0,
    sort_type: -1
  },
  onLoad: function (t) {


    t.cat_id = -1;
    a.pageOnLoad(this), this.loadData(t.status || -1);
  },
  loadData: function (s) {
    void 0 == s && (s = -1);
    var o = this;
    a.request({
      url: t.user.integral_log,
      data: {
        status: o.data.status
      },
      success: function (t) {
        for (var i = 0; i < t.data.list.length; i++) {
          var thisaddtime = t.data.list[i].addtime;
          t.data.list[i].addtime = utils.formatTimemy(thisaddtime, 'Y/M/D h:m:s');
        }
        0 == t.code && (o.setData({
          integral_list: t.data.list
        }))
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },

  reloadGoodsList: function () {
  },
  loadMoreGoodsList: function () {
  },
  onReachBottom: function () {
    var t = this;
    i || t.loadMoreGoodsList();
  },
  onShow: function (t) { },
  onReady: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { }
});