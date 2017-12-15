import React from 'react';
import { render } from 'react-dom';
import Header from '../header';
import { connect } from 'react-redux';

export default class chatPanel {
    constructor(props) {
        //super(components);
    }
    setView({ components, bot }) {

        class ChatPanelView extends React.Component {
            constructor(props) {
                super(props);
            }
            componentDidUpdate() {
                const msgwapper = document.querySelector('.chatListWrap');
                msgwapper.scrollTop = msgwapper.scrollHeight;
            }
            render() {
                const { header, footer } = components;
                let megListView = this.props.messageList.map((mesItem, index) => {
                    let Message = (new mesItem.render(mesItem)).render();
                    return <Message key={index} />
                });
                return (<div className='chatWrapper'>
                    {header.view}
                    <section className='chatListWrap'>
                        {megListView}
                        {/* <div className='msg clearfix sender'>
                            <p>2017-11-28 11:24:46</p>
                            <span></span>
                            <div>
                                {this.props.messageList.length}
                            </div>
                        </div>
                        <div className='msg clearfix recevier'>
                            <p>2017-11-28 11:24:46</p>
                            <span></span>
                            <div>
                                消息体消息体消息体消息体,消息体消息体消息体消息体消息,体消息体消息体消息体消息体
                            </div>
                        </div> */}
                    </section>
                    <footer.view />
                </div>)
            }
        }
        //this.view = <ChatPanelView />
        this.view = connect((state, ownProps) => {
            const messageList = state.get('messageList').get("data").messageList;
            return { messageList }
        })(ChatPanelView);
    }
}

