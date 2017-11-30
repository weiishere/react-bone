
import React from 'react';
import { render } from 'react-dom';

export default class TextRender {
    constructor(content) {

    }
    render(content) {
        class TextMegView extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    content: this.props.content
                }
            }
            render() {
                return (
                    <div className='msg clearfix sender'>
                        <p>2017-11-28 11:24:46</p>
                        <span></span>
                        <div>{this.state}</div>
                    </div>
                )
            }
        }
    }
}