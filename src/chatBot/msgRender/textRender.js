
import React from 'react';
import { render } from 'react-dom';

export default class TextRender {
    constructor(msgObj) {
        this.msgObj = msgObj;
        //this.render(msgObj.content);
    }
    render(content) {
        const self = this;
        class TextMegView extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    content: self.msgObj.content,
                    timeStr: self.msgObj.isShowTime ? self.msgObj.timeStr : ''
                }
            }
            // shouldComponentUpdate(nextProps) {
            //     return nextProps.html !== this.getDOMNode().innerHTML;
            // }
            render() {

                return (
                    <div className='msg clearfix sender'>
                        <p>{this.state.timeStr}</p>
                        <span></span>
                        <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
                    </div>
                )
            }
        }
        return TextMegView;
    }
}