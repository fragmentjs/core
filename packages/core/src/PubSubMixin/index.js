

const DEFAULT_EVENT_NAME = 'subscribe';


const removeSub = handlerToMatch => ({ handler }) => handler !== handlerToMatch;

const removeOnceHandler = ({ once }) => !once;

const callHandler = argsList => ({ handler, scope }) => handler.apply(scope, argsList);



export default BaseClass => {
    
    class PubSubMixin extends BaseClass {

        #events = {}

        get events() {
            return this.#events;
        }

        set handlers({ evtName = DEFAULT_EVENT_NAME, handlers = [] }) {
            
            this.#events[evtName] = handlers;
            return this;
        }

        set handler({ evtName = DEFAULT_EVENT_NAME, data }) {

            this.handlers = {
                evtName,
                handlers: this.getEvtHandlers(evtName)
            };

            this.#events[evtName].push(data);
            return this;
        }

        getEvtHandlers(evtName = DEFAULT_EVENT_NAME) {
            return this.events[evtName] || [];
        }

        on(evtName, evtHandler, { scope = null, once = false } = {}) {

            if (!evtHandler) {
                return this;
            };


            this.handler = {
                evtName,
                data: {
                    handler: evtHandler,
                    scope,
                    once
                }
            };

            //TODO: dev warning when handler cant be removed!! > console.log(this.getEvtHandlers(evtName)[<last>].handler === evtHandler);
            return this;
        }

        off(evtName, evtHandler) {
            const handlers = this.getEvtHandlers(evtName).filter(removeSub(evtHandler));
            //TODO: dev warning when nothing is removed
            return this.handlers = {
                evtName,
                handlers
            };
        }

        trigger(evtName, ...args) {
            const handlers = this.getEvtHandlers(evtName);

            this.handlers = {
                evtName,
                handlers: handlers.filter(removeOnceHandler)
            };

            handlers.forEach(callHandler(args));
            return this
        }

        subscribe(handler, options) {
            this.on(undefined, handler, options);
            return this;
        }

        unsubscribe(handler, options) {
            this.off(undefined, handler, options);
            return this;
        }

        emit(...args) {
            this.trigger(undefined, ...args);
            return this;
        }
    };

    return PubSubMixin;
}