import textRender from './textRender';

class MsgRenderManager {
    constructor() {
        this.renderMap = {};
        this.mount('textRender', textRender);
    }
    mount(name, render) {
        this[name] = textRender;
        this.renderMap[name] = render;
    }
    getRender(name) {
        return this.renderMap[name];
    }
}


export default new MsgRenderManager();