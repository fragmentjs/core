import ComponentBackbone from '../../common/ComponentBackbone';
import { Provider } from "core";


class Add extends ComponentBackbone {

    constructor() {
        super()
        this.subscribe();
        //
        this.$el.onclick = evt => this.boadcast('ADD', 1);
    }

    onStateChange(state) {
        this.#updateLabel()
    }

    #updateLabel = () => {
        const state = this.getState();
        
        Object.keys(state).map(namespace => {
            const { count } = state[namespace] || {};

            this.$el.innerHTML = 'Add ' + count;
        });
        return this;
    }

    render() {
        return (`
            <button id="add">add</button>
        `);
    }
};

export default subscriptions => Provider(Add, {
    subscriptions
});