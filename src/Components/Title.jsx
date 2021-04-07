import React from 'react';
import styles from "../Styles/Title.module.css";

function Headline(props) {
    let styleContainer = styles.container;
    let styleTitle = styles.title;
    return (
        <div className={styleContainer}>
            <h1 className={styleTitle}>
                {props.title}
            </h1>

        </div>
    );
}

export default Headline;