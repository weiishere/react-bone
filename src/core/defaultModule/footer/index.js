import Interface from '../../interface';
import './style.less';

class Footer extends Interface {
    constructor() {
        super();
    }
    start(result) {
        console.log('footer start');
        resolve(result + 'footer=>');
    }
    complate() {
        console.log('footer complate');
    }
    mount(data) {
        console.log('footer mount');
        window.setTimeout(() => {
            data += "footer mount=>";
            this.resolve(data);
        }, 1000);

    }
}

export default Footer;