import React, {Component} from 'react';
import * as Survey from "survey-react";
import styles from '../Styles/Personality.module.css';
import classnames from 'classnames';
import '../Styles/Survey.css'
import {addPersonality} from "../Utils/API";
import Footer from "../Footer";





export default class Personality extends Component {
    constructor(props) {
        super(props);
        this.sendPersonality = this.sendPersonality.bind(this);
        this.goToQuestionnaire = this.goToQuestionnaire.bind(this);
    }

    sendPersonality(survey){
        const data = survey.data;
        let id = localStorage.getItem('id');
        let extravert = data['question1']
        let kritisch = data['question2']
        let grondig = data['question3']
        let angstig = data['question4']
        let fantasie = data['question5']
        let gereserveerd = data['questions6']
        let sympathiek = data['question7']
        let lui = data['question8']
        let kalm = data['question9']
        let creatief = data['question10']



        let promiseAddProfile = addPersonality(id,extravert, kritisch, grondig, angstig, fantasie, gereserveerd, sympathiek, lui, kalm, creatief)
        promiseAddProfile.then(
            this.goToQuestionnaire()
        );
    }

    goToQuestionnaire(){
        this.props.history.push({
            pathname: '/Questionnaire',
        })
    }

    render() {
        //options modern, default,
        Survey.StylesManager.applyTheme("winter");
        const styleContainer = classnames(styles.container);
        const styleDivSurvey = classnames(styles.divSurvey)

        var surveyJSON = {"pages":[{"name":"page1","elements":[
            {"type":"rating","name":"question1","title":"Extravert, enthousiast","isRequired":true,"rateMax":7,"minRateDescription":"Beschrijft mij helemaal niet","maxRateDescription":"Beschrijft mij helemaal"},
                    {"type":"rating","name":"question2","title":"Kritisch, ruziezoekend","isRequired":true,"rateMax":7,"minRateDescription":"Beschrijft mij helemaal niet","maxRateDescription":"Beschrijft mij helemaal"},
                    {"type":"rating","name":"question3","title":"Grondig, gedisciplineerd","isRequired":true,"rateMax":7,"minRateDescription":"Beschrijft mij helemaal niet","maxRateDescription":"Beschrijft mij helemaal"},
                    {"type":"rating","name":"question4","title":"Angstig, makkelijk van streek te brengen","isRequired":true,"rateMax":7,"minRateDescription":"Beschrijft mij helemaal niet","maxRateDescription":"Beschrijft mij helemaal"},
                    {"type":"rating","name":"question5","title":"Open voor nieuwe ervaringen, levendige fantasie","isRequired":true,"rateMax":7,"minRateDescription":"Beschrijft mij helemaal niet","maxRateDescription":"Beschrijft mij helemaal"},
                    {"type":"rating","name":"question6","title":"Gereserveerd, stil","isRequired":true,"rateMax":7,"minRateDescription":"Beschrijft mij helemaal niet","maxRateDescription":"Beschrijft mij helemaal"},
                    {"type":"rating","name":"question7","title":"Sympathiek, vriendelijk","isRequired":true,"rateMax":7,"minRateDescription":"Beschrijft mij helemaal niet","maxRateDescription":"Beschrijft mij helemaal"},
                    {"type":"rating","name":"question8","title":"Lui, gemakzuchtig","isRequired":true,"rateMax":7,"minRateDescription":"Beschrijft mij helemaal niet","maxRateDescription":"Beschrijft mij helemaal"},
                    {"type":"rating","name":"question9","title":"Weinig artistieke interesse, weinig creatief","isRequired":true,"rateMax":7,"minRateDescription":"Beschrijft mij helemaal niet","maxRateDescription":"Beschrijft mij helemaal"},
                    {"type":"rating","name":"question10","title":"Kalm, emotioneel stabiel","isRequired":true,"rateMax":7,"minRateDescription":"Beschrijft mij helemaal niet","maxRateDescription":"Beschrijft mij helemaal"}
                    ],
                "title":"Hieronder vind je wat basisvragen rond jouw persoonlijkheid. Gelieve eerlijk te antwoorden, er zijn namelijk geen ‘juiste’ of ‘foute’ antwoorden. Duid voor elk kenmerk eerlijk aan wat jou het best typeert of omschrijft."}]}




        return (
            <>
                <div
                className={styleContainer}
                >
                    <div
                        className={styleDivSurvey}
                    >
                        <Survey.Survey json={surveyJSON} onComplete={this.sendPersonality}/>
                    </div>
                </div>
                <Footer/>

            </>
        );
    }
}

