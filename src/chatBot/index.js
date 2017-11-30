import $ from 'jquery'
import Sender from "./sender";
import Recevier from "./recevier";
import components from './component';
import React from 'react';
import { render } from 'react-dom';
import MsgRenderManager from './msgRender';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import immutable from 'immutable';
import reducers from './reducers';
import { connect } from 'react-redux';

export default (function () {
    let option = {};
    const SetReduxRoot = ({ reducers, container }) => {
        const store = createStore(reducers, immutable.Map());
        return (
            <Provider store={store}>
                {container}
            </Provider>)
    }
    return class ChatBot {
        constructor(wrapper, config) {
            if (typeof (wrapper) !== 'string') {
                throw new Error("ChatBot's object without the property 'wrapper'")
            }
            this.chatWrapper = document.querySelector(wrapper);
            this.components = components;
            this.msgRender = new MsgRenderManager();
            option = $.extend(true, {
                websocket: {
                    autoStart: true,
                    url: 'ws://ssssscccc',
                    timeout: 20000,
                    isRestart: true,
                    heartbeat: 1000,//0表示不发送心跳
                },
                theme: 'drak',//皮肤主题
            }, config || {});
            this.operate = {
                init: () => {
                    return new Promise((resolve, reject) => {
                        this.mount(
                            { Class: Sender, config: {} },
                            { Class: Recevier, config: {} }
                        );
                        this.setView();
                        resolve();
                    });
                },
                run: () => {
                    return new Promise((resolve, reject) => {
                        this.initSocket().then((socket) => {
                            this.socket = socket;
                            resolve();
                        }, (error) => {
                            reject(error);
                        });
                    });
                }
            }

        }
        initSocket() {
            return new Promise((resolve, reject) => {
                if (!option.websocket && option.websocket.url) {
                    throw new Error('Please set url of socket');
                }
                try {
                    const socket = new WebSocket(option.websocket.url);
                    socket.onopen = function () {
                        resolve(socket);
                    }
                    socket.onerror = function (error) {
                        reject(new Error('websocket start error'));
                    }
                } catch (e) {
                    reject(new Error('websocket start error'));
                    //throw new Error('websocket start error');
                }
            });
        }
        setView() {
            const { chatPanel } = components;
            class Container extends React.Component {
                constructor(props) { super(props); }
                render() {
                    return (<div className='botWrapper'><chatPanel.view /></div>)
                }
            }
            const _container = connect((state, ownProps) => {
                const msgList = state.get('data');
                return {}
            })(Container);
            render(<SetReduxRoot reducers={reducers} container={<_container />} />, this.chatWrapper);
        }
        mount(...mods) {
            let self = this;
            mods.forEach((item) => {
                let _name = item.Class.name;
                _name = _name.replace(/\b(\w)|\s(\w)/g, (m) => { return m.toLowerCase() });
                self[_name] = new item.Class(item.config);
                this[_name]['formatMes'] = function (getMsg) {
                    this.formatMesHandler = getMsg.bind(self);
                    this.getSocket = function () { return self.socket; }
                }
            });
        }
    }
})();