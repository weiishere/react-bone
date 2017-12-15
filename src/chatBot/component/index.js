import Header from './header';
import Footer from './footer';
import Editer from './editer';
import ChatPanel from './chatPanel';

// const components = [
//     new Header(),
//     new ChatPanel()
// ]
// let result = {};
// components.forEach(function (component) {
//     result[component.constructor.name] = component;
// });
// components.forEach(function (component) {
//     component['override'] = (getView) => {
//         this.view = getView.call(this, result);
//     }
//     component.setView(result);
// })

export default (bot) => {
    let components = {
        header: new Header(),
        footer: new Footer(),
        editer: new Editer(),
        chatPanel: new ChatPanel()
    }
    Object.keys(components).forEach((item) => {
        let component = components[item];
        component['override'] = function (getView) {
            this.view = getView.call(this, components);
        }
        component.setView({ components, bot });
    });
    return components;
};