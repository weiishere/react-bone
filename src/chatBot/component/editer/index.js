import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import utils from '../../utils/extend';
import $ from 'jquery';

// let postion = 'after';
// window.setTimeout(function () {
//     postion = 'before';
// }, 5000);

export default class Editer {
    constructor() { }
    setView({ components, bot }) {
        const Div = styled.div`
            background:#000;
            position:relative;
            &:after{
                position:absolute;
                left:.5rem;
                height:1.4rem;
                top:0;
                bottom:0;
                margin:auto;
                color:#666;
                display:${props => props.showPh ? 'block' : 'none'};
                content:'${props => props.placeholder}'
            }
        `
        class ContentEditable extends React.Component {
            constructor(props) {
                super(props);
                this.emitChange = this.emitChange.bind(this);
                this.handleFocus = this.handleFocus.bind(this);
                this.isHasplaceholder = this.isHasplaceholder.bind(this);
                this.emitBlur = this.emitBlur.bind(this);
                this.state = {
                    html: this.props.html,
                    showPh: true
                }
                this.timer1 = null;
            }
            shouldComponentUpdate(nextProps) {
                if (nextProps.html === "") return true;
                return nextProps.html !== this.lastHtml;
            }
            emitBlur(e) {
                const html = ReactDOM.findDOMNode(e.target).innerHTML;
                if (html === '') {
                    this.setState({ showPh: true });
                }
                if (utils.isIOSsys()) {
                    $(".footer,.chatListWrap").removeClass('dockTopKeyboard');
                    window.clearInterval(this.timer1);
                }
            }
            emitChange(e) {
                const html = ReactDOM.findDOMNode(e.target).innerHTML;
                if (this.props.onChange && html !== this.lastHtml) {
                    this.props.onChange({
                        target: {
                            value: html
                        }
                    });
                }
                this.lastHtml = html;

            }
            isHasplaceholder(html) {
                if (html === "") {
                    this.refs.editer.innerHTML = '<span>' + this.props.placeholder + '</span>';
                    return false;
                }
                return true;
            }
            handleFocus(e) {
                const _editer = document.querySelector('.' + this.refs.editer.state.generatedClassName)
                this.setState({
                    showPh: false
                });

                if (utils.isIOSsys()) {
                    this.timer1 = window.setInterval(function () {
                        _editer.scrollIntoView(true);
                    }, 100);
                    $(".footer,.chatListWrap").addClass('dockTopKeyboard');
                    window.setTimeout(function () {
                        const msgwapper = document.querySelector('.chatListWrap');
                        msgwapper.scrollTop = msgwapper.scrollHeight;
                    }, 500)
                }



                // window.setTimeout(function () {
                //     //_editer.scrollIntoView(true);
                //     //document.title = document.getElementsByTagName('body')[0].scrollHeight;
                //     //document.getElementsByTagName('body')[0].scrollTop = 0;
                //     // const dd=_editer.getBoundingClientRect();
                //     // document.title=dd.top;
                //     //document.title = window.scrollY+'-'+document.body.offsetHeight;
                //     //window.scrollTo(0, 300);
                //     $(".footer").addClass('dockTop');
                // }, 300);
            }
            componentDidMount() {
                //document.title = document.getElementsByTagName('body')[0].scrollTop
                //this.isHasplaceholder(this.props.html);
            }
            componentDidUpdate() {
                const _editer = document.querySelector('.' + this.refs.editer.state.generatedClassName)
                this.props.html == "" && (this.props.empty(_editer));
                //document.title = document.getElementsByTagName('body')[0].scrollTop
                //this.isHasplaceholder(this.props.html);
            }

            render() {
                return <Div
                    ref='editer'
                    showPh={this.state.showPh}
                    placeholder={this.props.placeholder}
                    onFocus={this.handleFocus}
                    onInput={this.emitChange}
                    onBlur={this.emitBlur}
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: this.state.html }}>
                </Div>;
            }
        };

        class EditerView extends React.Component {
            constructor(props) {
                super(props);
                this.sendHandle = this.sendHandle.bind(this);
                this.editHander = this.editHander.bind(this);
                this.state = {
                    content: ''
                }
            }
            editHander(e) {
                //this.targetEditer = e.event;
                this.setState({ content: e.target.value });
            }
            componentDidMount() {
                const self = this;
                let ke = 0;
            console.log($('.editer div[contenteditable]'));
                document.title =88888;
                $('.editer div[contenteditable]').keydown(function (event) {
                //$(document).keydown(function (event) {
                    document.title = ++ke;
                    if (event.keyCode == 13) {
                        
                        self.sendHandle();
                        return false;
                    }
                });
            }
            sendHandle() {
                const content = this.state.content;
                if (content === "") { return; }
                let mes = bot.sender.pushMes({
                    render: bot.msgRender.textRender,//指定消息渲染器
                    content: content,
                    delay: 2000,//延时多少时间渲染
                    timeline: 5000,//设置时间间隔，跟上一条消息的间隔，超过间隔则显示时间
                    sendBefore: function () { },
                    sendAfter: function () { },
                    renderBefore: function () { },
                    renderAfter: function () { }
                });
                this.setState({ content: '' });
                //this.refs.inputArea.innerHTML = '';
                //this.targetEditer.focus();
            }
            emptyHandle(inputArea) {
                inputArea.innerHTML = '';
                //_editer.focus();
            }
            render() {
                return (
                    <section className='editer'>
                        {/* <div contentEditable="true" onChange={this.editHander}>{this.state.content}</div> */}
                        <ContentEditable placeholder='请在此输入信息' empty={this.emptyHandle} html={this.state.content} onChange={this.editHander} />
                        <div><button onClick={this.sendHandle}>SEND</button></div>
                    </section>)
            }
        }
        this.view = connect((state, ownProps) => {
            return {}
        })(EditerView);
    }
}

