import Store from '../Store/index.js'
import dataSrcColl from '../DataSourceCollection/index.js'



const namespaceResolver = fn =>  {
    const { name } = fn;
     
    if(name) {
        return name;
    };

    const [ fnName ] = fn.toString().match(/^(function\s+)?([\w\$]+)\s*(\()?/)
    
    return fnName.replace(/function|\s|\(/g, '');
};

const createActions = (actions, reducer, store) => actions.reduce((output, actionName = '') => {

    const actionHandler = payload => {
        store.state = reducer(store.state, {
            type: actionName,
            payload
        }, store);

        return store.state;
    };

    output.action = { actionName, actionHandler };
    return output;
}, store);




export default (reducer, { 
    namespace = namespaceResolver(reducer), 
    actions = [], 
    StoreClass = Store,
    state: storeInitialState
} = {}) => {

    // TODO if process.NODE_ENV 
    if(!reducer) {
        throw new Error('Reducer function must be supplied!');
    }; 

    if(!namespace) {
        throw new Error('The given namespace is invalid!');
    }; 

    const store = new StoreClass({
        state: storeInitialState,
        namespace
    });

    dataSrcColl.addDataSource(namespace, store);
    
    return createActions(actions, reducer, store);
};