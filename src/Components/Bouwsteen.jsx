import React, {Component} from 'react';
import Footer from "./Footer";
import classnames from 'classnames';
import styles from '../Styles/Bouwsteen.module.css';


export default class Bouwsteen extends Component {
    render() {
        let styleContainer = classnames(styles.container)
        let styleContainerTitle = classnames(styles.containerTitle)
        let styleLogo = classnames(styles.logo)

        let styleContent = classnames(styles.content)
        let styleContentPrint = classnames(styles.contentPrint)
        let styleTitle = classnames(styles.title)
        let styleTitlePrint = classnames(styles.titlePrint)
        let styleButton = classnames(styles.button)
        let styleScore = classnames(styles.score)

        if (this.props.pagebreak){
            styleContainer = classnames(styles.containerPagebreak)
        }


        return (
            <>
                <div
                    className={styleContainer}
                >

                    {this.props.print ?
                        <h1
                            style={{color: this.props.color}}
                            className={styleTitlePrint}
                        >{this.props.name}</h1>
                        :
                        <div
                            className={styleContainerTitle}
                        >
                            <h1

                                style={{backgroundColor: this.props.color}}
                                className={styleTitle}
                            >{this.props.name}</h1>
                            <img src={this.props.logo} className={styleLogo} alt={this.props.name}/>
                        </div>
                    }


                    <h2
                        style={{color: this.props.color}}
                        className={styleScore}
                    >
                        Jouw score: {this.props.score}
                    </h2>
                    <p
                        className={this.props.print ? styleContentPrint : styleContent}
                        style={{color: this.props.color}}

                    >{this.props.content}</p>
                </div>

                <button
                    id="backToProfile"
                    className={styleButton}
                    onClick={this.props.handleGoBackToProfile}
                >
                    Terug naar profiel
                </button>
                <Footer/>
            </>)
    }
}