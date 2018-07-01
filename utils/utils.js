function t(t) {
  return (t = t.toString())[1] ? t : "0" + t;
}

//数据转化
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  /**
* 时间戳转化为年 月 日 时 分 秒
* number: 传入时间戳
* format：返回格式，支持自定义，但参数必须与formateArr里保持一致
*/
  formatTimemy: function (number, format) {

    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  },
  formatTime: function (e) {
    var r = e.getFullYear(), n = e.getMonth() + 1, o = e.getDate(), a = e.getHours(), u = e.getMinutes(), i = e.getSeconds();
    return [r, n, o].map(t).join("/") + " " + [a, u, i].map(t).join(":");
  },
  objectToUrlParams: function (t) {
    var e = "";
    for (var r in t) e += "&" + r + "=" + t[r];
    return e.substr(1);
  },
  formatData: function (e) {
    var r = e.getFullYear(), n = e.getMonth() + 1, o = e.getDate();
    e.getHours(), e.getMinutes(), e.getSeconds();
    return [r, n, o].map(t).join("-");
  },
  scene_decode: function (t) {
    var e = (t + "").split(","), r = {};
    for (var n in e) {
      var o = e[n].split(":");
      o.length > 0 && o[0] && (r[o[0]] = o[1] || null);
    }
    return r;
  }
};