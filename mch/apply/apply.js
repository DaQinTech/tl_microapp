var t = require("../../api.js"),
    a = require("../../area-picker/area-picker.js"),
    e = getApp();
Page({
    data: {
      show_result:false
    },
    onLoad: function(i) {
        e.pageOnLoad(this);
        var n = this;
        n.getDistrictData(function(t) {
            a.init({
                page: n,
                data: t
            })
        }), wx.showLoading({
            title: "正在加载",
            mask: !0
        }), e.request({
            url: t.mch.apply,
            success: function(t) {
                wx.hideLoading(), 0 == t.code && (t.data.apply && (t.data.show_result = false), n.setData(t.data))
            }
        })
    },
    getDistrictData: function(a) {
        var i = wx.getStorageSync("district");
        if (!i) return wx.showLoading({
            title: "正在加载",
            mask: !0
        }), void e.request({
            url: t.
            default.district,
            success: function(t) {
                wx.hideLoading(), 0 == t.code && (i = t.data, wx.setStorageSync("district", i), a(i))
            }
        });
        a(i)
    },
    onAreaPickerConfirm: function(t) {
        this.setData({
            edit_district: {
                province: {
                    id: t[0].id,
                    name: t[0].name
                },
                city: {
                    id: t[1].id,
                    name: t[1].name
                },
                district: {
                    id: t[2].id,
                    name: t[2].name
                }
            }
        })
    },
    onReady: function() {
        e.pageOnReady(this)
    },
    onShow: function() {
        e.pageOnShow(this)
    },
    onHide: function() {
        e.pageOnHide(this)
    },
    onUnload: function() {
        e.pageOnUnload(this)
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    mchCommonCatChange: function(t) {
        this.setData({
            mch_common_cat_index: t.detail.value
        })
    },
    applySubmit: function(a) {
        console.log(a);
        var i = this;
        wx.showLoading({
            title: "正在提交",
            mask: !0
        }), e.request({
            url: t.mch.apply_submit,
            method: "post",
            data: {
                realname: a.detail.value.realname,
                tel: a.detail.value.tel,
                name: a.detail.value.name,
                province_id: a.detail.value.province_id,
                city_id: a.detail.value.city_id,
                district_id: a.detail.value.district_id,
                address: a.detail.value.address,
                mch_common_cat_id: i.data.mch_common_cat_index ? i.data.mch_common_cat_list[i.data.mch_common_cat_index].id : i.data.apply && i.data.apply.mch_common_cat_id ? i.data.apply.mch_common_cat_id : "",
                service_tel: a.detail.value.service_tel,
                form_id: a.detail.formId
            },
            success: function(t) {
                wx.hideLoading(), 0 == t.code && wx.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.redirectTo({
                            url: "/mch/apply/apply"
                        })
                    }
                }), 1 == t.code && i.showToast({
                    title: t.msg
                })
            }
        })
    },
    hideApplyResult: function() {
        this.setData({
            show_result: false
        })
    },
    showApplyResult: function() {
        this.setData({
            show_result: true
        })
    }
});