import React, {Component} from 'react';
import * as Survey from "survey-react";
import styles from '../Styles/Demographics.module.css';
import '../Styles/Survey.css'
import classnames from 'classnames';
import {addDemographics} from "../Utils/API";
import Footer from "../Components/Footer";
import Title from "../Components/Title";





export default class Demographics extends Component {
    constructor(props) {
        super(props);
        this.sendDemographics = this.sendDemographics.bind(this);
        this.goToPersonality = this.goToPersonality.bind(this);
    }

    sendDemographics(survey){
        const data = survey.data;
        let random = Math.floor(Math.random() * 99) + 1
        let time = new Date().getTime();
        let id = time + random;
        localStorage.setItem('id', id );
        let age = data['question1']
        let gender = data['question2']
        let sport = data['question3']
        let ageSporters = data['question4']
        let experience = data['question5']
        let level = data['question6']
        let nbHours = data['question7']
        let diploma = data['question8']


        let promiseAddProfile = addDemographics(id,age,gender,sport,ageSporters,experience,level,nbHours,diploma)
        promiseAddProfile.then(
            this.goToPersonality()
        );
    }

    goToPersonality(){
        this.props.history.push({
            pathname: '/Personality',
        })
    }

    render() {
        //options modern, default,
        Survey.StylesManager.applyTheme("winter");
        const styleContainer = classnames(styles.container);
        const styleDivSurvey = classnames(styles.divSurvey)

        let surveyJSON = {"pages":[{"name":"page1","elements":[
            {"type":"text","name":"question1","title":"Wat is jouw leeftijd?","isRequired":true,"inputType":"number"},
                    {"type":"radiogroup","name":"question2","title":"Wat is jouw geslacht?","isRequired":true,"choices":[{"value":"M","text":"Man"},{"value":"V","text":"Vrouw"},{"value":"X","text":"X"}]},
                    {"type":"text","name":"question3","title":"Binnen welke sport ben je actief als coach?","isRequired":true},
                    {"type":"checkbox","name":"question4","title":"Wat is de leeftijd van jouw sporter(s)?","isRequired":true,"choices":[{"value":"2","text":"2-5"},{"value":"5","text":"5-10"},{"value":"10","text":"10-15"},{"value":"15","text":"15-18"},{"value":"18","text":"18-23"},{"value":"23","text":"Senioren"}]},
                    {"type":"text","name":"question5","title":"Hoeveel jaren ervaring heb je als coach?","isRequired":true,"inputType":"number"},
                    {"type":"checkbox","name":"question6","title":"Wat is het niveau waarop je coacht?","isRequired":true,"choices":[
                        {"value":"regionaal","text":"Regionaal"},
                            {"value":"provinciaal","text":"Provinciaal"},
                            {"value":"nationaal","text":"Nationaal"},
                            {"value":"nationaal_hoogste","text":"Nationaal (Hoogste klasse)"},
                            {"value":"internationaal","text":"Internationaal"}]},
                    {"type":"text","name":"question7","title":"Hoeveel uren training geef je per week?","isRequired":true,"inputType":"number"},
                    {"type":"text","name":"question8","title":"Wat is het hoogst behaalde diploma als coach?","isRequired":true}
                    ]}
                    ]}



        return (
            <>
                <Title title={'Basisgegevens'} />
                <div
                    className={styleContainer}
                >
                    <div
                        className={styleDivSurvey}
                    >
                        <Survey.Survey json={surveyJSON} onComplete={this.sendDemographics}/>
                    </div>
                </div>
                <Footer/>
            </>



    );
    }
}


