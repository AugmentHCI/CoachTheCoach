import React, {Component} from 'react';
import styles from '../Styles/Error.module.css'


export default class Error500 extends Component{

    render(){
        const styleErrorContainer = styles.container;


        return(
            <>
                <div
                    className={styleErrorContainer}
                >
                    <h1>Internal Error</h1>
                    <h2>
                        Something went wrong on our side :(
                    </h2>
                    <p>Please send a message to augment@cs.kuleuven.be</p>


                </div>

            </>

        )
    }

}