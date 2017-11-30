
export default class Parent {
    constructor(components) {
        this.components = components;
    }
    override(getView) {
        console.log('parent override');
        this.view = getView(this.components);
    }
}