import utils from './extend';

export default class {
    constructor() {
        this.lastSendTime = 0;//(new Date()).valueOf();
        this.timeline = 60 * 1000;
        this.messageBody = {
            msgId: this.generateUUID(),
            content: '[默认信息]',
            postion: 'after',
            delay: 0,
            time: (new Date()).valueOf(),
            sendBefore: function () { },
            sendAfter: function () { },
            renderBefore: function () { },
            renderAfter: function () { }
        }
    }
    encapsMsg(msg) {
        msg.timeStr = this.getNowFormatDate();
        msg.isShowTime = this.isShowTime(msg.timeline);//是否显示时间
        const message = Object.assign(utils.clone(this.messageBody), msg);
        return message;
    }
    isShowTime(timeline) {
        const sendTime = (new Date()).valueOf();
        const result = (sendTime - this.lastSendTime > (timeline || this.timeline) ? true : false);
        this.lastSendTime = sendTime;
        return result;
    }
    generateUUID() {
        let d = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    getNowFormatDate(_time) {
        const arg = _time || new Date();
        const nowObj = new Date();
        const today = new Date();
        let timeDiff, time, deltaTime;
        const dayTime = 24 * 60 * 60 * 1000;
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        timeDiff = nowObj - today;
        deltaTime = nowObj - arg;
        if (deltaTime <= timeDiff) {
            time = arg.format('今天 {H}:{I}:{S}');
        } else if (deltaTime <= timeDiff + dayTime) {
            time = arg.format('昨天 {H}:{I}');
        } else if (deltaTime <= timeDiff + 8 * dayTime) {
            time = arg.format('周{W} {H}:{I}');
        } else {
            time = arg.format('{Y}-{M}-{D} {H}:{I}');
        }
        return time;
    }
}