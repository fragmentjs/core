import dataSrcColl from '../DataSourceCollection/index.js'



export default (BaseClass, { 
    subscriptions = []
} = {}) => class extends BaseClass {

    handlStateChange(state) {
        this.onStateChange(state);
        return this;
    }

    toggleSubs(method, namespace) {
        dataSrcColl[method](namespace, this.handlStateChange, { scope: this });
        return this;
    }

    subscribe() {
        subscriptions.map(namespace => this.toggleSubs('on', namespace));
        return this;
    }

    unsubscribe() {
        subscriptions = subscriptions.filter(namespace => {
            this.toggleSubs('off', namespace);
            return false;
        });
        return this;
    }

    boadcast(action, payload) {
        subscriptions.map(
            namespace => this.triggerAction(namespace, action, payload));
        return this;
    }

    triggerAction(namespace, action, payload) {
        dataSrcColl.getDataSource(namespace).dispatch(action)(payload);
        return this;
    }

    getDataSourceState(namespace) {
        return dataSrcColl.getDataSource(namespace).state;
    }

    getState() {
        return subscriptions.reduce((output, namespace) => {
            output[namespace] = this.getDataSourceState(namespace);
            return output;
        }, {});
    }
};