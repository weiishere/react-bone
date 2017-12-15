import ChartBot from './chatBot';
import React from 'react';
import { render } from 'react-dom';
require('./theme/drak/main.less');



//bot负责初始化聊天区域初始化，webscoket建立、接收消息、渲染各类消息（文字、图文都是模板信息）、下拉加载历史
const chatBot = new ChartBot('#layout', {
    websocket: {
        url: 'ws://192.168.200.80:7180/?appId=jr.customer&pin=huangweilly&aid=SYEsDgHR&clientType=m&_wid_=1ca1e2b7-0c33-4693-b41f-c62b00f1d760&off=0',
        autoStart: false
    },
    theme: 'drak',//皮肤主题
});





//用户推送一条消息(发送信息的时候触发的第一个函数)
// let mes = chatBot.sender.pushMes({
//     render: chatBot.textRender,//指定消息渲染器
//     postion: 'after',//显示位置：before、messageId,
//     delay: 2000,//延时多少时间渲染
//     timeline: 1000,//设置时间间隔，跟上一条消息的间隔，超过间隔则显示时间
//     sendBefore: function () { },
//     sendAfter: function () { },
//     renderBefore: function () { },
//     renderAfter: function () { }
// });
/*
//解析收到的消息数据包，提取出有用信息
chatBot.recevier.formatMes(function (mesContent) {
    return {
        content: mesContent.mes.xxx.xxx,
        render: chatBot.textRender,//渲染器
    }
})
//收到消息然后推送
let mes = chatBot.recevier.pushMes({
    postion: 'after',//显示位置：before、messageId,
    delay: 2000,//延时多少时间渲染
    timeline: 1000,//设置时间间隔，跟上一条消息的间隔，超过间隔则显示时间
    sendBefore: function () { },
    sendAfter: function () { },
    renderBefore: function () { },
    renderAfter: function () { }
});
//如果之后还要处理这条消息msg，具备id/time/msgData/serder/recever等属性 
mes.remove();
mes.render(((oldData) => {
    oldData.content = 'XXXX';
    return oldData;
})(mes.data));//重新渲染,data为消息数据源体

//装载新类型的message(实际上是返回一个React组件)
// Message是一个消息对象，具备一些基本的操作方法，
class TextMessage extends Message {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content
        }
    }
    render() {
        return (
            <div>{this.state.content}</div>
        )
    }
}
chatBot.msgRender.Mount('textRender', TextMessage);//普通消息
//chatBot.msgRender.Mount('jrbtRender', jrbtMessage);//金融白条
//获取消息列表 chatBot.chatData={chatList,sender,recevier}

//重写
chatBot.component.add('face', function (components) {
    const { editer, sendBtu } = components;
    class face extends React.component {
        constructor(props) {
            super(props)
        }
        render() {
            <div><img /></div>
        }
    }
    return face;
});
//重写
chatBot.component.footer.override(function (components) {
    const { editer, sendBtu } = components;
    class footer extends React.component {
        constructor(props) {
            super(props)
        }
        render() {
            <div><editer /><sendBtu /></div>
        }
    }
    return footer;
});




//开始初始化消息
chatBot.operate.run().then(function () {
    //初始化界面
}).then(function () {
    //初始化对聊双方信息完成
}).then(function () {
    //webscoket初始化完成
});
chatBot.stop();



chatBot.components.header.override(function (components) {
    class HeaderView extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (<section className='header'>
                <div>
                    <img src='https://img10.360buyimg.com/cms/jfs/t4303/345/1493245249/8820/1b47e368/58c24a22Nb8c9d87d.png' />
                    <span>在线客服</span>
                </div>
            </section>)
        }
    }
    return <HeaderView />
});
*/
chatBot.operate.init().then(() => {
    chatBot.sender.setInfo({
        avatar: '',//头像
        nickName: '',//昵称
        pin: 'huangweilly',
        other: '...'
    });
    chatBot.recevier.setInfo({
        avatar: '',//头像
        nickName: '',//昵称
        other: '...'
    });
    //设置发送出去的消息数据包
    chatBot.sender.formatMes(function (msg) {
        return JSON.stringify({
            'from': {
                pin: this.sender.pin,
                clientType: 'm'
            },
            'to': {
                pin: this.recevier.pin,
                clientType: 'm'
            },
            'body': msg.content
        })
    });

    return chatBot.operate.run();
}).then(() => {
    // let mes = chatBot.sender.pushMes({
    //     render: chatBot.msgRender.textRender,//指定消息渲染器
    //     content: 'content',
    //     postion: 'after',//显示位置：before、messageId,
    //     delay: 2000,//延时多少时间渲染
    //     timeline: 1000,//设置时间间隔，跟上一条消息的间隔，超过间隔则显示时间
    //     sendBefore: function () { },
    //     sendAfter: function () { },
    //     renderBefore: function () { },
    //     renderAfter: function () { }
    // });
}, (error) => {
    alert(error);
});
