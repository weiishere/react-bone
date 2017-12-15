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


/*

let sendMes = core.task(editer, charPanel).setView(function(mods){
    return <div><Editer/></div>
});
//setView则表示要

sendMes.run({
    data:{},
    delay:500,
    stepAfter:{
        editer:function(data){
            return data;
        }
    }
})

*/-

render(
    <ReComponent value='22222222222222' />,
    document.getElementById('layout')
) 


//框架主要用于解决react组件面向对象描述不强，扩展动作函数方面不是很方便，在此可以加强组件的动作化，以及多组件之间的连接和协作


//mount、start、update、分别都有各自的数据和数据流，mount数据流主要用于初始化(给到初始数据)，start表示第一次运行的时候做出的状态改变，update主要用于用户操作
//是否可以扩展出多条组件组，作为一个业务组
//view的问题，是否可以结合react来组织view层级，随着数据流动触发组件内函数

//暂时使用run(task)(data)这种方式柯里化，使用多条任务线的方式进行开发