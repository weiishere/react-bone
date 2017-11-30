import textRender from './textRender';

class MsgRenderManager {
    constructor() {
        this.renderMap = {};
        this.mount('textRender', textRender);
    }
    mount(name, render) {
        this.renderMap[name] = render;
    }
}


export default MsgRenderManager;