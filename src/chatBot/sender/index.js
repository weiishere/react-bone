import $ from 'jquery';
import { sendMessage } from '../action/messageAction'
import Charter from '../utils/chater'

export default (function () {
    return class Sender extends Charter {
        constructor(config) {
            super();
            this.bot = config.bot;
        }
        setInfo(info) {
            const obj = $.extend({}, info || {});
            Object.keys(obj).forEach((key) => {
                this[key] = obj[key];
            })
        }
        pushMes(msg) {
            const message = this.encapsMsg(msg);
            //处理位置
            
            if (message.postion === 'after') {
                this.bot.messageList = this.bot.messageList.concat(message)
            } else if (message.postion === 'before') {
                this.bot.messageList = [message].concat(this.bot.messageList);
            } else {
                let length = this.bot.messageList.length, postionIndex;
                for (let i = 0; i < length; i++) {
                    if (this.bot.messageList[i].id == message.postion) postionIndex = i;
                }
                this.bot.messageList = this.bot.messageList.splice(postionIndex, message);
            }
            
            this.bot.dispatch(sendMessage(this.bot.messageList));

        }
    }
})()