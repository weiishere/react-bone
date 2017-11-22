import { throws } from "assert";
import './common';
import React from 'react';
import { debug } from "util";
import { render } from 'react-dom';

class ParntComponet  {
    constructor(viewMod, propsData) {
        this.viewMod = viewMod;
        this.propsData = propsData;
        this.initialization = this.initialization.bind(this);
    }
    initialization() {
        alert('initialization');
    }

}


export default class Interface{
    constructor() {
        // if (!arg.length) throw new Error('InterFace argument error');
        // let mustEvent = ['start', 'update', 'stop', 'unmount'];
        // let classArg = arg[0], tempFunClass = function () { };
        // let _classArg = Object.getOwnPropertyNames(classArg.prototype);
        // mustEvent.cloneSelf().forEach((item) => {
        //     Object.keys(_classArg).forEach((key) => {
        //         if (_classArg[key] === item) mustEvent.removeByValue(item);
        //     })
        // });
        // if (mustEvent.length) throw new Error('Class "' + classArg.prototype.constructor.name + '" should be with function:"[' + mustEvent.join(',') + ']"');
        //tempFunClass.prototype = ParntComponet.prototype;
        // classArg.prototype = new tempFunClass;
        // classArg.prototype.constructor = classArg;
        //return classArg;
        this.view = document.createElement('div');
    }

    render() {
        return render;
    }
    initialization(config) {
        this.view = config.layout;
    }
    mount() {
        console.log('interFace mount');
    }
    run() {
    }
    check() {
        //if (!arg.length) throw new Error('InterFace argument error');
        let mustEvent = ['start', 'update', 'complate', 'unmount'];
        let classArg = this.__proto__, tempFunClass = function () { };
        let _classArg = Object.getOwnPropertyNames(classArg);
        mustEvent.cloneSelf().forEach((item) => {
            Object.keys(_classArg).forEach((key) => {
                if (_classArg[key] === item) mustEvent.removeByValue(item);
            })
        });
        if (mustEvent.length) throw new Error('Class "' + classArg.constructor.name + '" should be with function:"[' + mustEvent.join(',') + ']"');
    }
}