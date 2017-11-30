import React from 'react';
import { render } from 'react-dom';


export default class Editer {
    constructor() { }
    setView(components) {
        class EditerView extends React.Component {
            constructor(props) {
                super(props);
            }
            render() {
                return (
                    <section className='editer'>
                        <div contentEditable="true"></div>
                        <div><button>SEND</button></div>
                    </section>)
            }
        }
        this.view = <EditerView />
    }
}

