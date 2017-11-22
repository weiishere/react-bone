
import ChartPanel from './defaultModule/chartPanel';
import Header from './defaultModule/header';
import Footer from './defaultModule/footer';
import { debug } from 'util';
import React from 'react';
import { render } from 'react-dom';


class PubSuber {
    constructor(config) {
        this.config = config;
        this.finish = this.finish.bind(this);
        this.initData;
    }
    subscribe(e, callback) {
        let calls = this._callbacks || (this._callbacks = {});
        (this._callbacks[e] || (this._callbacks[e] = [])).push(callback);
        return this;
    }
    publish() {
        let self = this;
        let args = Array.prototype.slice.call(arguments, 0);
        let ev = args.shift();
        let list, calls, i, l;
        if (!(calls = this._callbacks))
            return this;
        if (!(list = this._callbacks[ev]))
            return this;
        if (!this.config.async) {
            for (i = 0, l = list.length; i < l; i++)
                list[i].apply(this, args);
            self.finish();
        } else {
            let t = (index, data) => {
                if (index === list.length) {
                    self.initData = data;
                    self.finish();
                    return
                };
                list[index](data).then((result) => {
                    t(index + 1, result);
                });
            };
            t(0, self.initData);
        }
        return this;
    }
    finish() { }
}

export default class Core {
    constructor(config) {
        this.run = this.run.bind(this);
        this.config = config;

    }

    install(...mods) {
        // (function (_mod) {
        //     //渲染
        //     //mod.check.call(mod);
        //     _mod.initialization(this.config);
        //     _mod.start();
        //     _mod.run();
        //     let view = _mod.view;
        //     console.log(view.innerHTML);
        // })(mod);
        let self = this, pubSuberList = [];
        self.mods = mods;
        let initEve = function (eveName) {
            pubSuberList.push(
                (function () {
                    return {
                        eveName: eveName,
                        pubSuber: (function () {
                            //渲染
                            //mod.check.call(mod);
                            //m.initialization(this.config);
                            let _pubSuber = new PubSuber({ async: true });
                            mods.forEach((mod, index) => {
                                _pubSuber.subscribe(eveName, (data) => {
                                    return new Promise((resolve, reject) => {
                                        mod[eveName.split('.')[1]].call(Object.assign(mod, { resolve, reject }), data);
                                    });
                                });
                                _pubSuber.finish = function () {
                                    //alert(this.initData);
                                }
                            });
                            return _pubSuber;
                            /*pubSuber.subscribe(eveName, () => {
                                mods.forEach((mod, index) => {
                                    return new Promise((resolve, reject) => {
                                        mod[eveName.split('.')[1]].call(Object.assign(mod, { resolve, reject }));
                                    });
                                });
                            })*/
                            // self.PubSub.subscribe('core.start', () => {
                            //     return new Promise((resolve, reject) => {
                            //         m.start(resolve, reject);
                            //     });
                            // });
                        })()
                    }
                })()
            )
        }
        initEve('core.mount');
        //initEve('core.start');

        return {
            setview: function (result) {
                let layout = result.call(self, mods);
                class Root extends React.Component {
                    constructor(props) {
                        super(props);
                    }
                    render() {
                        return layout;
                    }
                }
                return Root;
            },
            run: function (item, data) {
                pubSuberList.forEach((item) => {
                    if (item.eveName === 'core.' + item) {
                        item.pubSuber.initData = data;
                        item.pubSuber.publish(item.eveName);
                    }
                });
            }
        }
        return (arg) => {
            pubSuberList.forEach((item) => {
                item.pubSuber.initData = arg.data;
                item.pubSuber.publish(item.eveName);
            });
        }
        // self.PubSub.async = true;
        // self.PubSub.publish('core.mount');

        // mods[0].start('go=>').then(function (result) {
        //     mods[0].complate();
        //     return mods[1].start(result);
        // }).then(function (result) {
        //     mods[1].complate();
        //     return mods[2].start(result);
        // }).then(function (result) {
        //     console.log(result);
        //     mods[2].complate();
        // });

    }
    run() {
        //(new header()).dock(new ChartPanel().mount(new MessageKit))
        //默认挂载header、chartPanel、footer、以及editor4个
        // this.install(
        //     new Header(),
        //     new ChartPanel(),
        //     new Footer()
        // )({ data: '=>' });
    }
    // setView(mod) {
    //     return (<div>
    //         {this}
    //     </div>)
    // }
}

//mount、start、update、分别都有各自的数据和数据流，mount数据流主要用于初始化(给到初始数据)，start表示第一次运行的时候做出的状态改变，update主要用于用户操作
//是否可以扩展出多条组件组，作为一个业务组
//view的问题，是否可以结合react来组织view层级，随着数据流动触发组件内函数