
var data, data1, data2, data3, data4;

function poNacitani() {
    
    window.addEventListener("resize", changeGraphLayout);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open("GET", "z03.xml", true);
    xhttp.send()

    function myFunction(xml) {
        var years = [];
        var records = [];
        var xmlDoc = xml.responseXML;

        for (var record of xmlDoc.getElementsByTagName("zaznam")) {

            var year = record.getElementsByTagName("rok")[0].textContent;
            years.push(year);

            var marks = record.getElementsByTagName("hodnotenie")[0];

            var A = parseInt(marks.getElementsByTagName("A")[0].textContent);
            var B = parseInt(marks.getElementsByTagName("B")[0].textContent);
            var C = parseInt(marks.getElementsByTagName("C")[0].textContent);
            var D = parseInt(marks.getElementsByTagName("D")[0].textContent);
            var E = parseInt(marks.getElementsByTagName("E")[0].textContent);
            var Fx = parseInt(marks.getElementsByTagName("FX")[0].textContent);
            var Fn = parseInt(marks.getElementsByTagName("FN")[0].textContent);

            var stats = {
                year: year,
                marks: {
                    A: A,
                    B: B,
                    C: C,
                    D: D,
                    E: E,
                    Fx: Fx,
                    Fn: Fn
                }
            };
            records.push(stats);
        }

        drawBarGraph(years, records);
        drawPieGraph(years, records);
        drawMyGraph(years, records);


    };





}




function changeGraphLayout() {
    var resultsGraph = document.getElementById("bar-graph-all");
    var resultsGraph1 = document.getElementById("pie-graph-21-22");
    var resultsGraph2 = document.getElementById("pie-graph-20-21");
    var resultsGraph3 = document.getElementById("pie-graph-19-20");



    if (window.innerWidth <= 360) {

        var layout1 = {
            orientation: "h"
        }


        Plotly.restyle(resultsGraph, layout1);

    }
    if (window.innerWidth <= 550) {
        var layout2 = {
            "grid.rows": 2,
            "grid.columns": 1,
        }

        data1[1].domain.row = 1;
        data1[1].domain.column = 0;
        data2[1].domain.row = 1;
        data2[1].domain.column = 0;
        data3[1].domain.row = 1;
        data3[1].domain.column = 0;
        data1[1].textinfo = "label";
        data2[1].textinfo = "label";
        data3[1].textinfo = "label";
        data1[0].textinfo = "label";
        data2[0].textinfo = "label";
        data3[0].textinfo = "label";


        Plotly.update(resultsGraph1, data1, layout2);
        Plotly.update(resultsGraph2, data2, layout2);
        Plotly.update(resultsGraph3, data3, layout2);
    }
    else {
        data1[1].domain.row = 0;
        data1[1].domain.column = 1;
        data2[1].domain.row = 0;
        data2[1].domain.column = 1;
        data3[1].domain.row = 0;
        data3[1].domain.column = 1;
        data1[1].textinfo = "label+percent";
        data2[1].textinfo = "label+percent";
        data3[1].textinfo = "label+percent";
        data1[0].textinfo = "label+percent";
        data2[0].textinfo = "label+percent";
        data3[0].textinfo = "label+percent";

        var layout1 = {
            orientation: "v",
            font: {
                size: 0.5
            }
        }
        var layout2 = {
            "grid.rows": 1,
            "grid.columns": 2,
        }

        Plotly.restyle(resultsGraph, layout1);
        Plotly.update(resultsGraph1, data1, layout2);
        Plotly.update(resultsGraph2, data2, layout2);
        Plotly.update(resultsGraph3, data3, layout2);
    }
}


function drawBarGraph(years, records) {
    var resultsGraph = document.getElementById("bar-graph-all");

    var a = {
        x: years,
        y: records.map((record) => { return record.marks.A }),
        name: 'A',
        type: 'bar',
    };

    var b = {
        x: years,
        y: records.map((record) => { return record.marks.B }),
        name: 'B',
        type: 'bar',
    };

    var c = {
        x: years,
        y: records.map((record) => { return record.marks.C }),
        name: 'C',
        type: 'bar',
    };

    var d = {
        x: years,
        y: records.map((record) => { return record.marks.D }),
        name: 'D',
        type: 'bar',
    };

    var e = {
        x: years,
        y: records.map((record) => { return record.marks.E }),
        name: 'E',
        type: 'bar',
    };

    var fx = {
        x: years,
        y: records.map((record) => { return record.marks.Fx }),
        name: 'Fx',
        type: 'bar',
    };

    var fn = {
        x: years,
        y: records.map((record) => { return record.marks.Fn }),
        name: 'Fn',
        type: 'bar',
    };

    data = [a, b, c, d, e, fx, fn];

    var config = {
        responsive: true
    }

    Plotly.newPlot(resultsGraph, data,0, config);
}

function drawPieGraph(years, records) {
    var resultsGraph = document.getElementById("pie-graph-21-22");
    var resultsGraph2 = document.getElementById("pie-graph-20-21");
    var resultsGraph3 = document.getElementById("pie-graph-19-20");

    var values = [];
    var names = ["A", "B", "C", "D", "E", "Fx", "Fn"];
    var A, B, C, D, E, Fx, Fn;
    records.forEach(record => {
        A = record.marks.A;
        B = record.marks.B;
        C = record.marks.C;
        D = record.marks.D;
        E = record.marks.E;
        Fx = record.marks.Fx;
        Fn = record.marks.Fn;

        var data = [A, B, C, D, E, Fx, Fn];
        values.push(data);
    });


    data1 = [{
        title: {
            text: years[0],
            position: "top center",
        },
        values: values[0],
        labels: names,
        type: 'pie',
        name: years[0],
        domain: {
            row: 0,
            column: 0,
        },
        hoverinfo: 'label+percent+name',
        textinfo: 'label+percent',
        textposition: "inside",
    }, {
        title: {
            text: years[1],
            position: "top center",
        },
        values: values[1],
        labels: names,
        type: 'pie',
        name: years[1],
        domain: {
            row: 0,
            column: 1,
        },
        hoverinfo: 'label+percent+name',
        textinfo: 'label+percent',
        textposition: "inside",
    }]

    data2 = [{
        title: {
            text: years[2],
            position: "top center",
        },
        values: values[2],
        labels: names,
        type: 'pie',
        name: years[2],
        domain: {
            row: 0,
            column: 0,
        },
        hoverinfo: 'label+percent+name',
        textinfo: 'label+percent',
        textposition: "inside",
    }, {
        title: {
            text: years[3],
            position: "top center",
        },
        values: values[3],
        labels: names,
        type: 'pie',
        name: years[3],
        domain: {
            row: 0,
            column: 1,
        },
        hoverinfo: 'label+percent+name',
        textinfo: 'label+percent',
        textposition: "inside",
    }];
    data3 = [{
        title: {
            text: years[4],
            position: "top center",
        },
        values: values[4],
        labels: names,
        type: 'pie',
        name: years[4],
        domain: {
            row: 0,
            column: 0,
        },
        hoverinfo: 'label+percent+name',
        textinfo: 'label+percent',
        textposition: "inside",
    }, {
        title: {
            text: years[5],
            position: "top center",
        },
        values: values[5],
        labels: names,
        type: 'pie',
        name: years[5],
        domain: {
            row: 0,
            column: 1,
        },
        hoverinfo: 'label+percent+name',
        textinfo: 'label+percent',
        textposition: "inside",
    }];

    var layout = {
        grid: { rows: 1, columns: 2 },
        name: {
            font: { size: 2 }
        },
        showlegend: false

        // margin: { "t": auto, "b": auto, "l": auto, "r": auto }
    };

    var config = {
        responsive: true,

    }





    Plotly.newPlot(resultsGraph, data1, layout, config);
    Plotly.newPlot(resultsGraph2, data2, layout, config);
    Plotly.newPlot(resultsGraph3, data3, layout, config);
}

function drawMyGraph(years, records) {
    var resultsGraph = document.getElementById("my-graph");
    var Fx, Fn, sum;
    var values = [];
    records.forEach(record => {
        Fx = record.marks.Fx;
        Fn = record.marks.Fn;

        sum = Fx + Fn;
        values.push(sum);
    });
    console.log(values)
    data4 = [{
        title: {
            text: "Fx a Fn za jednotlivé roky",
        },
        values: values,
        labels: years,
        type: 'pie',
        // name: years,
        hoverinfo: 'label+percent+name',
        textinfo: 'percent',
        textposition: "outside",
        hole: .5
    }];

    var config = {
        responsive: true,
    }
    var layout = {
        legend: {
            orientation: "h",
            y: -0.2,
            x: 0
        },

    }


    Plotly.newPlot(resultsGraph, data4, layout, config);
}

