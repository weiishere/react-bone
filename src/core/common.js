Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}



 Array.prototype.cloneSelf = function () {
    // var copy = (this instanceof Array) ? [] : {};
    // for (let attr in this) {
    //     if (!obj.hasOwnProperty(attr)) continue;
    //     copy[attr] = (typeof this[i] == "object") ? obj[attr].clone() : obj[attr];
    // }
    // return copy;
    let copyThis = function (obj) {
        let copy;
        if (obj instanceof Array) {
            copy = [];
            for (let i = 0; i < obj.length; i++) {
                copy[i] = copyThis(obj[i]);
            }
            return copy;
        } else if (obj instanceof Object) {
            copy = {};
            for (let key in obj) {
                if (key === 'clone') continue;
                copy[key] = copyThis(obj[key]);
            }
            return copy;
        } else {
            return obj;
        }
    }
    return copyThis(this);
};