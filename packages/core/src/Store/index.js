import pubSubMixin from '../PubSubMixin/index.js';


class Store {

    #namespace = ''
    #initState = {}
    #actions = {}
    #state = {}
    
    constructor(props = {}) {
        const { namespace: storeName = '', state: initState = {} } = props;

        this.#namespace =  storeName || this.name;
        this.#initState = this.#state = initState;
        return this;
    }

    get state() {
        return this.#state;
    }

    set state(newState) {
        this.#state = newState;
        this.boadcastState();
        return this;
    }

    get namespace() {
        return this.#namespace;
    }

    set action({ actionName, actionHandler } = {}) {
        this.#actions[actionName] = actionHandler;
        return this;
    }

    boadcastState() {
        this.emit({
            namespace: this.namespace,
            state: this.state
        });
        return this;
    }

    defaultState() {
        return this.#initState;
    }

    get(key) {
        const value = this.state[key];

        return value !== undefined ? value : this.defaultState()[key];
    }
    
    dispatch(type) {
        const action = this.#actions[type];

        //TODO dev only
        if(!action) {
            console.log(this.#namespace);
            console.log(this.#actions);
        }
        return action || (() => this.state);
    }
};

export default pubSubMixin(Store);