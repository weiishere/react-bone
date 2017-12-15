import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

export default class Footer {
    constructor() { }
    setView({ components, bot }) {
        class FooterView extends React.Component {
            constructor(props) {
                super(props);
            }
            render() {
                const { editer } = components;
                return (<section className='footer'>
                    <div>
                        <editer.view/>
                    </div>
                    <div>
                        功能组件区
                    </div>
                </section>)
            }
        }
        this.view = connect((state, ownProps) => {
            return {}
        })(FooterView);
    }
}

