import $ from 'jquery';

export default (function () {
    return class Recevier {
        constructor(config) {
            this.socket = config.socket;
        }
        setInfo(info) {
            const obj = $.extend({}, info || {});
            Object.keys(obj).forEach((key) => {
                this[key] = obj[key];
            })
        }
        pushMes(msgContent) {
            
        }
    }
})()