import React, {Component} from 'react';
import styles from '../Styles/Welcome.module.css';
import Footer from "../Footer";


export default class Welcome extends Component{
    constructor(props) {
        super(props);
        this.goToNext = this.goToNext.bind(this)
    }

    goToNext(){
        this.props.history.push({
            pathname: '/Demographics',
        })
    }

    render(){
        const styleContainer = styles.container;
        const styleButton = styles.button;

        return(
            <>
                <div className={styleContainer}>
                    <h1>Welcome</h1>
                    <p>
                        Iedere coach heeft zijn kenmerkende coachstijl, zijn eigen identiteit als coach. In wat volgt willen we jouw gedrag als coach in kaart brengen en hiervan een profiel opstellen. Dit is in geen geval een evaluatie of oordeel. Het is in de eerste plaats de bedoeling dat je jezelf bewust bent van je eigen gedrag. Met deze tool hopen we samen met jou die stap te zetten naar meer bewustwording rond motiverend coachen.
                        <br/>
                        <br/>

                        We wensen daarom expliciet te benadrukken dat er geen juiste of foute antwoorden/scores gegeven kunnen worden. Om tot een accurate zelfreflectie te komen willen we uitdrukkelijk vragen om zo eerlijk en waarheidsgetrouw mogelijk te antwoorden.
                        <br/>
                        <br/>

                        Na enkele basisgegevens en -vragen ingevuld te hebben, zullen er 15 sportspecifieke situaties of casussen voorgelegd worden. Binnen elke situatie worden 4 mogelijke antwoorden of reacties voorgesteld. Het is de bedoeling dat je voor elk van de voorgestelde reacties aangeeft in hoeverre dit overeenstemt met het gedrag dat jij als coach zou vertonen in die specifieke situatie. Is een situatie voor jouw onherkenbaar als coach? Probeer je dan voor te stellen hoe je zou reageren in de gegeven situatie.
                        <br/>
                        <br/>

                        Nadat je elke situatie hebt doorlopen bekom je uiteindelijk een volledig coachprofiel. Je zal daarbij je gedetailleerde scores kunnen raadplegen, meer informatie kunnen bekijken, alsook jouw gepersonaliseerd profiel downloaden. Aan de hand van de combinatie van het bekomen coachprofiel en de extra informatie zal je kunnen reflecteren over jouw eigen motiverend coachgedrag.

                    </p>

                </div>
                <button
                    onClick={this.goToNext}
                    className={styleButton}

                >Next</button>
                <Footer/>

            </>


        )
    }

}