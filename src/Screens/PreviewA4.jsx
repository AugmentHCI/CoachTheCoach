
import React, {Component} from 'react';
import * as d3 from 'd3'
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import styles from '../Styles/PreviewA4.module.css';
import classnames from 'classnames';
import Footer from "../Components/Footer";
import Title from "../Components/Title";



export default class ProfileA4 extends Component {
    constructor(props) {
        super(props)


        this.handleDownload = this.handleDownload.bind(this)
    }

    handleDownload(){
        window.print()
    }
    getColor(bouwsteen){
        let colors = {
            'Participatief': '#146094',
            'Afstemmend': '#1E82CA',
            'Begeleidend': '#3BAD4F',
            'Verduidelijkend': '#257435',
            'Eisend': '#FAB97E',
            'Dominerend': '#A85C23',
            'Opgevend': '#A52624',
            'Afwachtend': '#E96E6A',
            'Autonomie': '#006FB7',
            'Structuur': '#009639',
            'Controle': '#FF8200',
            'Chaos': '#E6332A',
        }
        return colors[bouwsteen]
    }


    createData() {
        let participatief = localStorage.getItem('participatief');
        let afstemmend = localStorage.getItem('afstemmend');
        let begeleidend = localStorage.getItem('begeleidend');
        let verduidelijkend = localStorage.getItem('verduidelijkend');
        let eisend = localStorage.getItem('eisend');
        let dominerend = localStorage.getItem('dominerend');
        let opgevend = localStorage.getItem('opgevend');
        let afwachtend = localStorage.getItem('afwachtend');


        let data = [
            {"value": participatief, "number": 45, "name": "Participatief"},
            {"value": afstemmend, "number": 45, "name": "Afstemmend"},
            {"value": begeleidend, "number": 45, "name": "Begeleidend"},
            {"value": verduidelijkend, "number": 45, "name": "Verduidelijkend"},
            {"value": eisend, "number": 45, "name": "Eisend"},
            {"value": dominerend, "number": 45, "name": "Dominerend"},
            {"value": opgevend, "number": 45, "name": "Opgevend"},
            {"value": afwachtend, "number": 45, "name": "Afwachtend"},
        ];

        return data
    }

    createDataKwadrant(){
        return  [
            { "number": 90, "name": "Autonomie", "rotate": 45},
            { "number": 90, "name": "Structuur","rotate": -45},
            { "number": 90, "name": "Controle","rotate": 45},
            { "number": 90, "name": "Chaos","rotate": -45}
        ];
    }

    calculateLocationLabelOctant(d, maxRadius){
        let middleAngle = (d.startAngle + d.endAngle) / 2
        let x = Math.sin(middleAngle) * maxRadius * 0.6
        let y = -Math.cos(middleAngle) * maxRadius * 0.6
        let translate = "translate(" + x.toString() + "," + y.toString() + ")"
        return translate
    }

    calculateLocationLabelkwadrant(d, maxRadius){
        let middleAngle = (d.startAngle + d.endAngle) / 2
        let x = Math.sin(middleAngle) * maxRadius * 0.95
        let y = -Math.cos(middleAngle) * maxRadius * 0.95
        let translate = "translate(" + x.toString() + "," + y.toString() + ") rotate(" + d.data.rotate + ")"
        return translate
    }

    renderProfileA4() {
        let data = this.createData();
        let dataKwadrant = this.createDataKwadrant()
        let width = 450;
        let height = 450;

        const color = d3.scaleOrdinal().range([
            '#146094',
            '#1E82CA',
            '#3BAD4F',
            '#257435',
            '#FAB97E',
            '#A85C23',
            '#A52624',
            '#E96E6A',

        ]);

        let maxRadiusTotal = Math.min(width, height) / 2 - 1;
        let widthSVG = 2 * maxRadiusTotal + 10;
        let heightSVG = 2 * maxRadiusTotal + 10;
        let innerRadius = maxRadiusTotal * 0.15;
        let maxRadius = 0.88 * maxRadiusTotal
        let fontSize = innerRadius / 1.2
        let radius = d3.scaleLinear()
            .domain([0, 7])
            .range([innerRadius, maxRadius]);


        let arc = d3Arc()
            .innerRadius(innerRadius)
            .outerRadius(function (d) {
                return radius(Math.round(d.data.value * 10) / 10)
            });

        let arcOuter = d3Arc()
            .innerRadius(innerRadius)
            .outerRadius(maxRadius);

        let arcKwadrant = d3Arc()
            .innerRadius(maxRadius)
            .outerRadius(maxRadiusTotal);

        const pie = d3Pie()
            .sort(null)
            .value(function (d) {
                return d.number;
            });

        const dataPie = pie(data);
        const dataPieKwadrant = pie(dataKwadrant)
        let styleOuter = classnames(styles.styleOuter);
        let styleArc = classnames(styles.styleArc);
        let styleArcHover = classnames(styles.styleArcHover);
        let styleText = classnames(styles.styleText);
        let styleContainer = classnames(styles.styleContainer);
        let styleContainerProfile = classnames(styles.styleContainerProfile);
        let styleLabel = classnames(styles.styleLabel)
        let styleLabelKwadrant = classnames(styles.styleLabelKwadrant)


        return (
            <>
                <div
                    id="ProfileContainer"
                    className={styleContainer}
                >
                    <div
                        className={styleContainerProfile}
                    >
                        <h1>Persoonlijk Coach profiel</h1>
                        <svg
                            id="svgProfileA4"
                            width={widthSVG}
                            height={heightSVG}>
                            <g transform={`translate(${widthSVG / 2}, ${(heightSVG / 2)} )`}>
                                {dataPie.map(d => (
                                    <>
                                        <g
                                            className="arcOuter"
                                            key={d.index + "arcOuter"}
                                            id={d.index + "arcOuter"}
                                        >
                                            <path
                                                d={arcOuter(d)}
                                                className={styleOuter}
                                                key={d.index + "arcOuterPath"}
                                            />
                                        </g>
                                        <g
                                            className="arc"
                                            pointerEvents="all"
                                            key={d.index + "arcPathGroup"}
                                            id={d.index + "arc"}
                                        >
                                            <path
                                                d={arc(d)}
                                                className={styleArc}
                                                fill={color(d.data.name)}
                                                key={d.index + "arcPath"}
                                                id={d.index + "arcPath"}

                                            />
                                        </g>
                                    </>
                                ))}
                            </g>
                            <g transform={`translate(${widthSVG / 2}, ${(heightSVG / 2)} )`}>
                                {dataPie.map(d => (
                                    <text
                                        transform={this.calculateLocationLabelOctant(d, maxRadius)}
                                        className={styleLabel}
                                    >{d.data.name + ": " + Math.round(d.data.value * 10) / 10}</text>
                                ))}
                            </g>
                            <g transform={`translate(${widthSVG / 2}, ${(heightSVG / 2)} )`}>
                                {dataPieKwadrant.map(d => (
                                    <>
                                        <g
                                            className="arcKwadrant"
                                            key={d.index + "arcOuter"}
                                            id={d.index + "arcOuter"}
                                        >
                                            <path
                                                d={arcKwadrant(d)}
                                                className={styleArc}
                                                key={d.index + "arcKwadrantPath"}
                                                fill={this.getColor(d.data.name)}
                                            />
                                        </g>
                                        <text
                                            transform={this.calculateLocationLabelkwadrant(d, maxRadiusTotal)}
                                            className={styleLabelKwadrant}
                                        >{d.data.name}</text>

                                    </>
                                ))}
                            </g>
                        </svg>
                    </div>

                </div>
            </>)
    }

    svg2png(){
        // https://mybyways.com/blog/convert-svg-to-png-using-your-browser
        let svg = document.getElementById('svgProfileA4')
        let canvas = document.getElementById('canvas')
        canvas.width = 400;
        canvas.height = 400;
        let data = new XMLSerializer().serializeToString(svg);
        let win = window.URL || window.webkitURL || window;
        let img = new Image();
        let blob = new Blob([data], { type: 'image/svg+xml' });
        let url = win.createObjectURL(blob);
        img.onload = function () {
            canvas.getContext('2d').drawImage(img, 0, 0);
            win.revokeObjectURL(url);
            let uri = canvas.toDataURL('image/png').replace('image/png', 'octet/stream');
            let a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = uri
            a.download = (svg.id || svg.svg.getAttribute('name') || svg.getAttribute('aria-label') || 'untitled') + '.png';
            a.click();
            window.URL.revokeObjectURL(uri);
            document.body.removeChild(a);
        };
        img.src = url;

    }

    render(){

        return(
            <>
                {this.renderProfileA4()}
                <canvas id="canvas"></canvas>
                <button id="printbutton" onClick={this.handleDownload}>"print"</button>
                <Footer/>

            </>
        )
    }
}