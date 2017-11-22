import Interface from '../../interface';
import React from 'react';
import { resolve } from 'path';
//import { reject } from './C:/Users/huangwei10/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/async';


class ChartPanel extends Interface {
    constructor(config) {
        super();
        this.data = config && config.data || { value: 5555555 };
    }
    start(result) {

        console.log('cahrtPanel start');
        resolve(result + 'cahrtPanel=>');
    }
    update() {
        console.log('cahrtPanel update');
    }
    complate() {
        console.log('cahrtPanel complate');
    }
    mount(data) {
        console.log('chartPanel mount');
        window.setTimeout(() => {
            data += 'chartPanel mount done=>';
            this.resolve(data);
        }, 1000);

    }
    unmount() {
        console.log('cahrtPanel unmount');
    }
}




export default ChartPanel;
// (
//      <ChartPanelView/>, { hello: 'hello im-pro' }
// );