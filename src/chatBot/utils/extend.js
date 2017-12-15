

Date.prototype.format = function (stylestr) {
    const addPreZero = (num) => {
        return num < 10 ? '0' + num : '' + num;
    }
    var obj = {};
    var reg = /\{([ymdhisw])\}/i;
    var weekString = '日一二三四五六';
    stylestr = '' + stylestr;
    obj.y = this.getFullYear();
    obj.Y = obj.y;
    obj.m = this.getMonth() + 1;
    obj.M = addPreZero(obj.m);
    obj.d = this.getDate();
    obj.D = addPreZero(obj.d);
    obj.h = this.getHours();
    obj.H = addPreZero(obj.h);
    obj.i = this.getMinutes();
    obj.I = addPreZero(obj.i);
    obj.s = this.getSeconds();
    obj.S = addPreZero(obj.s);
    obj.w = weekString.charAt(this.getDay());
    obj.W = obj.w;
    while (stylestr.match(reg)) {
        stylestr = stylestr.replace(reg, obj[RegExp.$1]);
    }
    return stylestr;
};


export default {
    clone: function (obj) {
        var copy = (obj instanceof Array) ? [] : new obj.constructor();
        for (let attr in obj) {
            if (!obj.hasOwnProperty(attr)) continue;
            copy[attr] = (typeof obj[attr] == "object") ? that.clone(obj[attr]) : obj[attr];
        }
        return copy;
    },
    isIOSsys: function () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
        if (isAndroid) return false;
        if (isiOS) return true;
    }
}