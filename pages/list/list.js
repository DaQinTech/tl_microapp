var t = require("../../api.js"), a = getApp(), e = !1, i = !1;

Page({
    data: {
        cat_id: "",
        page: 1,
        cat_list: [],
        goods_list: [],
        sort: 0,
        sort_type: -1,
        // tab切换  
        currentTab: 0,
    },
    onLoad: function(t) {
        a.pageOnLoad(this), this.loadData(t);
        this.setData({
          cat_id: t.cat_id
        })
    },
    loadData: function(t) {
        var a = this, e = wx.getStorageSync("cat_list"), i = "";
        if (t.cat_id) for (var s in e) {
            var o = !1;
            e[s].id == t.cat_id && (e[s].checked = !0, e[s].list.length > 0 && (i = "height-bar"));
            for (var d in e[s].list) e[s].list[d].id == t.cat_id && (e[s].list[d].checked = !0, 
            o = !0, i = "height-bar");
            o && (e[s].checked = !0);
        }
        if (t.goods_id) var r = t.goods_id;
        a.setData({
            cat_list: e,
            cat_id: t.cat_id || "",
            height_bar: i,
            goods_id: r || ""
        }), a.reloadGoodsList();
    },
    catClick: function(t) {
        var a = this, e = "", i = t.currentTarget.dataset.index, s = a.data.cat_list;
        for (var o in s) {
            for (var d in s[o].list) s[o].list[d].checked = !1;
            o == i ? (s[o].checked = !0, e = s[o].id) : s[o].checked = !1;
        }
        var r = "";
        s[i].list.length > 0 && (r = "height-bar"), a.setData({
            cat_list: s,
            cat_id: e,
            height_bar: r
        }), a.reloadGoodsList();
    },
    subCatClick: function(t) {
        var a = this, e = "", i = t.currentTarget.dataset.index, s = t.currentTarget.dataset.parentIndex, o = a.data.cat_list;
        for (var d in o) for (var r in o[d].list) d == s && r == i ? (o[d].list[r].checked = !0, 
        e = o[d].list[r].id) : o[d].list[r].checked = !1;
        a.setData({
            cat_list: o,
            cat_id: e
        }), a.reloadGoodsList();
    },
    allClick: function() {
        var t = this, a = t.data.cat_list;
        for (var e in a) {
            for (var i in a[e].list) a[e].list[i].checked = !1;
            a[e].checked = !1;
        }
        t.setData({
            cat_list: a,
            cat_id: "",
            height_bar: ""
        }), t.reloadGoodsList();
    },
    reloadGoodsList: function() {
        var e = this;
        i = !1, e.setData({
            page: 1,
            goods_list: [],
            show_no_data_tip: !1
        });
        var s = e.data.cat_id || "", o = e.data.page || 1;
        a.request({
            url: t.default.goods_list,
            data: {
                cat_id: s,
                page: o,
                sort: e.data.sort,
                sort_type: e.data.sort_type,
                goods_id: e.data.goods_id
            },
            success: function(t) {
              for (var i = 0; i < t.data.list.length; i++) {
                t.data.list[i].integral = JSON.parse(t.data.list[i].integral);
              }
                0 == t.code && (0 == t.data.list.length && (i = !0), e.setData({
                    page: o + 1
                }), e.setData({
                    goods_list: t.data.list,
                    integral: t.data.integral
                })), e.setData({
                    show_no_data_tip: 0 == e.data.goods_list.length
                });
            },
            complete: function() {}
        });
    },
    loadMoreGoodsList: function() {
        var s = this;
        if (!e) {
            s.setData({
                show_loading_bar: !0
            }), e = !0;
            var o = s.data.cat_id || "", d = s.data.page || 2, r = s.data.goods_id;
            a.request({
                url: t.default.goods_list,
                data: {
                    page: d,
                    cat_id: o,
                    sort: s.data.sort,
                    sort_type: s.data.sort_type,
                    goods_id: r
                },
                success: function(t) {
                    0 == t.data.list.length && (i = !0);
                    var a = s.data.goods_list.concat(t.data.list);
                    s.setData({
                        goods_list: a,
                        page: d + 1
                    });
                },
                complete: function() {
                    e = !1, s.setData({
                        show_loading_bar: !1
                    });
                }
            });
        }
    },
    onReachBottom: function() {
        var t = this;
        i || t.loadMoreGoodsList();
    },
    onShow: function(t) {
        a.pageOnShow(this);
        var e = this;
        if (wx.getStorageSync("list_page_reload")) {
            var i = wx.getStorageSync("list_page_options");
            wx.removeStorageSync("list_page_options"), wx.removeStorageSync("list_page_reload");
            var s = i.cat_id || "";
            e.setData({
                cat_id: s
            });
            var o = e.data.cat_list;
            for (var d in o) {
                var r = !1;
                for (var c in o[d].list) o[d].list[c].id == s ? (o[d].list[c].checked = !0, r = !0) : o[d].list[c].checked = !1;
                r || s == o[d].id ? (o[d].checked = !0, o[d].list && o[d].list.length > 0 && e.setData({
                    height_bar: "height-bar"
                })) : o[d].checked = !1;
            }
            e.setData({
                cat_list: o
            }), e.reloadGoodsList();
        }
    },
    sortClick: function(t) {
        var a = this, e = t.currentTarget.dataset.sort, i = void 0 == t.currentTarget.dataset.default_sort_type ? -1 : t.currentTarget.dataset.default_sort_type, s = a.data.sort_type;
        if (a.data.sort == e) {
            if (-1 == i) return;
            s = -1 == a.data.sort_type ? i : 0 == s ? 1 : 0;
        } else s = i;
        a.setData({
            sort: e,
            sort_type: s
        }), a.reloadGoodsList();
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    /** 
 * 点击tab切换 
 */
    swichNav: function (e) {
      var that = this;
      if (this.data.currentTab === e.target.dataset.current) {
        return false;
      } else {
        that.setData({
          currentTab: e.target.dataset.current
        })
      }
    },
    integral: function () {
      wx.navigateTo({
        url: '/pages/integral/integral'
      })
    }
});