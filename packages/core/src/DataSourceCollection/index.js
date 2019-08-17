import Store from '../Store/index.js'


class DataSourceCollection extends Store {

    #fallbackDataSource = { state: {}, mock: true }

    constructor(props) {
        //TODO
        //add queue to save subscriptions until store is registered
        super({ namespace: 'dataSrcColl',...props })
    }

    on(namespace, ...args) {
        const dataSource = this.getDataSource(namespace);
        
        if (!dataSource.mock) {
            dataSource.boadcastState();
        };
        
        super.on(namespace, ...args);
        return this;
    }

    getDataSource(namespace) {
        return this.state[namespace] || this.#fallbackDataSource;
    }

    addDataSource(namespace, dataSource) {
        
        this.removeDataSource(namespace);
        this.state = { ...this.state, [namespace]: dataSource };
        dataSource.subscribe(this.proxyStateBroadcast, { scope: this }).boadcastState();
        return this;
    }

    removeDataSource(namespace) {
        const dataSource = this.getDataSource(namespace);

        if (dataSource.mock) {
            return this;
        };

        dataSource.subscribe(this.proxyStateBroadcast);
        delete this.state[namespace];
        return this;
    }

    proxyStateBroadcast(evt) {
        const { namespace } = evt;

        this.trigger(namespace, evt)
        return this;
    }
};

export default new DataSourceCollection();