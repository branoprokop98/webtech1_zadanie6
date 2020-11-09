var value = 1;

var x = document.addEventListener("DOMContentLoaded", () => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [],
            datasets: [{
                label: 'Sin',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false
            },
            {
                label: 'Cos',
                backgroundColor: 'rgb(48, 252, 3)',
                borderColor: 'rgb(48, 252, 3)',
                data: [],
                fill: false
            }]
        },

        // Configuration options go here
        options: {
            legend: {
                display: false
            },
            plugins: {
                zoom: {
                    // Container for zoom options
                    zoom: {
                        // Boolean to enable zooming
                        enabled: true,

                        // Enable drag-to-zoom behavior
                        drag: true,

                        // Drag-to-zoom effect can be customized
                        // drag: {
                        // 	 borderColor: 'rgba(225,225,225,0.3)'
                        // 	 borderWidth: 5,
                        // 	 backgroundColor: 'rgb(225,225,225)',
                        // 	 animationDuration: 0
                        // },

                        // Zooming directions. Remove the appropriate direction to disable
                        // Eg. 'y' would only allow zooming in the y direction
                        // A function that is called as the user is zooming and returns the
                        // available directions can also be used:
                        //   mode: function({ chart }) {
                        //     return 'xy';
                        //   },
                        mode: 'xy',

                        rangeMin: {
                            // Format of min zoom range depends on scale type
                            x: null,
                            y: null
                        },
                        rangeMax: {
                            // Format of max zoom range depends on scale type
                            x: null,
                            y: null
                        },

                        // Speed of zoom via mouse wheel
                        // (percentage of zoom on a wheel event)
                        speed: 0.1,

                        // Minimal zoom distance required before actually applying zoom
                        threshold: 2,

                        // On category scale, minimal zoom level before actually applying zoom
                        sensitivity: 3,

                        // // Function called while the user is zooming
                        // onZoom: function ({ chart }) { console.log(`I'm zooming!!!`); },
                        // // Function called once zooming is completed
                        // onZoomComplete: function ({ chart }) { console.log(`I was zoomed!!!`); }
                    }
                }
            }
        }
    });

    if (typeof (EventSource) !== "undefined") {
        var source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");

        source.addEventListener("message", function (e) {
            var data = JSON.parse(e.data);
            //document.getElementById("result").innerHTML = data.toString();
            console.log(data);
            chart.data.labels.push(data.x);
            chart.data.datasets[0].data.push(value * data.y1);
            chart.data.datasets[1].data.push(value * data.y2);
            // chart.data.datasets[0].hidden = true;
            chart.update();
        }, false);

        document.getElementById('buttonSSE').addEventListener('click', function () {
            source.close();
            //chart.options.plugins.zoom.zoom.enabled = true;
        })

    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
    }

    document.getElementById('showSin').addEventListener('click', e => {
        if(!e.target.checked){
            chart.data.datasets[0].hidden = true;
        }
        else if(e.target.checked){
            chart.data.datasets[0].hidden = false;
        }
        chart.update();
    })
    document.getElementById('showCos').addEventListener('click', e => {
        if(!e.target.checked){
            chart.data.datasets[1].hidden = true;
        }

        else if(e.target.checked){
            chart.data.datasets[1].hidden = false;
        }
        chart.update();
    })

});

// function multiplyGraphSlider() {
//     value = document.getElementById("customRange").value;
//     let input = document.getElementById('inputNumber');
//     let slider = document.getElementById('customRange');
//     input.value = slider.value;
//     console.log(value);
// }

// function multipyGraphNumber() {
//     value = document.getElementById("inputNumber").value
//     let input = document.getElementById('inputNumber');
//     let slider = document.getElementById('customRange');
//     slider.value = input.value;
// }

function showElement(elem, checkbox) {
    let check = document.getElementById(checkbox).value;
    console.log(check);

    if (check == true) {
        document.getElementById(elem).style.display = 'block';
    }
    else {
        document.getElementById(elem).style.display = 'none';
    }
}

function showInputField() {
    let check = document.getElementById('showInput').checked;
    let input = document.getElementById('input');

    if (check == true) {
        input.style.display = 'block';
        console.log(check);
    }
    else {
        input.style.display = 'none';
        console.log(check);
    }
}

function showSliderField() {
    let check = document.getElementById('showSlider').checked;
    let input = document.getElementById('slider');

    if (check == true) {
        input.style.display = 'block';
        console.log(check);
    }
    else {
        input.style.display = 'none';
        console.log(check);
    }
}

// function showSinGraph() {
//     let chart = document.getElementById('myChart');
//     let check = document.getElementById('showSin').checked;

//     if (!check) {
//         chart.data.datasets[0].hidden = true;
//     }
//     else {
//         chart.data.datasets[0].hidden = false;
//     }
// }

// function showCosGraph() {
//     let chart = document.getElementById('myChart');
//     let check = document.getElementById('showCos').checked;

//     if (!check) {
//         chart.data.datasets[1].hidden = true;
//     }
//     else {
//         chart.data.datasets[1].hidden = false;
//     }
// }



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
        console.log(value);
    }

    connectSlider() {
        value = this.shadowRoot.querySelector("#inputNumber").value
        let input = this.shadowRoot.querySelector('#inputNumber');
        let slider = this.shadowRoot.querySelector('#customRange');
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






// class Amplitude extends HTMLElement {
//     constructor(){
//         super();
//     }
//     connectedCallback() {
//         this.innerHTML = `
//         <div class="form-check-amp">
//             <input type="checkbox" class="form-check-input" id="showInput" onclick="showInputField()">
//             <label class="form-check-label" for="showInput">Zadanie hodnoty</label>
//         </div>

//         <div id="input">
//             <input type="number" class="form-control" onchange="multipyGraphNumber()" name="val" id="inputNumber">
//         </div>

//         <div class="form-check-amp">
//             <input type="checkbox" class="form-check-input" id="showSlider" onclick="showSliderField()">
//             <label class="form-check-label" for="showInput">Výber hodnoty</label>
//         </div>

//         <div id="slider">
//             <input type="range" onchange="multiplyGraphSlider()" name="val" class="custom-range" id="customRange" min="1"
//             max="100">
//         </div>`;
//     }
//}