var o = require("../../../api.js"), n = getApp();

Page({
    data: {},
    onLoad: function(o) {
        n.pageOnLoad(this), this.loadData(o);
    },
    loadData: function(t) {
        var a = this;
        wx.showLoading({
            title: "正在加载"
        }), n.request({
            url: o.group.order.express_detail,
            data: {
                order_id: t.id
            },
            success: function(o) {
                wx.hideLoading(), 0 == o.code && a.setData({
                    data: o.data
                }), 1 == o.code && wx.showModal({
                    title: "提示",
                    content: o.msg,
                    showCancel: !1,
                    success: function(o) {
                        o.confirm && wx.navigateBack();
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});