
import React, {Component} from 'react';
import * as d3 from 'd3'
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import {isMobile} from 'react-device-detect';

import styles from '../Styles/Profile.module.css';
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



export default class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hoverElement: null,
			hoverValue: '',
			details: false,
			selectedBouwsteen: null,
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

	getLogo(bouwsteen){
		let logos = {
			'Participatief': logo_participatief,
			'Afstemmend': logo_afstemmend,
			'Begeleidend': logo_begeleidend,
			'Verduidelijkend': logo_verduidelijkend,
			'Eisend': logo_eisend,
			'Dominerend': logo_dominerend,
			'Opgevend': logo_opgevend,
			'Afwachtend': logo_afwachtend,
		}
		return logos[bouwsteen]
	}

	getDetailsBouwsteen(bouwsteen){
		let data = {
			'Participatief' : "Wanneer je als coach hoog scoort op de participatieve benadering zullen jouw sporters " +
				"het gevoel hebben dat ze aan de basis liggen van hun eigen gedrag, wat dan weer hun motivatie ten " +
				"goede komt. Door sporters te betrekken in beslissingen en hierover met hen te praten creëer je " +
				"draagvlak en gaan sporters dus ook op een meer vrijwillige manier gemotiveerd zijn. Je kan als coach" +
				" in dialoog te gaan met de sporters, initiatief geven, en door ze toelaten om input te geven. " +
				"Let wel, diverse factoren zoals tijdsdruk, groepsgrootte, leeftijd, beperkte voorkennis en/of " +
				"vaardigheden kunnen het gebruik van een participatieve benadering bemoeilijken. \n\n" +
				"De participatieve benadering is geen wondermiddel om de motivatie te bevorderen. Er zijn namelijk " +
				"ook valkuilen: Wanneer coaches sporters aanzetten tot zelfstandigheid, maar sporters over onvoldoende" +
				" mogelijkheden beschikken om hiermee goed om te gaan, kan dit een averechts effect hebben. Dit kan" +
				" resulteren in chaos waarbij sporters ervaren dat ze alleen of aan hun lot overgelaten worden. " +
				"Bovendien kan zo maar iedereen keuzevrijheid geven in groepen ook zorgen voor onrealistische " +
				"verwachtingen. In zo’n situatie is het namelijk heel moeilijk om met de keuze van iedere sporter " +
				"rekening houden. \n\n" +
				"Verder willen sporters soms ook gewoon kunnen terugvallen op hun coach voor raad, advies of " +
				"oplossingen. Dat ze de coach in dit geval volgen, betekent niet dat hun motivatie per se " +
				"zal dalen. Ze kiezen op vrijwillige basis kiezen om beroep te doen op de coach. Dit hoeft uiteraard " +
				"niet te betekenen dat in een volgende stap van de ontwikkeling – wanneer ze meer kennis en vaardigheden " +
				"hebben ontwikkeld - sporters niet zelf meer initiatief  zouden kunnen nemen.",
			'Afstemmend': "Een afstemmende benadering zorgt ervoor dat sporters het gevoel hebben dat er rekening " +
				"wordt gehouden met hun perspectief en natuurlijk ontwikkelingsritme. Hierdoor verhoogt de bereidheid " +
				"en de vrijwillige motivatie van sporters om zich in te zetten. Als coach kan je zorgen voor een " +
				"maximale aansluiting bij de persoonlijke ontwikkeling en het perspectief van de sporters door het " +
				"tempo van de sporter te respecteren. Hierdoor gaat de sporter het gevoel hebben dat er rekening " +
				"wordt gehouden met zijn persoonlijke ontwikkeling en zal hij/zij opnieuw op een meer vrijwillige " +
				"manier gemotiveerd zijn.\n" +
				"\n" +
				"Daarnaast kan je als coach weerstand of frustratie van sporter erkennen. Je respecteert en luistert " +
				"eventueel naar de mening van de sporter, en gaat hier als coach mee aan de slag. Dit betekent " +
				"uiteraard niet dat je er mee akkoord dient te gaan. Afstemmen betekent immers ook het geven van " +
				"een betekenisvolle uitleg voor de verwachtingen die je als coach hebt en de beslissingen die je " +
				"neemt. Het is namelijk niet realistisch om over alles inbreng toe te staan. Daarom is het cruciaal " +
				"voor coaches om voldoende onderbouw te geven aan gemaakte keuzes, beslissingen en opgedragen " +
				"opdrachten. Coaches die erin slagen een concrete en zinvolle uitleg af te stemmen op de situatie en " +
				"aansluiting vinden bij de persoonlijke doelen van de sporters vergroten de kans dat atleten zich " +
				"kunnen vinden in de beslissingen of opdrachten. Dit creëert dan weer draagvlak en zal de bereidheid " +
				"van sporters om zich in te zetten versterken. \n",
			'Begeleidend': 'Een begeleidende benadering betekent dat je als coach een procesgerichte houding aanneemt ' +
				'door gepaste hulp en begeleiding te geven aan je sporters tijdens hun ontwikkelingsproces. Door middel ' +
				'van deze hulp en begeleiding weten sporters wat goed gaat, hoe ze nog kunnen verbeteren en kunnen ze ' +
				'progressie maken. Dit zal helpen om een gevoel van competentie te ervaren, wat op zijn beurt bijdraagt ' +
				'tot de motivatie, engagement en doorzettingsvermogen van sporters. Deze hulp kan diverse vormen ' +
				'aannemen gaande van materiële hulpmiddelen (bv. zwemgordels), fysieke hulmiddelen (bv. begeleiden ' +
				'van beweging in gymnastiek), tot procesgerichte, correctieve feedback. Je hoeft als coach niet alles ' +
				'voor te kauwen. Via een leergesprek sporters laten reflecteren over wat nog verbeterd kan worden, zal ' +
				'hun zelfinzicht en zelfontplooiing ten goede zal komen. \n' +
				'\n' +
				'Je dient als coach een moeilijk evenwicht te vinden tussen opdrachten die haalbaar zijn, maar toch v' +
				'oldoende uitdaging bieden. Je dient dus oefenstof te voorzien op maat van de sporter. Het gevaar ' +
				'bestaat erin dat coaches teveel hulp bieden bij een relatief makkelijke opdracht, wat eerder zal ' +
				'leiden tot frustratie bij de sporters. Het omgekeerde, te weinig hulp bij een te moeilijke opdracht, ' +
				'zal evenwel ook leiden tot een laag competentiegevoel. Passende hulp bieden is dus moeilijker dan op ' +
				'het eerste zich zou lijken. In die zin wordt een begeleidende benadering dan ook bij voorkeur ' +
				'gecombineerd met een afstemmende benadering. Als coach dien je namelijk goed in te schatten welke ' +
				'en hoeveel hulp een sporter op een bepaald ogenblik nodig heeft. \n',
			'Verduidelijkend': 'Wanneer je als coach hoog scoort op de verduidelijkende benadering betekent dat dat ' +
				'je sporters ondersteunt door ze een duidelijke structuur mee te geven. Deze structuur biedt een ' +
				'houvast voor de sporters, zodat ze weten wat er van hen verwacht wordt en welke afspraken er gemaakt ' +
				'zijn. In een eerste plaats helpt het om een overzicht (bv. indeling van trainingsmaand) te geven met' +
				'tussenstappen of –doelen zodat sporters het grotere plaatje zien en specifieke verwachtingen ook ' +
				'beter kunnen plaatsen. Daarnaast zal je als verduidelijkende coach duidelijke verwachtingen, ' +
				'afspraken en opdrachten communiceren naar je sporters. Dit gaat niet enkel over duidelijke ' +
				'sporttechnische of –tactische zaken, maar even goed over normen en regels. Als het voor sporters ' +
				'duidelijk is wat de coach voor ogen heeft, kunnen zij hun focus beter richten en prikkelt/motiveert ' +
				'dit hen om een inspanning te leveren. Om tot een duidelijke en volgbare structuur te komen is het ' +
				'belangrijk dat al deze verwachtingen en afspraken ook consequent opgevolgd worden\n' +
				'\n' +
				'Als coach dien je er evenwel op toe te zien dat je niet verzandt in een  te rigide aanpak. ' +
				'Deze kan er namelijk voor zorgen dat sporters te afhankelijk worden van de coach en de autonomie, ' +
				'creativiteit en initiatief van de sporters ondermijnd wordt. Zo is de valkuil van een verduidelijkende ' +
				'benadering een coach die te sterk van bovenaf eenzijdig zaken zal opleggen zonder hierbij de ' +
				'relevantie, bedoeling of het nut ervan te duiden enerzijds, of anderszijds onvoldoende af te' +
				' stemmen op het ontwikkelingsritme, de noden en mogelijkheden van zijn sporters. \n',
			'Eisend': 'Bij eisende of dwingende benadering staat de beleving en visie van de coach centraal. Als coach' +
				' heb je dan ook graag zelf de touwtjes in handen en stuur je sporters in een richting die, volgens jou' +
				', de juiste is. Vanuit dit idee legt een eisende coach hoge standaarden op en eist hij/zij sporters ' +
				'aan deze standaarden te voldoen. Bij eisende coaches ligt de nadruk op het opvolgen en voldoen aan ' +
				'de vooropgestelde verwachtingen en opdrachten, die in de ogen van de coach leiden tot een maximale ' +
				'progressie en prestatie. Wanneer coaches dus eenzijdig beroep doen op deze benadering zullen atleten ' +
				'voortdurend het gevoel hebben dat ze aan heel wat eisen moeten voldoen of alleen maar dingen moeten ' +
				'doen die hen opgelegd worden.\n' +
				'\n' +
				'Hoewel een eisende benadering er wel voor zorgt dat coaches heel wat gedaan krijgen van hun ' +
				'sporters op korte termijn, is er een gebrek aan duurzame motivatie en dus minder positieve effecten ' +
				'op langere termijn. Coaches die van nature uit graag een meer sturende rol opnemen en zich vooral ' +
				'eisend gedragen wordt aangeraden om dit te combineren met een structurerende of ' +
				'autonomie-ondersteunend stijl. Dit kan door gebruik te maken van meer verduidelijkende ' +
				'strategieën (cf. verduidelijkende benadering) of door op voldoende momenten zaken af te stemmen op ' +
				'de noden, mogelijkheden en het ontwikkelingsritme van de sporter (cf. afstemmende benadering). ' +
				'Meer nog, uit onderzoek blijkt dat de combinatie van een eisende benadering en een afstemmende ' +
				'benadering door sporters niet per se als negatief ervaren wordt, wel integendeel. Wanneer je ' +
				'voldoende duiding geeft over jouw aanpak of beslissingen en sporters voldoende uitlegt over het ' +
				'waarom dat ze bepaalde opdrachten dienen uit te voeren, zal je een stevig draagvlak creëren voor ' +
				'jouw werkwijze. Dit zorgt ervoor dat eisend gedrag op bepaalde momenten meer aanvaard of begrepen ' +
				'kan worden en sporters gemotiveerd zullen zijn of blijven.\n',
			'Dominerend': 'Een hoge score op de dominerende benadering betekent dat je als coach vooral bezig bent ' +
				'met je eigen agenda en ambities als coach, zonder daarbij rekening te houden met het perspectief ' +
				'van de sporter. Wanneer iets mis gaat, lopen dominerende coaches het risico hun frustratie te ' +
				'reflecteren op de sporter. Vanuit deze frustratie worden sporter binnen de dominerende benadering ' +
				'eerder persoonlijk aangevallen of schuld- en schaamtegevoelens gegeven. Bij tegenspraak raak je als ' +
				'dominerende coach sneller geïrriteerd en ervaar je dit als een aanval op jouw (machts)positie als' +
				' coach.\n' +
				'\n' +
				'Het hoeft weinig betoog dat een dominerende benadering sporters niet ten goede komt. Ze gaan ' +
				'zelden plezier of vrijwilligheid ervaren en gaan ook weinig succeservaring beleven. Meer nog, ' +
				'sporters gaan problematisch functioneren, uit angst om te voldoen aan de verwachtingen van de coach. ' +
				'Dit kan zo ver gaan dat sporters immoreel gedrag zullen vertonen onder de vorm van onsportief gedrag ' +
				'of valsspelen. Wanneer ze hun coach veelvuldig als dominerend ervaren, zal dit in verdere stadia ' +
				'leiden tot angst, stress of zelfs opgeven (drop-out). Het is menselijk dat coaches soms emotioneel ' +
				'reageren en daardoor hun kalmte weleens verliezen. Wees daarvan bewust en zorg dat je bij veelvuldig ' +
				'gebruik van deze aanpak meer tracht te denken vanuit de leefwereld van de sporter. In plaats van een ' +
				'focus op resultaat wordt de progressie en persoonlijke ontwikkeling van de sporter centraal geplaatst. ' +
				'Binnen deze meer procesgerichte aanpak, waar de aandacht gaat naar de taak die ze uitvoeren en het ' +
				'gedrag dat ze daarbij vertonen, kan prestatie evenwel een lange termijn doel (lees: gevolg) zijn. ' +
				'Een te enge focus op die prestatie zal echter niet alleen jouw sporters een benauwd gevoel geven, ' +
				'maar jezelf ook sturen richting een bemoeizuchtige, dominerende aanpak.\n',
			'Opgevend': 'Een hoge score op de opgevende benadering betekent dat je als coach een negatieve, ' +
				'uitgebluste en/of onverschillige houding aanneemt ten opzichte van jouw sporters. Coaches die een ' +
				'opgevende houding aannemen gaan na herhaaldelijke tussenkomsten de zaken op hun beloop laten. Ze ' +
				'gaan de sporter niet of nauwelijks bijstaan in hun leerproces en indien ze actie ondernemen, focussen ' +
				'ze vooral op wat fout kan gaan. Enerzijds door op voorhand te waarschuwen voor alle zaken die fout ' +
				'kunnen gaan of niet mogen gebeuren, of anderzijds door achteraf enkel aan te geven wat misliep ' +
				'(negatieve feedback) in plaats van hulp of strategieën aan te reiken om zaken te verbeteren of te ' +
				'leren uit de fouten. \n' +
				'\n' +
				'De sporter wordt met andere woorden niet geholpen in het leerproces, wat hun gevoelens van ' +
				'competentie danig ondermijnt. Op die manier worden faalangstige sporters gecreëerd die het ' +
				'tegenovergestelde doen van wat een opgevende coach lijkt te wensen; namelijk atleten die zelfstandig ' +
				'problemen zullen oplossen. Aangezien ze niet weten wat van hen verwacht wordt of hoe zij zichzelf' +
				' kunnen verbeteren, voelen ze zich aan hun lot overgelaten en zullen ze net een gebrek aan vertrouwen ' +
				'tonen om initiatief te ondernemen. Sporters hebben het gevoel dat de coach niet beschikbaar is op het' +
				' moment dat ze hem nodig hebben, hetgeen gevoelens van frustratie en kwaadheid uitlokt. Uit onderzoek' +
				' is gebleken dat een opgevende benadering als meest frustrerend wordt ervaren door sporters. Daar waar' +
				' een coach bij een dominerende of eisende benadering nog enige vorm van betrokkenheid toont, voelen' +
				' sporters zich in de steek gelaten bij een opgevende aanpak.\n',
			'Afwachtend': 'Coaches die hoog scoren op een afwachtende benadering gaan het initiatief bij de sporters' +
				' leggen, zonder daarbij afspraken te maken, doelen of verwachtingen naar voren te schuiven, of ' +
				'grenzen te stellen. Door geen verwachtingen te communiceren, gaan sporters deze ‘gedwongen’ ' +
				'zelfstandigheid niet noodzakelijk als motiverend ervaren. Ze weten niet wat ze moeten doen, ' +
				'wat er van hen verwacht wordt en waar de grenzen liggen. Hoewel je als coach er misschien vanuit ' +
				'gaat dat afspraken en verwachtingen duidelijk genoeg zijn en niet uitgesproken hoeven te worden, ' +
				'is dit vaak niet het geval voor de sporter.\n' +
				'\n' +
				'Uiteraard kan je als coach soms bewust de kat uit de boom kijken door het initiatief bij ' +
				'sporters te leggen en te kijken hoe ze reageren. Wees je er in dat geval wel van bewust dat ' +
				'sporters een minimum aan houvast nodig hebben, waarin hun zelfstandigheid tot hun recht kan komen. ' +
				'Wanneer je namelijk te pas en te onpas ingrijpt kunnen sporters gefrustreerd of verontwaardigd reageren' +
				' wanneer ze aangesproken worden op zaken die niet op voorhand doorgesproken zijn. In dat opzicht is' +
				' het beter om preventief een duidelijk kader van afspraken en verwachtingen te communiceren waarop' +
				' sporters kunnen terugvallen en jij als coach op kan terugkomen. Door inconsequent op te treden ' +
				'veroorzaak je als coach niet alleen onvoorspelbaarheid en verwarring, maar ook gevoelens van ' +
				'onrechtvaardigheid. Bijvoorbeeld wanneer je als coach een sporter die te laat komt de ene keer er ' +
				'wel en de andere keer niet op aanspreekt. Dit is niet alleen frustrerend voor de sporters, maar ' +
				'tast je geloofwaardigheid als coach ook aan en leidt tot sporters die zich zullen verzetten en ' +
				'moeilijker laten bijsturen, wat dan waar nefast is voor de persoonlijke competentieontwikkeling ' +
				'van de sporter.\n'
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
			selectedBouwsteen: d.data.name,
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
		let x = Math.sin(middleAngle) * maxRadius * 0.95
		let y = -Math.cos(middleAngle) * maxRadius * 0.95
		let translate = "translate(" + x.toString() + "," + y.toString() + ") rotate(" + d.data.rotate + ")"
		return translate
	}

	calculateLocationLabelkwadrantPrint(d, maxRadius){
		let middleAngle = (d.startAngle + d.endAngle) / 2
		let x = Math.sin(middleAngle) * maxRadius * 0.9
		let y = -Math.cos(middleAngle) * maxRadius * 0.9
		let translate = "translate(" + x.toString() + "," + y.toString() + ") rotate(" + d.data.rotate + ")"
		return translate
	}

	renderTaskInfo() {
		if (isMobile) {
			return "Klik op een zone voor meer info"
		}
		else{
			return "Hover over een zone voor jouw score en klik op een zone voor meer informatie"
		}
	}

	renderOctantLabel(d){
		if (isMobile) {
			return d.data.name + ": " + Math.round(d.data.value * 10) / 10
		}
		else{
			return d.data.name
		}
	}

	renderProfile() {
		let data = this.createData();
		let dataKwadrant = this.createDataKwadrant()
		let width = window.screen.availWidth;
		let height = window.screen.availHeight * 0.6;

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
		let styleArcKwadrant = classnames(styles.styleArcKwadrant);
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
						<Title title={"Persoonlijk Coachprofiel"} />
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
												fill={color(d.data.name)}
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
									>{this.renderOctantLabel(d)}</text>
								))}
							</g>
							<g transform={`translate(${widthSVG / 2}, ${(heightSVG / 2)} )`}>
								{dataPieKwadrant.map(d => (
									<>
										<g
											className="arcKwadrant"
											key={d.index + "arcOuterKwadrant"}
											id={d.index + "arcOuterKwadrant"}
										>
											<path
												d={arcKwadrant(d)}
												className={styleArcKwadrant}
												key={d.index + "arcKwadrantPath"}
												fill={this.getColor(d.data.name)}
											/>
										</g>
										<text
											transform={this.calculateLocationLabelkwadrant(d, maxRadiusTotal)}
											className={styleLabelKwadrant}
											key={d.index + "labelKwadrant"}
											id={d.index + "labelKwadrant"}
										>{d.data.name}</text>

									</>
								))}
							</g>
						</svg>
					</div>

				</div>
			</>)
	}

	renderDetails(){
		let bouwsteen = this.state.selectedBouwsteen
		let score = this.state.selectedScore
		let details = this.getDetailsBouwsteen(bouwsteen)
		let color = this.getColor(bouwsteen)
		let logo = this.getLogo(bouwsteen)
		return(
			<Bouwsteen
				name={bouwsteen}
				content={details}
				handleGoBackToProfile={this.handleGoBackToProfile}
				color={color}
				score={score}
				logo={logo}
			/>
		)

	}

	renderDetailsPrint(){
		let participatief = Math.round(localStorage.getItem('participatief') * 10) / 10;
		let afstemmend = Math.round(localStorage.getItem('afstemmend') * 10) / 10;
		let begeleidend = Math.round(localStorage.getItem('begeleidend') * 10) / 10;
		let verduidelijkend = Math.round(localStorage.getItem('verduidelijkend') * 10) / 10;
		let eisend = Math.round(localStorage.getItem('eisend') * 10) / 10;
		let dominerend = Math.round(localStorage.getItem('dominerend') * 10) / 10;
		let opgevend = Math.round(localStorage.getItem('opgevend') * 10) / 10;
		let afwachtend = Math.round(localStorage.getItem('afwachtend') * 10) / 10;

		return(
			<>
				<Bouwsteen
					name={"Participatief"}
					content={this.getDetailsBouwsteen("Participatief")}
					color={this.getColor("Participatief")}
					score={participatief}
					print={true}
					logo={this.getLogo("Participatief")}
				/>
				<Bouwsteen
					name={"Afstemmend"}
					content={this.getDetailsBouwsteen("Afstemmend")}
					color={this.getColor("Afstemmend")}
					score={afstemmend}
					print={true}
					logo={this.getLogo("Afstemmend")}

				/>
				<br/><br/><br/><br/><br/>
				<br/><br/><br/><br/>
				<Bouwsteen
					name={"Begeleidend"}
					content={this.getDetailsBouwsteen("Begeleidend")}
					color={this.getColor("Begeleidend")}
					score={begeleidend}
					print={true}
					logo={this.getLogo("Begeleidend")}

				/>
				<Bouwsteen
					name={"Verduidelijkend"}
					content={this.getDetailsBouwsteen("Verduidelijkend")}
					color={this.getColor("Verduidelijkend")}
					score={verduidelijkend}
					print={true}
					logo={this.getLogo("Verduidelijkend")}

				/>
				<br/><br/><br/><br/><br/>
				<br/><br/><br/><br/>
				<Bouwsteen
					name={"Eisend"}
					content={this.getDetailsBouwsteen("Eisend")}
					color={this.getColor("Eisend")}
					score={eisend}
					print={true}
					logo={this.getLogo("Eisend")}

				/>
				<Bouwsteen
					name={"Dominerend"}
					content={this.getDetailsBouwsteen("Dominerend")}
					color={this.getColor("Dominerend")}
					score={dominerend}
					print={true}
					logo={this.getLogo("Dominerend")}

				/>
				<br/><br/><br/><br/><br/>

				<Bouwsteen
					name={"Opgevend"}
					content={this.getDetailsBouwsteen("Opgevend")}
					color={this.getColor("Opgevend")}
					score={opgevend}
					print={true}
					logo={this.getLogo("Opgevend")}

				/>
				<Bouwsteen
					name={"Afwachtend"}
					content={this.getDetailsBouwsteen("Afwachtend")}
					color={this.getColor("Afwachtend")}
					score={afwachtend}
					print={true}
					logo={this.getLogo("Afwachtend")}

				/>
			</>
		)
	}

	renderProfilePrint() {
		let data = this.createData();
		let dataKwadrant = this.createDataKwadrant()
		let width = 640;
		let height = 640;

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
		let innerRadius = maxRadiusTotal * 0.05;
		let maxRadius = 0.8 * maxRadiusTotal
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
		let styleContainer = classnames(styles.styleContainer);
		let styleContainerProfile = classnames(styles.styleContainerProfile);
		let styleLabel = classnames(styles.styleLabelPrint)
		let styleLabelKwadrant = classnames(styles.styleLabelKwadrantPrint)
		let styleTitle = classnames(styles.titlePrint)

		return (
			<>
				<div
					id="ProfileContainer"
					className={styleContainer}
				>
					<div
						className={styleContainerProfile}
					>
						<h1
							className={styleTitle}
						>Persoonlijk Coachprofiel</h1>
						<br/><br/><br/><br/>
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
											transform={this.calculateLocationLabelkwadrantPrint(d, maxRadiusTotal)}
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

	renderPrint(){
		return(
			<>
				{this.renderProfilePrint()}
				<br/><br/><br/><br/><br/>
				<br/><br/><br/><br/><br/>
				<br/><br/>


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

		return (
			<>
				{this.getRenderFunction()}
				{this.state.details ? <div/> :
					<div className={styleButtonContainer}>
						<ButtonNext id="printbutton"  handleClick={this.handleDownload} displayName={"Opslaan / Print"}  />
					</div>
				}

				<Footer/>
			</>
		)
	}
}