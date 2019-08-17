import ComponentBackbone from '../../common/ComponentBackbone';
import { Provider } from "core";

class Less extends ComponentBackbone {


    constructor() {
        super()
        this.$el.onclick = evt => this.boadcast('LESS', 1);
    }

    render() {
        return (`
            <button id="less">less</button>
        `);
    }
};

export default subscriptions => Provider(Less, {
    subscriptions
})