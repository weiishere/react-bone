import $ from 'jquery';

export default (function () {
    return class Sender {
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
            const sendMsg = this.formatMesHandler(msgContent);
            this.socket = this.getSocket();
            if (this.socket.readyState === 1) {
                this.socket.send(sendMsg)
            } else {
                throw new Error('websocket is not ready yet');
            }
        }
    }
})()