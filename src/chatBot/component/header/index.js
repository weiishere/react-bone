import React from 'react';
import { render } from 'react-dom';


export default class Header {
    constructor() {
        
    }
    setView({ components, bot }) {
        class HeaderView extends React.Component {
            constructor(props) {
                super(props);
            }
            render() {
                return (<section className='header'>
                    <div>
                        <img src='https://img10.360buyimg.com/cms/jfs/t4303/345/1493245249/8820/1b47e368/58c24a22Nb8c9d87d.png' />
                        <span>在线客服-header</span>
                    </div>
                </section>)
            }
        }
        this.view = <HeaderView />
    }
}

