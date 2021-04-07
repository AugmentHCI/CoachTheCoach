
import React, {Component} from 'react';
import * as d3 from 'd3'
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import styles from '../Styles/PreviewA4.module.css';
import classnames from 'classnames';
import Footer from "../Components/Footer";



export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hoverElement: null,
            hoverValue: ''
        };
        this.handleHover = this.handleHover.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleDownload = this.handleDownload.bind(this)
    }

    handleDownload(){
        window.print()
    }

    createTitle(){
        if (this.state.hoverElement !== null){
            return this.state.hoverElement + ':' + this.state.hoverValue
        }
        else{
            return "Your profile"
        }
    }


    createData(){
        let participatief = localStorage.getItem('participatief');
        let afstemmend = localStorage.getItem('afstemmend');
        let begeleidend = localStorage.getItem('begeleidend');
        let verduidelijkend = localStorage.getItem('verduidelijkend');
        let eisend = localStorage.getItem('eisend');
        let dominerend = localStorage.getItem('dominerend');
        let opgevend = localStorage.getItem('opgevend');
        let afwachtend = localStorage.getItem('afwachtend');



        let data = [
            {"value": participatief, "number": 45 , "name": "Participatief"},
            {"value": afstemmend, "number": 45 , "name": "Afstemmend"},
            {"value": begeleidend, "number": 45 , "name": "Begeleidend"},
            {"value": verduidelijkend, "number": 45 , "name": "Verduidelijkend"},
            {"value": eisend, "number": 45 , "name": "Eisend"},
            {"value": dominerend, "number": 45 , "name": "Dominerend"},
            {"value": opgevend, "number": 45 , "name": "Opgevend"},
            {"value": afwachtend, "number": 45 , "name": "Afwachtend"},
        ];

        return data
    }

    checkHover(name){
        return name === this.state.hoverElement
    }

    handleHover(d){
        this.setState({
            hoverElement: d.data.name,
            hoverValue: Math.round(d.data.value * 10) / 10
        })
    }

    handleLeave(){
        this.setState({
            hoverElement: null,
            hoverValue: ''
        })
    }

    render(){
        let data = this.createData();
        let width = 400;
        let height = 400;

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

        let maxRadius = Math.min(width, height) / 2 - 1;
        let widthSVG = 2*maxRadius + 10;
        let heightSVG = 2*maxRadius + 10;
        let innerRadius = maxRadius * 0.15;
        let fontSize = innerRadius / 1.2
        let radius = d3.scaleLinear()
            .domain([0,7])
            .range([innerRadius,maxRadius]);


        let arc = d3Arc()
            .innerRadius(innerRadius)
            .outerRadius(function (d) {
                return radius(Math.round(d.data.value * 10) / 10)
            });

        let arcOuter = d3Arc()
            .innerRadius(innerRadius)
            .outerRadius(maxRadius);

        const pie = d3Pie()
            .sort(null)
            .value(function(d) {
                return d.number;
            });

        const dataPie = pie(data);

        let styleOuter = classnames(styles.styleOuter);
        let styleArc = classnames(styles.styleArc);
        let styleArcHover = classnames(styles.styleArcHover);
        let styleText = classnames(styles.styleText);
        let styleContainer = classnames(styles.styleContainer);
        let styleContainerProfile = classnames(styles.styleContainerProfile);
        let styleContainerText = classnames(styles.styleContainerText);
        let styleButton = classnames(styles.styleButton)

        return(
            <>
                <h1
                    id='printtitle'
                >
                    Download preview
                </h1>
                <div
                    id="ProfileContainer"
                    className={styleContainer}
                >
                    <div
                        className={styleContainerProfile}
                    >
                        <h1>{this.createTitle()}  </h1>
                        <svg
                            id="svgProfile"
                            width={widthSVG}
                            height={heightSVG}>
                            <text
                                transform={`translate(${widthSVG / 2}, ${(heightSVG / 2) + (fontSize/2.2)})`}
                                className={styleText}
                                style={{fontSize: fontSize}}

                            >
                                {this.state.hoverValue}
                            </text>
                            <g transform={`translate(${widthSVG / 2}, ${(heightSVG / 2) } )`}>
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
                                                onMouseOver={() => this.handleHover(d)}
                                                onMouseLeave={() => this.handleLeave()}
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
                                                className={this.checkHover(d.data.name) ? styleArcHover : styleArc}
                                                fill={color(d.data.name)}
                                                key={d.index + "arcPath"}
                                                id={d.index + "arcPath"}
                                                onMouseOver={() => this.handleHover(d)}
                                                onMouseLeave={() => this.handleLeave()}
                                            />
                                        </g>

                                    </>
                                ))}
                            </g>
                        </svg>
                    </div>
                    <div
                        className={styleContainerText}
                    >
                        <h1>Details</h1>
                        <ul>
                            <li>Participatief: {Math.round(data[0].value * 10) / 10}</li>
                            <li>Afstemmend: {Math.round(data[1].value * 10) / 10}</li>
                            <li>Begeleidend: {Math.round(data[2].value * 10) / 10}</li>
                            <li>Verduidelijkend: {Math.round(data[3].value * 10) / 10}</li>
                            <li>Eisend: {Math.round(data[4].value * 10) / 10}</li>
                            <li>Dominerend: {Math.round(data[5].value * 10) / 10}</li>
                            <li>Opgevend: {Math.round(data[6].value * 10) / 10}</li>
                            <li>Afwachtend: {Math.round(data[7].value * 10) / 10}</li>
                        </ul>
                    </div>

                </div>
                <button
                    id="printbutton"
                    className={styleButton}
                    onClick={this.handleDownload}>Download</button>
                <Footer/>

            </>
        )
    }
}