import React, {Component} from 'react';
import styles from '../Styles/ButtonNext.module.css';


export default class ButtonNext extends Component {

    getDisplayName(){
        if (this.props.displayName === undefined){
            return "Next"
        }
        else{
            return this.props.displayName
        }
    }

    getId(){
        if (this.props.id === undefined){
            return "ButtonNext"
        }
        else{
            return this.props.id
        }
    }

    render() {
        const styleButton = styles.button;

        return (
            <button
                className={styleButton}
                onClick={this.props.handleClick}
                id={this.getId()}
            >
                {this.getDisplayName()}
            </button>)
    }



}