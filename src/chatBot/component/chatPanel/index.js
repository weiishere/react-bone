import React from 'react';
import { render } from 'react-dom';
import Header from '../header';
import { connect } from 'react-redux';

export default class chatPanel {
    constructor() {
        //super(components);
    }
    setView(components) {
        class ChatPanelView extends React.Component {
            constructor(props) {
                super(props);
            }
            render() {
                const { header, footer } = components;
                return (<div className='chatWrapper'>
                    {header.view}
                    <section className='chatListWrap'>
                        <div className='msg clearfix sender'>
                            <p>2017-11-28 11:24:46</p>
                            <span></span>
                            <div>
                                消息体
                            </div>
                        </div>
                        <div className='msg clearfix recevier'>
                            <p>2017-11-28 11:24:46</p>
                            <span></span>
                            <div>
                                消息体消息体消息体消息体,消息体消息体消息体消息体消息,体消息体消息体消息体消息体
                            </div>
                        </div>
                    </section>
                    {footer.view}
                </div>)
            }
        }
        //this.view = <ChatPanelView />
        this.view = connect((state, ownProps) => {
            // const playerList = state.get('app_1').get("data").palyerList;
            // const loading = state.get('app_1').get("data").loading;
            return {}
        })(ChatPanelView);
    }
}

