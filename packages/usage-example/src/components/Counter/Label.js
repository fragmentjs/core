import ComponentBackbone from '../../common/ComponentBackbone';
import { Provider } from "core";


class Label extends ComponentBackbone {

    constructor() {
        super()
        this.subscribe();
        //this.#updateLabel();
    }

    onStateChange(state) {
        this.#updateLabel()
    }

    #updateLabel = () => {
        const state = this.getState();

        Object.keys(state).map(namespace => {
            const { count } = state[namespace] || {};

            this.$el.innerHTML = count;
        });
        return this;
    }

    render() {
        return (`
            <span id="count">0</span>
        `);
    }
};

export default subscriptions => Provider(Label, {
    subscriptions
});