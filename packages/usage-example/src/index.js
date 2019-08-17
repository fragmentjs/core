'use strict';

import { createStore } from "core";
import Counter from "./components/Counter";



document.body.appendChild(new Counter(['counter']).$el);
document.body.appendChild(new Counter(['counter2']).$el);



createStore(function counter(state, { type, payload }, store) {
    const { count } = state;

    switch (type) {
        case 'ADD':
            return {
                'count': count + payload
            };
        case 'LESS':
            return {
                'count': count - payload
            };

        default:
            return state;
    }
}, {
    actions: ['ADD', 'LESS'],
    //StoreClass: Store2,
    state: JSON.parse((localStorage.getItem('zhnu') || '{ "count": 3 }'))
}).subscribe(({ state }) => {
    localStorage.setItem('zhnu', JSON.stringify(state))
});

createStore(function counter2(state, { type, payload }, store) {
    const { count } = state;

    switch (type) {
        case 'ADD':
            return {
                'count': count + payload
            };
        case 'LESS':
            return {
                'count': count - payload
            };

        default:
            return state;
    }
}, {
    actions: ['ADD', 'LESS'],
    state: { "count": 2 }
});