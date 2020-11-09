const template = document.createElement('template');
template.innerHTML = `
    <div class="form-check-input">
        <input type="checkbox" class="form-check-input" id="showInput">
        <label class="form-check-label" for="showInput">Zadanie hodnoty</label>
    </div>

    <div id="input">
        <input type="number" class="form-control" name="val" id="inputNumber" value="1">
    </div>

    <div class="form-check-slider">
        <input type="checkbox" class="form-check-input" id="showSlider">
        <label class="form-check-label" for="showInput">Výber hodnoty</label>
    </div>

    <div id="slider">
        <input type="range" name="val" class="custom-range" id="customRange" min="1"
        max="100" value="1">
        <span>1</span>
    </div>
    <style>
    #slider{
        display: none;
        margin: 10px;
    }
    #input{
        display: none;
        margin: 10px;
    }
    </style>
    `;

class Amplitude extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }


    connectInput() {
        value = this.shadowRoot.querySelector('#customRange').value;
        let input = this.shadowRoot.querySelector('#inputNumber');
        let slider = this.shadowRoot.querySelector('#customRange');
        input.value = slider.value;
        this.shadowRoot.querySelector('span').innerText = value;
        console.log(value);
    }

    connectSlider() {
        value = this.shadowRoot.querySelector("#inputNumber").value
        let input = this.shadowRoot.querySelector('#inputNumber');
        let slider = this.shadowRoot.querySelector('#customRange');
        this.shadowRoot.querySelector('span').innerText = value;
        slider.value = input.value;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#showInput').addEventListener('click', e => {
            let input = this.shadowRoot.querySelector('#input');

            if (e.target.checked == true) {
                input.style.display = 'block';
                console.log(e.target.checked);
            }
            else {
                input.style.display = 'none';
                console.log(e.target.checked);
            }
        })

        this.shadowRoot.querySelector('#showSlider').addEventListener('click', e => {
            let input = this.shadowRoot.querySelector('#slider');

            if (e.target.checked == true) {
                input.style.display = 'block';
                console.log(e.target.checked);
            }
            else {
                input.style.display = 'none';
                console.log(e.target.checked);
            }
        })

        this.shadowRoot.querySelector('#inputNumber').addEventListener('change', () => {
            this.connectSlider();
        })

        this.shadowRoot.querySelector('#customRange').addEventListener('change', () => {
            this.connectInput();
        })
    }
}

customElements.define('ampli-tude', Amplitude);