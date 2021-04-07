import React, {Component} from 'react';
import styles from '../Styles/Footer.module.css'
import vts from '../Images/Logo_VlaamseTrainersschool.jpg'
import KUL from '../Images/KU Leuven.png'

export default class Footer extends Component {
    render() {
        let styleContainer = styles.container;
        let styleLogo = styles.logo
        return (
            <div className={styleContainer}>
                <img src={vts} alt="Vlaamse Trainersschool" className={styleLogo}/>
                <img src={KUL} alt="KU Leuven" className={styleLogo}/>

            </div>
        )
    }
}