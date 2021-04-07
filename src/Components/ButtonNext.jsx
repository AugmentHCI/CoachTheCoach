import React, {Component} from 'react';
import styles from '../Styles/ButtonNext.module.css';


export default class ButtonNext extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const styleButton = styles.button;

        return (
            <button
                className={styleButton}
                onClick={this.props.handleClick}
            >
                Next
            </button>)
    }



}