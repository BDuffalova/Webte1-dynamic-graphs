var amplitude = 1;
var dataSin, dataCos;


class AmplitudeValue extends HTMLElement {
    constructor() {
        super().attachShadow({ mode: "open" });

        // this.attachShadow({ mode: "open" });
        var genGraph = document.getElementById("genGraph");
        const slider = document.createElement("input");
        slider.setAttribute("type", "range");
        slider.max = this.hasAttribute('ampMax') ? this.getAttribute("ampMax") : 6;

        slider.min = this.hasAttribute('ampMin') ? this.getAttribute('ampMin') : 1;

        slider.value = 1;

        slider.setAttribute("class", "slider");
        slider.style.position = "absolute";

        slider.style.top = "95%";
        slider.style.left = "1.3";
        


        console.log(this.attributes);
        console.log(this);

        const number = document.createElement("input")
        number.setAttribute("type", "number");
        number.max = this.hasAttribute('ampMax') ? this.getAttribute('ampMax') : 6;

        number.min = this.hasAttribute('ampMin') ? this.getAttribute('ampMin') : 1;

        number.value = 1;

        number.setAttribute("class", "number");
        number.style.position = "absolute";

        number.style.top = "95%";
        number.style.left = "1.3";

        number.style.width = "20%"
        slider.style.width = "20%"


        var range = slider.max - slider.min + 1;
        var max = slider.max;
        var min = slider.min;

        var value = document.createElement("p")
        value.style.position = "absolute"
        value.innerHTML = slider.value;
        value.style.top = "92.5%";
        value.style.left = "1.3%";


        var ampCheckblock = document.createElement("input");
        ampCheckblock.setAttribute("type", "checkbox");
        ampCheckblock.setAttribute("id","ampCheck");
        var ampLabel = document.createElement("label");
        ampLabel.setAttribute("for","ampCheck");
        ampLabel.innerHTML = "Zmeň vstup pre amplitúdu";

        var content = document.createElement("div");
        content.style.width = "100%"

        number.style.display = "none";
        slider.style.display = "block";

        slider.addEventListener("change", function () {
            number.value = slider.value;
            amplitude = slider.value;
            var val = amplitude * (20/range)-1.5;
            console.log(val);
            console.log(20/6);
            value.style.left = val+"%";
            value.innerHTML = amplitude;
            console.log(value.style.left);
            Plotly.update(genGraph, [dataSin, dataCos])
        })

        number.addEventListener("change", function () {
            slider.value = number.value;
            amplitude = number.value;
            value.style.left = "1.3%";
            var val = amplitude * (20/range)-1.5;
            console.log(val);
            console.log(20/6);
            value.style.left = val+"%";
            value.innerHTML = amplitude;
            console.log(value.style.left);
            Plotly.update(genGraph, [dataSin, dataCos])
        })

        ampCheckblock.addEventListener("change", function () {
            if(ampCheckblock.checked){
                number.style.display = "block";
                slider.style.display = "none";
                value.style.display = "none";
            }
            else{
                number.style.display = "none";
                slider.style.display = "block";
                value.style.display = "block";
            }
        })

        content.appendChild(slider);
        content.appendChild(number);
        content.appendChild(ampCheckblock);
        content.appendChild(ampLabel);
        content.appendChild(value)

        const style = document.createElement("style");
        style.textContent = `
            .slider {
                -webkit-appearance: none;
                appearance: none;
                width: 100%;
                height: 15px;
                background: #ffffff;
                border: 1px solid #d7d7d7;
                opacity: 1;
                -webkit-transition: .2s;
                transition: opacity .2s;
              }
              
              .slider:hover {
                opacity: 1;
              }
              
              .slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 10%;
                height: 20px;
                background: #f6f6f6;
                border: solid 1px #d7d7d7;
                border-radius: 5%;
                cursor: pointer;
                outline: solid grey;
              }
              
              .number {
                -webkit-appearance: none;
                appearance: none;
                width: 100%;
                height: 15px;
                background: #ffffff;
                border: 1px solid #d7d7d7;
                opacity: 1;
                -webkit-transition: .2s;
                transition: opacity .2s;
              }
}`;

        this.shadowRoot.append(style,content)




    }
}




function poNacitani() {
    customElements.define("amplitude-value", AmplitudeValue);
    var btnSin = document.getElementById("sinus");
    btnSin.addEventListener("change", setGraphdisplay);

    var btnCos = document.getElementById("cosinus");
    btnCos.addEventListener("change", setGraphdisplay);
    var genGraph = document.getElementById("genGraph");

    dataSin = {
        x: [],
        y: [],
        name: "sin"
    };

    dataCos = {
        x: [],
        y: [],
        name: "cos"
    };

    var config = {
        responsive: true,
    }
    Plotly.newPlot(genGraph, [dataSin, dataCos],0,config);

    var source = new EventSource("http://old.iolab.sk/evaluation/sse/sse.php");
    source.onmessage = (event) => {
        var values = JSON.parse(event.data);
        var x = values.x;
        var y1 = values.y1;
        var y2 = values.y2;
        var update = {
            x: [[x], [x]],
            y: [[y1 * amplitude], [y2 * amplitude]]
        }
        var genGraph = document.getElementById("genGraph");
        Plotly.extendTraces(genGraph, update, [0, 1]);
    }

    var btnKoniec = document.getElementById("koniec");
    btnKoniec.addEventListener("click", function () {
        source.onmessage = null;
    })

}

function updateGraph(values) {
    var genGraph = document.getElementById("genGraph");
    var x = values.x;
    var y1 = values.y1;
    var y2 = values.y2;
    Plotly.extendTraces(genGraph, {
        x: [x, x],
        y: [y1, y2]
    }, [0, 1]);
}

function setGraphdisplay() {
    var sinus = document.getElementById("sinus")
    var cosinus = document.getElementById("cosinus")
    var graph = document.getElementById("genGraph")
    var traces = document.getElementById("genGraph").data
    var result;
    // Find index of trace-object with "name" property  = "text to find":


    if (sinus.checked) {
        console.log("checked " + sinus.checked)
        result = traces.findIndex(obj => {
            return obj.name === "sin";
        })
        var update = {
            block: true
        }
        Plotly.restyle(graph, { "block": true }, result)
    }

    if (cosinus.checked) {
        result = traces.findIndex(obj => {
            return obj.name === "cos";
        })
        var update = {
            block: true
        }
        Plotly.restyle(graph, update, result)
    }

    if (!sinus.checked) {
        console.log("checked " + sinus.checked)
        result = traces.findIndex(obj => {
            return obj.name === "sin";
        })
        var update = {
            block: "legendonly"
        }
        Plotly.restyle(graph, { "block": "legendonly" }, result)
    }

    if (!cosinus.checked) {
        result = traces.findIndex(obj => {
            return obj.name === "cos";
        })
        var update = {
            block: "legendonly"
        }
        Plotly.restyle(graph, update, result)
    }

}
