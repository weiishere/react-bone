import Core from './core'
import React from 'react';
import { render } from 'react-dom';
import ChartPanel from './core/defaultModule/chartPanel';
import Header from './core/defaultModule/header';
import Footer from './core/defaultModule/footer';


class ChartPanelViewChild extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 77777 }
    }
    componentWillMount() { console.log('Child--componentWillMount'); }
    componentDidMount() {
        console.log('Child--componentDidMount');
        window.setTimeout(() => {
            this.setState({ value: 888888888888888 });
        }, 3000);
    }
    componentWillUpdate() { console.log('Child--componentWillUpdate'); }
    componentDidUpdate() { console.log('Child--componentDidUpdate'); }
    render() {
        return <div>ChartPanelViewChild=={this.state.value}</div>
    }
}

class ChartPanelView extends React.Component {
    componentWillMount() { console.log('P--componentWillMount'); }
    componentDidMount() {
        console.log('P--componentDidMount');
        window.setTimeout(() => {
            this.setState({ value: 52525252 });
        }, 2000);
    }
    componentWillUpdate() { console.log('P--componentWillUpdate'); }
    componentDidUpdate() { console.log('P--componentDidUpdate'); }

    constructor(props) {
        super(props);
        this.state = { value: 858585 }
    }
    render() {

        return (
            <div>{this.props.value}<ChartPanelViewChild /></div>
        )
    }
}
const core = new Core({ layout: document.getElementById('layout') });


let app = core.install(
    new Header(),
    new ChartPanel(),
    new Footer()
)
app.run('=>', 'mount');
let ReComponent = app.setview(function (mods) {
    return <div>sdeeeeee</div>;
});


// core.run({
//     version: "1.1.1"
// });





render(
    <ReComponent value='22222222222222' />,
    document.getElementById('layout')
)