
import React, {Component} from 'react';
import * as d3 from 'd3'
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import {isMobile} from 'react-device-detect';

import styles from '../Styles/ProfileVTS.module.css';
import classnames from 'classnames';
import Footer from "../Components/Footer";
import Bouwsteen from "../Components/Bouwsteen";
import Title from "../Components/Title";
import ButtonNext from "../Components/ButtonNext";
import logo_participatief from "../Images/logo_participatief.png"
import logo_afstemmend from "../Images/logo_afstemmend.png"
import logo_begeleidend from "../Images/logo_begeleidend.png"
import logo_verduidelijkend from "../Images/logo_verduidelijkend.png"
import logo_eisend from "../Images/logo_eisend.png"
import logo_dominerend from "../Images/logo_dominerend.png"
import logo_opgevend from "../Images/logo_opgevend.png"
import logo_afwachtend from "../Images/logo_afwachtend.png"
import logo_autonomie from "../Images/logo_autonomie.png"
import logo_structuur from "../Images/logo_structuur.png"
import logo_controle from "../Images/logo_controle.png"
import logo_chaos from "../Images/logo_chaos.png"




export default class ProfileVTS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hoverElement: null,
            hoverValue: '',
            details: false,
            selectedKwadrant: null,
            selectedScore: 0,
            print: false
        };
        this.handleHover = this.handleHover.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleGoBackToProfile = this.handleGoBackToProfile.bind(this);
    }

    handleGoBackToProfile(){
        this.setState({
            details: false,
            selectedBouwsteen: null,
            selectedScore: 0
        })
    }

    handleDownload() {
        this.setState({
                print: true
            },
            function print() {
                window.print()
                this.setState({
                    print: false
                })
            }.bind(this)
        )
    }

    getColor(bouwsteen){
        let colors = {
            'PARTICIPATIEF': '#146094',
            'AFSTEMMEND': '#1E82CA',
            'BEGELEIDEND': '#3BAD4F',
            'VERDUIDELIJKEND': '#257435',
            'EISEND': '#FAB97E',
            'DOMINEREND': '#A85C23',
            'OPGEVEND': '#A52624',
            'AFWACHTEND': '#E96E6A',
            'AUTONOMIE': '#006FB7',
            'STRUCTUUR': '#009639',
            'CONTROLE': '#FF8200',
            'CHAOS': '#E6332A',
        }
        return colors[bouwsteen]
    }

    getLogo(bouwsteen){
        let logos = {
            'PARTICIPATIEF': logo_participatief,
            'AFSTEMMEND': logo_afstemmend,
            'BEGELEIDEND': logo_begeleidend,
            'VERDUIDELIJKEND': logo_verduidelijkend,
            'EISEND': logo_eisend,
            'DOMINEREND': logo_dominerend,
            'OPGEVEND': logo_opgevend,
            'AFWACHTEND': logo_afwachtend,
            'AUTONOMIE': logo_autonomie,
            'STRUCTUUR': logo_structuur,
            'CONTROLE': logo_controle,
            'CHAOS': logo_chaos
        }
        return logos[bouwsteen]
    }

    getDetailsKwadrant(bouwsteen){
        let data = {
            'AUTONOMIE' : "Wanneer je als coach hoog scoort op de autonomie-ondersteunende benadering zullen jouw " +
                "sporters het gevoel hebben dat ze aan de basis liggen van hun eigen gedrag. Je houdt namelijk " +
                "rekening met het perspectief van de sporters, en dit zal hen motiveren. " +
                "Als autonomie-ondersteunende coach betrek je je sporters actief in het denkproces " +
                "en moedig je hen aan om zelf keuzes te maken. Je gaat met hen in dialoog, zodat je beter kan inspelen " +
                "op hun verwachtingen, interesses en noden. Door sporters te betrekken in beslissingen en " +
                "hierover met hen te praten is de kans groter dat ze jouw standpunten als coach ook meer begrijpen " +
                "en er meer draagvlak is voor uiteindelijke beslissingen. " +
                "Let wel, diverse factoren zoals tijdsdruk, groepsgrootte, leeftijd, beperkte voorkennis en/of vaardigheden " +
                "kunnen het bieden van inspraak bemoeilijken. " +
                "Wanneer coaches sporters aanzetten tot zelfstandigheid, " +
                "maar sporters over onvoldoende mogelijkheden beschikken om hiermee goed om te gaan, " +
                "kan dit bijvoorbeeld ook een averechts effect hebben. \n\n" +
                "Dit kan resulteren in chaos waarbij sporters ervaren dat ze alleen of aan hun lot overgelaten worden." +
                "Autonomie-ondersteuning betekent niet dat je alles plots moet overlaten aan jouw sporters. " +
                "Als coach neem je nog steeds heel wat beslissingen en maak je zelf bepaalde keuzes voor jouw sporters. " +
                "Dat sporters in dit geval de coach volgen, betekent niet dat hun motivatie per se zal dalen. " +
                "Autonomie-ondersteunende coaches kunnen opgelegde taken en regels namelijk goed onderbouwen. " +
                "Ze geven een zinvolle uitleg of reden voor zelfgenomen beslissingen, " +
                "zodat sporters weten waarom bepaalde dingen van hen verwacht worden. " +
                "Ook wanneer sporters een afwijkende visie of mening hebben, zal je als afstemmende coach rekening " +
                "houden met hun perspectief. Het feit dat je sporters hun mening laat geven, " +
                "hoeft niet te betekenen dat je akkoord moet gaan met hun standpunten, " +
                "maar het kan wel de basis vormen voor een verhelderend gesprek of extra duiding.",
            'STRUCTUUR': 'Structuur  betekent dat je als coach vooral heel erg duidelijk bent en sporters helpt bij ' +
                'hun ontwikkeling. Door bijvoorbeeld feedback te geven wanneer nodig, door op tijd en stond te helpen, ' +
                'maar ook door ze net voldoende uit te dagen. Je zal er als coach voor zorgen dat je het niveau aanpast' +
                ' aan de mogelijkheden van de sporter. Je biedt uitdagingen die haalbaar maar moeilijk genoeg zijn om ' +
                'hem of haar te prikkelen. Daarnaast geef je als coach uiteraard feedback. Die kan positief zijn, maar' +
                ' is best ook correctief en concreet. Je kan aangeven wat goed is, maar geef zeker ook tips en ' +
                'suggesties van hoe het beter kan. Zo zullen sporters zich kunnen ontwikkeling, waardoor ze zich ' +
                'ook meer bekwaam zullen gaan voelen, wat dan weer motiverend werkt. Je hoeft als coach niet alles ' +
                'voor te kauwen: sporters zelf laten nadenken over wat beter kan, dingen laten ontdekken of ' +
                'oplossingen laten zoeken, zal hun zelfinzicht stimuleren. \n\n' +
                'Je zorgt ook voor houvast: je bent als coach vooral duidelijk naar je sporters en communiceert heel ' +
                'helder jouw verwachtingen. Je biedt als coach zo overzicht op de lange en korte termijn. Laat ' +
                'duidelijk en expliciet weten wat op het terrein verwacht wordt maar ook welke regels en normen ' +
                'er zijn. Op die manier weten sporters wat van hen verwacht wordt en wat ze kunnen doen om een ' +
                'bepaald doel te bereiken. Het is belangrijk om die dingen ook nauwgezet op te volgen en na te gaan ' +
                'of bepaalde verwachtingen ingevuld en doelstellingen behaald worden.',
            'CONTROLE': 'Wanneer je hoog scoort op controle heb je als coach de touwtjes strak in handen, ' +
                'en dat op een dwingende en verplichtende manier. Hierbij staat jouw visie als coach ' +
                'voornamelijk centraal en laat je minder ruimte voor de mening van de sporters. ' +
                'Door te veel en te eenzijdig beroep te doen op deze controlerende stijl, zullen sporters ' +
                'het gevoel krijgen dat ze aan heel wat eisen en verplichtingen moeten voldoen. ' +
                'Dat leidt tot een gevoel van druk bij de sporters, wat er dan weer voor zal zorgen dat sporters op ' +
                'de lange termijn gedemotiveerd zullen zijn. \n\n' +
                'Uiteraard zal elke coach wel eens streng optreden naar zijn sporter, kordaat ingrijpen of sporters ' +
                'tot hun sportieve limiet trachten te pushen. Zulke beperkte vormen van controle zullen, ' +
                'zeker op de korte termijn, niet meteen schade berokkenen bij de sporter. ' +
                'Wees jezelf in de eerste plaats als coach bewust van dit gedrag en probeer hier niet verder in te' +
                ' verglijden. We zien namelijk dat een lang aangehouden, en vooral zeer doorgedreven vormen van ' +
                'controle, niet wenselijk is in functie van de motivatie van sporters. ' +
                'Hierbij denken we dan voornamelijk aan vormen die de sporter als persoon tot het uiterste drijven; ' +
                'onderdrukken van de mening van de sporters, jezelf als coach niet verantwoorden, ' +
                'gebruik maken van machtspositie als coach, persoonlijk aanvallen of ' +
                'geven van gevoelens van schuld of schaamte. Deze categorie van gedragingen worden uiteraard ' +
                'afgeraden om sporters op een duurzame manier te motiveren.',
            'CHAOS': 'Een hoge score op de chaotische stijl betekent dat je als coach heel wat sturing overlaat aan ' +
                'de sporter, maar er onvoldoende structuur is. Dit kan zeer demotiverend werken voor sporters.' +
                ' Chaotische coaches zijn echter onberekenbaar voor sporters en slagen er onvoldoende in om hen ' +
                'te begeleiden en duidelijkheid te scheppen. Vaak helpen ze ook onvoldoende: ze wachten te lang ' +
                'om in te grijpen en gaan ervan uit dat problemen zichzelf zullen oplossen. ' +
                'Er is met andere woorden een gebrek aan houvast, waardoor sporters het gevoel hebben dat ze ' +
                'aan hun lot worden overgelaten. Uiteraard kan je als coach het initiatief soms bewust bij de ' +
                'sporter leggen, om hen zo nieuwe ervaringen op te laten doen. Wees je er echter wel van bewust ' +
                'dat dit enkel zal werken bij een minimum aan sturing én dat in sommige situaties sporters ' +
                'gefrustreerd of verontwaardigd zullen zijn bij té veel vrijheid. \n\n' +
                'Een gebrek aan sturing zal vaak het gevolg zijn van het niet goed aanvoelen van wanneer sporters' +
                ' ondersteuning nodig hebben. Bijgevolg kan chaos zich niet alleen uiten in het gebrek aan ' +
                'structuur maar ook in het overladen van sporters met teveel aan informatie. Te veel of een ' +
                'overdosis aan (tegenstrijdige) informatie en hulp kan frustrerend of beklemmend overkomen ' +
                'voor sporters. Ook hier geldt: overdaad schaadt. Soms geven coaches het ook helemaal op en ' +
                'geven ze een uitgebluste indruk. Ze steken geen energie meer in sporters en reageren onverschillig. ' +
                'Ze laten de zaken op hun beloop en sporters staan er alleen voor. ' +
                'Doordat ze zich niet geholpen voelen in hun leerproces, blijkt zulke chaotische stijl ' +
                'het meest frustrerend voor sporters.'
        }
        let details = data[bouwsteen]
        if (details !== undefined){
            return details
        }
        else{
            return "test"
        }
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
        let autonomie = Math.round(((parseFloat(participatief) + parseFloat(afstemmend)) / 2) *10) / 10
        let structuur =  Math.round(((parseFloat(begeleidend) + parseFloat(verduidelijkend)) / 2) *10) / 10
        let controle =  Math.round(((parseFloat(eisend) + parseFloat(dominerend)) / 2) *10) / 10
        let chaos =  Math.round(((parseFloat(opgevend) + parseFloat(afwachtend)) / 2) *10) / 10


        let data = [
            {"value": autonomie, "number": 90, "name": "AUTONOMIE", "rotate": 45},
            {"value": structuur, "number": 90, "name": "STRUCTUUR", "rotate": -45},
            {"value": controle, "number": 90, "name": "CONTROLE", "rotate": 45},
            {"value": chaos, "number": 90, "name": "CHAOS", "rotate": -45}
        ];

        return data
    }

    checkHover(name) {
        return name === this.state.hoverElement
    }

    handleHover(d) {
        this.setState({
            hoverElement: d.data.name,
            hoverValue: Math.round(d.data.value * 10) / 10
        })
    }

    handleLeave() {
        this.setState({
            hoverElement: null,
            hoverValue: ''
        })
    }

    handleClick(d){
        this.setState({
            details: true,
            selectedKwadrant: d.data.name,
            selectedScore: Math.round(d.data.value * 10) / 10
        })
    }

    calculateLocationLabelOctant(d, maxRadius){
        let middleAngle = (d.startAngle + d.endAngle) / 2
        let x = Math.sin(middleAngle) * maxRadius * 0.8
        let y = -Math.cos(middleAngle) * maxRadius * 0.8
        let translate = "translate(" + x.toString() + "," + y.toString() + ")"
        return translate
    }

    calculateLocationLabelkwadrant(d, maxRadius){
        let middleAngle = (d.startAngle + d.endAngle) / 2
        let x = Math.sin(middleAngle) * maxRadius * 0.9
        let y = -Math.cos(middleAngle) * maxRadius * 0.9
        let translate = "translate(" + x.toString() + "," + y.toString() + ")rotate(" + d.data.rotate + ")"
        return translate
    }

    renderTaskInfo() {
        if (isMobile) {
            return "Klik op een zone voor meer info"
        }
        else{
            return "Beweeg over een zone voor jouw score en klik op een zone voor meer informatie"
        }
    }

    renderKwadrantLabel(d, print){
        if (isMobile || print) {
            return Math.round(d.data.value * 10) / 10
        }
        else{
            return null
        }
    }

    renderProfileHTML(data, width, height, print){
        let maxRadiusTotal = Math.min(width, height) / 2 - 1;
        let widthSVG = 2 * maxRadiusTotal + 10;
        let heightSVG = 2 * maxRadiusTotal + 10;
        let innerRadius = maxRadiusTotal * 0.15;
        let maxRadius = 0.8 * maxRadiusTotal
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

        let arcKwadrant = d3.arc()
            .innerRadius(maxRadius)
            .outerRadius(maxRadiusTotal)

        const pie = d3Pie()
            .sort(null)
            .value(function (d) {
                return d.number;
            });

        const dataPie = pie(data);
        let styleOuter = classnames(styles.styleOuter);
        let styleArc = classnames(styles.styleArc);
        let styleArcHover = classnames(styles.styleArcHover);
        let styleText = classnames(styles.styleText);
        let styleContainer = classnames(styles.styleContainer);
        let styleContainerProfile = classnames(styles.styleContainerProfile);
        let styleLabel = classnames(styles.styleLabel)
        let styleArcKwadrant = classnames(styles.styleArcKwadrant)
        let styleLabelKwadrant = classnames(styles.styleLabelKwadrant)
        let styleTitle = classnames(styles.title)
        return (
            <>
                <div
                    className={styleContainerProfile}
                >
                    {print ?
                        <h1 className={styleTitle}>Persoonlijk Coachprofiel</h1>
                        :
                        <Title title={"Persoonlijk Coachprofiel"}/>
                    }
                    <p>{this.renderTaskInfo()}</p>
                    <svg
                        id="svgProfile"
                        width={widthSVG}
                        height={heightSVG}>
                        <text
                            transform={`translate(${widthSVG / 2}, ${(heightSVG / 2) + (fontSize / 2.2)})`}
                            className={styleText}
                            style={{fontSize: fontSize}}
                        >
                            {this.state.hoverValue}
                        </text>
                        {/*The inner pie*/}
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
                                            onMouseOver={() => this.handleHover(d)}
                                            onMouseLeave={() => this.handleLeave()}
                                            onMouseDown={()=> this.handleClick(d)}
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
                                            fill={this.getColor(d.data.name)}
                                            key={d.index + "arcPath"}
                                            id={d.index + "arcPath"}
                                            onMouseOver={() => this.handleHover(d)}
                                            onMouseLeave={() => this.handleLeave()}
                                            onMouseDown={()=> this.handleClick(d)}

                                        />
                                    </g>
                                </>
                            ))}
                        </g>
                        The labels
                        <g transform={`translate(${widthSVG / 2}, ${(heightSVG / 2)} )`}>
                            {dataPie.map(d => (
                                <text
                                    transform={this.calculateLocationLabelOctant(d, maxRadius)}
                                    className={styleLabel}
                                    onMouseOver={() => this.handleHover(d)}
                                    onMouseLeave={() => this.handleLeave()}
                                    onMouseDown={()=> this.handleClick(d)}
                                    key={d.index + "labelOctant"}
                                    id={d.index + "labelOctant"}
                                >{this.renderKwadrantLabel(d, print)}</text>
                            ))}
                        </g>
                        {/*The outer donut pie*/}
                        <g transform={`translate(${widthSVG / 2}, ${(heightSVG / 2)} )`}>
                            {dataPie.map(dp => (
                                <>
                                    <g
                                        className="arcKwadrant"
                                        key={dp.index + "arcOuterKwadrant"}
                                        id={dp.index + "arcOuterKwadrant"}
                                    >
                                        <path
                                            d={arcKwadrant(dp)}
                                            className={styleArcKwadrant}
                                            key={dp.index + "arcKwadrantPath"}
                                            id={dp.index + "arcKwadrantPath"}
                                            fill={this.getColor(dp.data.name)}
                                        />
                                    </g>
                                    <text
                                        transform={this.calculateLocationLabelkwadrant(dp, maxRadiusTotal)}
                                        className={styleLabelKwadrant}
                                        key={dp.index + "labelKwadrant"}
                                        id={dp.index + "labelKwadrant"}

                                    >{dp.data.name}</text>
                                </>
                            ))}
                        </g>
                    </svg>
                </div>

            </>)
    }

    renderProfile() {
        let data = this.createData();
        let width = window.screen.availWidth;
        let height = window.screen.availHeight * 0.6;
        return this.renderProfileHTML(data, width, height, false)
    }

    renderDetails(){
        let kwadrant = this.state.selectedKwadrant
        let score = this.state.selectedScore
        let details = this.getDetailsKwadrant(kwadrant)
        let color = this.getColor(kwadrant)
        let logo = this.getLogo(kwadrant)
        return(
            <Bouwsteen
                name={kwadrant}
                content={details}
                handleGoBackToProfile={this.handleGoBackToProfile}
                color={color}
                score={score}
                logo={logo}
            />
        )

    }

    renderDetailsPrint(){
        let data = this.createData();


        return(
            <>
                <Bouwsteen
                    name={"AUTONOMIE"}
                    content={this.getDetailsKwadrant("AUTONOMIE")}
                    color={this.getColor("AUTONOMIE")}
                    score={data[0].value}
                    print={true}
                    logo={this.getLogo("AUTONOMIE")}
                    pagebreak={true}
                />
                <Bouwsteen
                    name={"STRUCTUUR"}
                    content={this.getDetailsKwadrant("STRUCTUUR")}
                    color={this.getColor("STRUCTUUR")}
                    score={data[1].value}
                    print={true}
                    logo={this.getLogo("STRUCTUUR")}
                    pagebreak={false}

                />

                <Bouwsteen
                    name={"CONTROLE"}
                    content={this.getDetailsKwadrant("CONTROLE")}
                    color={this.getColor("CONTROLE")}
                    score={data[2].value}
                    print={true}
                    logo={this.getLogo("CONTROLE")}
                    pagebreak={true}

                />
                <Bouwsteen
                    name={"CHAOS"}
                    content={this.getDetailsKwadrant("CHAOS")}
                    color={this.getColor("CHAOS")}
                    score={data[3].value}
                    print={true}
                    logo={this.getLogo("CHAOS")}
                    pagebreak={false}

                />
            </>
        )
    }

    renderProfilePrint() {
        let data = this.createData();
        let width = 640;
        let height = 640;
        return this.renderProfileHTML(data, width, height, true)
    }

    renderPrint(){
        return(
            <>
                {this.renderProfilePrint()}
                {this.renderDetailsPrint()}
            </>
        )
    }

    getRenderFunction(){
        if (this.state.print){
            return this.renderPrint()
        }
        else{
            if (this.state.details){
                return this.renderDetails()
            }
            else{
                return this.renderProfile()
            }
        }
    }

    render() {
        let styleButtonContainer = classnames(styles.styleButtonContainer);
        let hidePrintbutton = false
        if (this.state.details || isMobile){
            hidePrintbutton = true
        }
        return (
            <>
                {this.getRenderFunction()}
                {hidePrintbutton ? <div/> :
                    <div className={styleButtonContainer}>
                        <ButtonNext id="printbutton"  handleClick={this.handleDownload} displayName={"Opslaan / Print"}  />
                    </div>
                }
                <Footer/>
            </>
        )
    }
}