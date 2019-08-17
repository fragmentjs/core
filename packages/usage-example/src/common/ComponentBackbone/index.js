

class ComponentBackbone {
    #el = document.createElement('div')

    constructor() {
        return this.#createElRef(this.render());
    }

    #createElRef = () => {
        let $el = this.#el;
        $el.innerHTML = this.render();
        $el = $el.children[0];
        this.#el = $el
        return this;
    }

    get $el() {
        return this.#el;
    }

    set $el($el) {
        this.#el = $el;
        return this
    }

    render() {
        return (`<div></div>`)
    }
}

export default ComponentBackbone;