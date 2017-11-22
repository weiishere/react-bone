import Interface from '../../interface';
import './style.less';
import { win32 } from 'path';
import { debug } from 'util';

class Header extends Interface {
    constructor() {
        super();
    }
    start(done, result) {
        console.log('header start');
        resolve(result + 'header=>');
    }
    update() {
        console.log('header update');
    }
    complate() {
        console.log('header complate');
    }
    mount(data) {
        console.log('header mount');
        data += "header mount=>";
        this.resolve(data);
    }
    unmount() {
        console.log('header unmount');
    }
}

export default Header;