const template = document.createElement('template');
template.innerHTML = `
    <style>
        h3 {
            color: coral;
        }
        .user-card {
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: 10px;
            margin-bottom: 15px;
            border-bottom: darkorchid 5px solid;
            width: 50%;
        }
        .user-card img {
            width: 100%;
        }
        .user-card button {
            cursor: pointer;
            background: darkorchid;
            color: #fff;
            border: 0;
            border-radius: 5px;
            padding: 5px 10px;
            margin-bottom: 10px;
        }
    </style>
    <div class="user-card">
        <img />
        <div>
            <h3></h3>
            <div class="info">
                <p><slot name="email"/></p>
                <p><slot name="phone"/></p>
            </div>
            <button id="toggle-info">Hide info</buttton>
        </div>
    </div>
`;
class UserCard extends HTMLElement {
    constructor() {
        super();
        this.showInfo = true;
        // this.innerHTML = `${this.getAttribute('name')}`;
        //attaching DOM
        this.attachShadow({mode: 'open'});
        // appending template content
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // getting name
        this.shadowRoot.querySelector('h3').innerHTML = this.getAttribute('name');

        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');

    }

    toggleInfo() {
        this.showInfo = !this.showInfo;
        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

        if(this.showInfo){
            info.style.display = 'block';
            toggleBtn.innerHTML = 'Hide info';
        } else {
            info.style.display = 'none';
            toggleBtn.innerHTML = 'Show info';
        }

    }
    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListner('click', () => this.toggleInfo());

    }
    
}

window.customElements.define('user-card', UserCard)