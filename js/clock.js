class JanusClock extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        let clock = document.createElement('div');
        clock.className = "janusClock";
        this.shadow.appendChild(clock)

        for(let i = 0; i < 12; i++) {
            let mnTick = document.createElement('div');
            mnTick.id = 'mnTick'+i;
            clock.appendChild(mnTick);
            //504 divides evenly by 42
        }

        for(let i = 0; i < 60; i++) {
            let scTick = document.createElement('div');
            scTick.id = 'scTick';
            clock.appendChild(scTick);
        }

        let ampm = document.createElement('label');
        ampm.id = 'ampm';
        clock.appendChild(ampm);

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'css/clock.css')
        this.shadow.appendChild(linkElem);
    }
}

customElements.define('janus-clock', JanusClock);