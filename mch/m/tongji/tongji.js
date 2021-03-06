var t = require("../../../api.js"),
    a = getApp();
Page({
    data: {
        current_year: "",
        current_month: "",
        month_scroll_x: 1e5,
        year_list: [],
        daily_avg: "-",
        month_count: "-",
        up_rate: "-"
    },
    onLoad: function(e) {
        a.pageOnLoad(this);
        var n = this;
        wx.showNavigationBarLoading(), a.request({
            url: t.mch.user.tongji_year_list,
            success: function(t) {
                n.setData({
                    year_list: t.data.year_list,
                    current_year: t.data.current_year,
                    current_month: t.data.current_month
                }), n.setMonthScroll(), n.getMonthData()
            },
            complete: function() {
                wx.hideNavigationBarLoading()
            }
        })
    },
    onReady: function() {
        a.pageOnReady(this)
    },
    onShow: function() {
        a.pageOnShow(this)
    },
    onHide: function() {
        a.pageOnHide(this)
    },
    onUnload: function() {
        a.pageOnUnload(this)
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    changeMonth: function(t) {
        var a = this,
            e = t.currentTarget.dataset.yearIndex,
            n = t.currentTarget.dataset.monthIndex;
        for (var r in a.data.year_list) {
            r == e ? (a.data.year_list[r].active = !0, a.data.current_year = a.data.year_list[r].year) : a.data.year_list[r].active = !1;
            for (var o in a.data.year_list[r].month_list) r == e && o == n ? (a.data.year_list[r].month_list[o].active = !0, a.data.current_month = a.data.year_list[r].month_list[o].month) : a.data.year_list[r].month_list[o].active = !1
        }
        a.setData({
            year_list: a.data.year_list,
            current_year: a.data.current_year
        }), a.setMonthScroll(), a.getMonthData()
    },
    setMonthScroll: function() {
        var t = this,
            a = wx.getSystemInfoSync().screenWidth / 5,
            e = 0;
        for (var n in t.data.year_list) {
            var r = !1;
            for (var o in t.data.year_list[n].month_list) {
                if (t.data.year_list[n].month_list[o].active) {
                    r = !0;
                    break
                }
                e++
            }
            if (r) break
        }
        t.setData({
            month_scroll_x: (e - 0) * a
        })
    },
    setCurrentYear: function() {
        var t = this;
        for (var a in t.data.year_list) if (t.data.year_list[a].active) {
            t.data.current_year = t.data.year_list[a].year;
            break
        }
        t.setData({
            current_year: t.data.current_year
        })
    },
    getMonthData: function() {
        var e = this;
        wx.showNavigationBarLoading(), e.setData({
            daily_avg: "-",
            month_count: "-",
            up_rate: "-"
        }), a.request({
            url: t.mch.user.tongji_month_data,
            data: {
                year: e.data.current_year,
                month: e.data.current_month
            },
            success: function(t) {
                0 == t.code ? e.setData({
                    daily_avg: t.data.daily_avg,
                    month_count: t.data.month_count,
                    up_rate: t.data.up_rate
                }) : wx.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1
                })
            },
            complete: function() {
                wx.hideNavigationBarLoading()
            }
        })
    }
});