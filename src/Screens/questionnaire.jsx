import React, {Component} from 'react';
import * as Survey from "survey-react";
import styles from '../Styles/Questionnaire.module.css';
import '../Styles/Survey.css'
import classnames from 'classnames';
import {addProfile, addDataProfile} from "../Utils/API";
import Footer from "../Components/Footer";
import Title from "../Components/Title";





export default class Questionnaire extends Component {
	constructor(props) {
		super(props);
		this.calculateProfile = this.calculateProfile.bind(this)
		this.addRawData = this.addRawData.bind(this)
		this.goToNextPage = this.goToNextPage.bind(this)
	}
	
	goToNextPage(){
		this.props.history.push({
			pathname: '/Personality',
		})
	}

	addRawData(data){
		let id = localStorage.getItem('id');
		let q1 = data['question11'];
		let q2 = data['question12'];
		let q3 = data['question13'];
		let q4 = data['question14'];
		let q5 = data['question21'];
		let q6 = data['question22'];
		let q7 = data['question23'];
		let q8 = data['question24'];
		let q9 = data['question31'];
		let q10 = data['question32'];
		let q11 = data['question33'];
		let q12 = data['question34'];
		let q13 = data['question41'];
		let q14 = data['question42'];
		let q15 = data['question43'];
		let q16 = data['question44'];
		let q17 = data['question51'];
		let q18 = data['question52'];
		let q19 = data['question53'];
		let q20 = data['question54'];
		let q21 = data['question61'];
		let q22 = data['question62'];
		let q23 = data['question63'];
		let q24 = data['question64'];
		let q25 = data['question71'];
		let q26 = data['question72'];
		let q27 = data['question73'];
		let q28 = data['question74'];
		let q29 = data['question81'];
		let q30 = data['question82'];
		let q31 = data['question83'];
		let q32 = data['question84'];
		let q33 = data['question91'];
		let q34 = data['question92'];
		let q35 = data['question93'];
		let q36 = data['question94'];
		let q37 = data['question101'];
		let q38 = data['question102'];
		let q39 = data['question103'];
		let q40 = data['question104'];
		let q41 = data['question111'];
		let q42 = data['question112'];
		let q43 = data['question113'];
		let q44 = data['question114'];
		let q45 = data['question112'];
		let q46 = data['question122'];
		let q47 = data['question123'];
		let q48 = data['question124'];
		let q49 = data['question131'];
		let q50 = data['question132'];
		let q51 = data['question133'];
		let q52 = data['question134'];
		let q53 = data['question141'];
		let q54 = data['question142'];
		let q55 = data['question143'];
		let q56 = data['question144'];
		let q57 = data['question151'];
		let q58 = data['question152'];
		let q59 = data['question153'];
		let q60 = data['question154'];

		let promiseAddProfileData = addDataProfile(id,q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,
			q11,q12,q13,q14,q15,q16,q17,q18,q19,q20,
			q21,q22,q23,q24,q25,q26,q27,q28,q29,q30,
			q31,q32,q33,q34,q35,q36,q37,q38,q39,q40,
			q41,q42,q43,q44,q45,q46,q47,q48,q49,q50,
			q51,q52,q53,q54,q55,q56,q57,q58,q59,q60)

		promiseAddProfileData.then(
			this.goToNextPage()
		);
	}
	
	calculateProfile(survey){
		const data = survey.data;
		let id = localStorage.getItem('id');
		let participatief = Math.round(this.calculateParticipatief(data) *10 ) / 10;
		let afstemmend = Math.round(this.calculateAfstemmend(data)*10 ) / 10;
		let begeleidend = Math.round(this.calculateBegeleidend(data) *10 ) / 10;
		let verduidelijkend = Math.round(this.calculateVerduidelijkend(data) *10 ) / 10;
		let eisend = Math.round(this.calculateEisend(data) *10 ) / 10;
		let dominerend = Math.round(this.calculateDominerend(data) *10 ) / 10;
		let opgevend = Math.round(this.calculateOpgevend(data) *10 ) / 10;
		let afwachtend = Math.round(this.calculateAfwachtend(data) *10 ) / 10;
		let autonomie = Math.round(this.calculateAutonomie(data) * 10) / 10;
		let stuctuur = Math.round(this.calculateStructuur(data) * 10) / 10;
		let controle = Math.round(this.calculateControle(data) * 10) / 10
		let chaos = Math.round(this.calculateChaos(data) * 10) / 10;
		
		localStorage.setItem('participatief', participatief );
		localStorage.setItem('afstemmend', afstemmend );
		localStorage.setItem('begeleidend', begeleidend );
		localStorage.setItem('verduidelijkend', verduidelijkend );
		localStorage.setItem('eisend', eisend );
		localStorage.setItem('dominerend', dominerend );
		localStorage.setItem('opgevend', opgevend );
		localStorage.setItem('afwachtend', afwachtend );
		localStorage.setItem('autonomie', autonomie);
		localStorage.setItem('structuur', stuctuur);
		localStorage.setItem('controle', controle);
		localStorage.setItem('chaos', chaos)
		
		let promiseAddProfile = addProfile(id, participatief, afstemmend, begeleidend, verduidelijkend,
			eisend, dominerend, opgevend, afwachtend, autonomie, stuctuur, controle, chaos);
		
		promiseAddProfile.then(
			this.addRawData(data)
		);
		
		
		
		
		
	}
	
	calculateParticipatief(data){
		let v1 = data['question33'];
		let v2 = data['question43'];
		let v3 = data['question62'];
		let v4 = data['question101'];
		let v5 = data['question114'];
		let v6 = data['question124'];
		let sum = v1 + v2 + v3 + v4 + v5 + v6;
		let normalized = sum / 6.0;
		return normalized
	}
	
	calculateAfstemmend(data){
		let v1 = data['question12'];
		let v2 = data['question23'];
		let v3 = data['question52'];
		let v4 = data['question72'];
		let v5 = data['question82'];
		let v6 = data['question91'];
		let v7 = data['question132'];
		let v8 = data['question144'];
		let v9 = data['question151'];
		let sum = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9;
		let normalized = sum / 9.0;
		return normalized
	}

	calculateAutonomie(data){
		let v1 = data['question33'];
		let v2 = data['question43'];
		let v3 = data['question62'];
		let v4 = data['question101'];
		let v5 = data['question114'];
		let v6 = data['question124'];
		let v7 = data['question12'];
		let v8 = data['question23'];
		let v9 = data['question52'];
		let v10 = data['question72'];
		let v11 = data['question82'];
		let v12 = data['question91'];
		let v13 = data['question132'];
		let v14 = data['question144'];
		let v15 = data['question151'];
		let sum = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9 + v10 + v11 + v12 + v13 + v14 + v15;
		let normalized = sum / 15.0;
		return normalized
	}

	
	calculateBegeleidend(data){
		let v1 = data['question14'];
		let v2 = data['question21'];
		let v3 = data['question64'];
		let v4 = data['question83'];
		let v5 = data['question94'];
		let v6 = data['question102'];
		let v7 = data['question121'];
		let v8 = data['question133'];
		let v9 = data['question143'];
		let sum = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9;
		let normalized = sum / 9.0;
		return normalized
	}
	
	calculateVerduidelijkend(data){
		let v1 = data['question32'];
		let v2 = data['question44'];
		let v3 = data['question54'];
		let v4 = data['question71'];
		let v5 = data['question113'];
		let v6 = data['question154'];
		let sum = v1 + v2 + v3 + v4 + v5 + v6;
		let normalized = sum / 6.0;
		return normalized
	}

	calculateStructuur(data){
		let v1 = data['question14'];
		let v2 = data['question21'];
		let v3 = data['question64'];
		let v4 = data['question83'];
		let v5 = data['question94'];
		let v6 = data['question102'];
		let v7 = data['question121'];
		let v8 = data['question133'];
		let v9 = data['question143'];
		let v10 = data['question32'];
		let v11 = data['question44'];
		let v12 = data['question54'];
		let v13 = data['question71'];
		let v14 = data['question113'];
		let v15 = data['question154'];
		let sum = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9 + v10 + v11 + v12 + v13 + v14 + v15;
		let normalized = sum / 15.0;
		return normalized
	}
	
	calculateEisend(data){
		let v1 = data['question34'];
		let v2 = data['question42'];
		let v3 = data['question63'];
		let v4 = data['question74'];
		let v5 = data['question93'];
		let v6 = data['question104'];
		let v7 = data['question111'];
		let v8 = data['question134'];
		let v9 = data['question141'];
		let v10 = data['question153'];
		
		let sum = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9 +v10;
		let normalized = sum / 10.0;
		return normalized
	}
	
	calculateDominerend(data){
		let v1 = data['question13'];
		let v2 = data['question24'];
		let v3 = data['question51'];
		let v4 = data['question81'];
		let v5 = data['question123'];
		let sum = v1 + v2 + v3 + v4 + v5;
		let normalized = sum / 5.0;
		return normalized
	}

	calculateControle(data){
		let v1 = data['question34'];
		let v2 = data['question42'];
		let v3 = data['question63'];
		let v4 = data['question74'];
		let v5 = data['question93'];
		let v6 = data['question104'];
		let v7 = data['question111'];
		let v8 = data['question134'];
		let v9 = data['question141'];
		let v10 = data['question153'];
		let v11 = data['question13'];
		let v12 = data['question24'];
		let v13 = data['question51'];
		let v14 = data['question81'];
		let v15 = data['question123'];
		let sum = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9 + v10 + v11 + v12 + v13 + v14 + v15;
		let normalized = sum / 15.0;
		return normalized
	}
	
	calculateOpgevend(data){
		let v1 = data['question11'];
		let v2 = data['question22'];
		let v3 = data['question84'];
		let v4 = data['question92'];
		let v5 = data['question103'];
		let v6 = data['question122'];
		let v7 = data['question131'];
		let v8 = data['question142'];
		let v9 = data['question152'];
		let sum = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9;
		let normalized = sum / 9.0;
		return normalized
	}
	
	calculateAfwachtend(data){
		let v1 = data['question31'];
		let v2 = data['question41'];
		let v3 = data['question53'];
		let v4 = data['question61'];
		let v5 = data['question73'];
		let v6 = data['question112'];
		let sum = v1 + v2 + v3 + v4 + v5 + v6;
		let normalized = sum / 6.0;
		return normalized
	}

	calculateChaos(data){
		let v1 = data['question11'];
		let v2 = data['question22'];
		let v3 = data['question84'];
		let v4 = data['question92'];
		let v5 = data['question103'];
		let v6 = data['question122'];
		let v7 = data['question131'];
		let v8 = data['question142'];
		let v9 = data['question152'];
		let v10 = data['question31'];
		let v11 = data['question41'];
		let v12 = data['question53'];
		let v13 = data['question61'];
		let v14 = data['question73'];
		let v15 = data['question112'];
		let sum = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9 + v10 + v11 + v12 + v13 + v14 + v15;
		let normalized = sum / 15.0;
		return normalized
	}
	
	
	
	
	
	
	
	
	
	
	
	
	render() {
		//options modern, default,
		Survey.StylesManager.applyTheme("winter");
		const styleContainer = classnames(styles.container);
		const styleDivSurvey = classnames(styles.divSurvey)
		
		let surveyJSON = {"pages":[
			{"name":"page1","elements":[
				{"type":"rating","name":"question11","title":"Je geeft geen toelichting en laat betijen","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question12","title":"Je erkent in een gesprek de frustratie en geeft een zinvolle" +
				" reden voor de niet-selectie","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question13","title":"Je zegt: 'Je moet dit leren aanvaarden. Dit is nu eenmaal mijn" +
				" beslissing.'","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question14","title":"Je geeft aan welke stappen nodig zijn voor een selectie in de" +
				" toekomst.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"1/15 Je merkt dat een sporter niet tevreden is dat hij niet in de wedstrijdselectie werd opgenomen. Hoe reageer je hierop?"},
			{"name":"page2","elements":[
				{"type":"rating","name":"question21","title":"Je overloopt met hem nog eens de stappen om zijn taken goed uit" +
				" te voeren.",
					"isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question22","title":"Je spreekt er de sporter niet over aan. Het zal wel overgaan in" +
				" de wedstrijd.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question23","title":"Je vraagt of hij gestresseerd is en je nodigt hem uit om erover" +
				" te praten.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question24","title":"Je zegt: ‘Je moet leren omgaan met stress. Zo niet, wordt de" +
				" wedstrijd een flop.’","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"2/15 Een sporter lijkt in de aanloop naar een wedstrijd last te hebben van faalangst. Hoe reageer je?"},
			{"name":"page3","elements":[
				{"type":"rating","name":"question31","title":"Je laat je niet in met de opwarming. Ze kennen genoeg" +
				" oefeningen uit de training.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question32","title":"Je geeft aan dat je verwacht dat iedereen zich goed en scherp" +
				" opwarmt.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question33","title":"Je geeft de sporters zelf de verantwoordelijkheid om te kiezen" +
				" voor een deel van de opwarmingsoefeningen en laat ruimte voor persoonlijke accenten.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question34","title":"Je waarschuwt de sporters dat ze scherp moeten opwarmen anders" +
				" wordt de wedstrijd een afgang.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"3/15 De opwarming voor de wedstrijd verloopt op de volgende manier:"},
			{"name":"page4","elements":[
				{"type":"rating","name":"question41","title":"...zeg je niet veel, want ze weten zelf wat ze moeten doen om" +
				" zich te herpakken.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question42","title":"...spreek je hen streng aan met: 'Het is nu aan jullie om dit" +
				" recht te zetten en te bewijzen wat jullie waard zijn.'","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question43","title":"...vraag je naar hun mening nadat je jouw opdrachten voor de" +
				" rest van de wedstrijd toelichtte.'","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question44","title":"...kom je nog eens terug op de opdrachten die je voor de" +
				" wedstrijd meegaf.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"4/15 Het eerste deel van de wedstrijd was niet van het niveau dat jij verwacht van je sporters. Tijdens de pauze..."},
			{"name":"page5","elements":[
				{"type":"rating","name":"question51","title":"Je zegt: ‘We kunnen ons dan wel goed voorbereiden, maar als" +
				" jij niet doet wat ik je zeg dan wordt het natuurlijk een fiasco.’","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question52","title":"Je vraagt jouw sporter of hij een idee heeft over de oorzaken" +
				" van de mindere wedstrijd.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question53","title":"Je wacht af of de sporter zelf oplossingen vindt en" +
				" veerkrachtig reageert.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question54","title":"Je geeft aan wat er volgens jou fout liep en geeft aanwijzingen" +
				" voor hoe dit in de toekomst voorkomen kan worden.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"5/15 In de aanloop naar een belangrijke wedstrijd bereiden jij en jouw sporter samen de wedstrijd voor. Hoewel deze voorbereiding naar wens verliep, draait de wedstrijd helemaal niet uit zoals verwacht. Het gewenste eindresultaat wordt dan ook helemaal niet behaald."},
			{"name":"page6","elements":[
				{"type":"rating","name":"question61","title":"...plant niet te veel. Je wacht af en neemt de dingen zoals ze" +
				" komen","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question62","title":"...bent geïnteresseerd om te horen op welke specifieke" +
				" werkpunten jouw sporters zich verder wensen toe te leggen en je voorziet hiervoor de nodige ruimte.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question63","title":"...staat er sterk op dat de sporters moeten leren wat je hen" +
				" bijbrengt. Het is jouw plicht om de training te geven en hun plicht om hard hun best te doen.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question64","title":"......zorgt voor een duidelijke en gemakkelijk te volgen" +
				" indeling en communiceert de trainingsdoelstellingen.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"6/15 De training begint. Jij..."},
			{"name":"page7","elements":[
				{"type":"rating","name":"question71","title":"Je geeft aan wat jouw verwachtingen zijn wat betreft inzet op" +
				" de training.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question72","title":"Je legt uit waarom deze training zinvol is en hoe ze bijdraagt" +
				" tot hun ontwikkeling.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question73","title":"Je begint een andere oefening in de hoop dat de gemakzucht" +
				" vanzelf overgaat.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question74","title":"Je maakt hen duidelijk dat je ontgoocheld bent en zegt dat" +
				" goede sporters ook iets tegen hun zin kunnen doen.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"7/15 Een aantal sporters stellen zich gemakzuchtig op tijdens het uitvoeren van een vrij eenvoudige oefening op training en brengen hierbij anderen uit concentratie. Wat doe je in deze situatie om van hen een extra inspanning te verkrijgen?"},
			{"name":"page8","elements":[
				{"type":"rating","name":"question81","title":"Je geeft aan dat het dringend tijd wordt dat hij/zij eindelijk" +
				" oppikt wat je al weken uitlegt, want dat hij/zij het anders nooit ver zal schoppen.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question82","title":"Je vraagt wat hij nog moeilijk vindt aan die techniek.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question83","title":"Je voorziet een nieuwe tussenstap om dezelfde techniek anders" +
				" te trainen en zegt dat het stap per stap wel zal lukken.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question84","title":"Je besteedt er geen tijd meer aan. Er is al genoeg energie" +
				" verloren gegaan.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"8/15 Ondanks herhaaldelijke bijsturingen de voorbije weken, krijgt één van je sporters een nieuwe techniek maar niet onder de knie. Op training begaat hij steeds opnieuw dezelfde technische fout."},
			{"name":"page9","elements":[
				{"type":"rating","name":"question91","title":"Je zoekt nieuwe manieren om deze oefening interessanter en" +
				" aangenamer te brengen voor de sporters.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question92","title":"Je maakt je niet te veel zorgen. De sporters moeten voor" +
				" zichzelf uitmaken hoeveel inspanning ze leveren.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question93","title":"Je beveelt hen: ’Er zijn tijden van spelen en er zijn tijden" +
				" van werken. Nu is het tijd om te bewijzen wat je waard bent!’","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question94","title":"Je maakt de sporter via feedback en extra tips duidelijk hoe ze" +
				" de oefening tot een goed einde kunnen brengen.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"9/15 Je geeft een moeilijke en lastige oefening die een extra inspanning van de sporters vraagt."},
			{"name":"page10","elements":[
				{"type":"rating","name":"question101","title":"...je verzekert hem dat je openstaat voor zijn input en" +
				" suggesties.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question102","title":"...brengt hem een behulpzame strategie bij om zijn probleem" +
				" stap voor stap op te lossen.'","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question103","title":"...negeert het zeuren en klagen en doet verder alsof er niets" +
				" aan de hand is.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question104","title":"...staat er op dat hij aandachtig en geconcentreerd blijft." +
				" Hij moet de oefeningen afwerken voor zijn eigen bestwil.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"10/15 Tijdens een moeilijker moment van jouw training begint een sporter te klagen. Jij..."},
			{"name":"page11","elements":[
				{"type":"rating","name":"question111","title":"...doet dit door je sporters een lijst met gedragsregels en" +
				" sancties te geven.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question112","title":"...bent niet bekommerd om regels en richtlijnen. Je grijpt in" +
				" wanneer het probleem zich stelt.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question113","title":"...geeft in een gesprek duidelijk je normen en verwachtingen" +
				" voor een goede samenwerking aan.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question114","title":"...vraagt de sporters om suggesties en ideeën voor" +
				" richtlijnen","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"11/15 Er staat een nieuw seizoen voor de deur. Je denkt na over het opstellen van een aantal richtlijnen voor goede samenwerking. Je..."},
			{"name":"page12","elements":[
				{"type":"rating","name":"question121","title":"Je geeft aan dat terugkeren na een blessure in stappen" +
				" verloopt" +
				" en moedigt hem/haar aan om vol te houden.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question122","title":"Je laat je er niet mee in. Hij moet zelf ondervinden dat" +
				" revalideren met ups en downs verloopt. .","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question123","title":"Je eist in het vervolg een ijzeren discipline.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question124","title":"Je geeft de sporter inspraak in zijn revalidatieschema","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"12/15 Een sporter heeft een blessure opgelopen en is bezig met zijn revalidatie, die moeizaam verloopt. Ondanks dat je hem al eens aangemoedigd hebt, blijkt hij zijn revalidatieschema niet zo nauw te volgen. Hoe ga je hier mee om?"},
			{"name":"page13","elements":[
				{"type":"rating","name":"question131","title":"Je grijpt niet in. De sporters in kwestie moeten hier zelf mee" +
				" leren omgaan.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question132","title":"Je neemt de betreffende sporters apart, vraagt hoe zij de" +
				" situatie zien en welke oplossing zij voorstellen.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question133","title":"Je geeft aan dat jij samenwerking belangrijk vindt en geeft" +
				" hen" +
				" tips om eruit te geraken.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question134","title":"Je maakt duidelijk dat het hun plicht is zich te gedragen," +
				" zoals het jouw plicht is om hen te coachen.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"13/15 Je merkt dat er wrevel bestaat tussen een aantal van jouw sporters."},
			{"name":"page14","elements":[
				{"type":"rating","name":"question141","title":"....wijs je erop dat een nieuwe ondermaatse prestatie voor" +
				" jou\n" +
				"niet aanvaardbaar is. Je zegt dat hij de volgende keer beter moet presteren.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question142","title":"...besteed je hier geen tijd meer aan. Hij moet zichzelf nu" +
				" maar herpakken.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question143","title":"...geef je tips hoe hij zijn prestatie kan verbeteren en zeg" +
				" je" +
				" vertrouwen te hebben dat hij zich kan verbeteren.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question144","title":"...luister je naar hoe de sporter zijn eigen prestatie ziet en" +
				" wat hij zelf denkt te doen om zich te verbeteren.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"14/15 Een sporter presteert al een aantal weken ondermaats. Je besprak dit reeds met hem. Na een nieuwe ondermaatse prestatie..."},
			{"name":"page15","elements":[
				{"type":"rating","name":"question151","title":"Na de training neem je de sporter apart en je vraagt of er hem" +
				" iets dwars zit.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question152","title":"Je zegt er niets over en focust in plaats daarvan op jouw" +
				" training.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question153","title":"Je maakt hem in groep duidelijk dat je teleurgesteld bent," +
				" want" +
				" dat hij nu al twee trainingen na elkaar te laat komt.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"},
				{"type":"rating","name":"question154","title":"Je geeft aan dat op tijd komen voor jou belangrijk is.","isRequired":true,"rateMax":7,"minRateDescription":"Helemaal niet van toepassing","maxRateDescription":"Helemaal van toepassing"}
			],"title":"15/15 Een sporter is voor de tweede maal op rij te laat op de training en geeft een afwezige indruk. Wat doe je?"},
		]}
			
			
			
			return (
				<>
					<Title title={'Situaties'} />

					<div
						className={styleContainer}
					>
						<div
							className={styleDivSurvey}
						>
							<Survey.Survey json={surveyJSON} onComplete={this.calculateProfile}/>
						</div>
					</div>
					<Footer/>
				</>

		
		);
	}
}


