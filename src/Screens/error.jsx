import React, {Component} from 'react';
import styles from '../Styles/Error.module.css'


export default class Error extends Component{
	
	render(){
		const styleErrorContainer = styles.container;

		
		return(
			<>
			<div
				className={styleErrorContainer}
			>
				<h1>Error</h1>
				<h2>
					Something went wrong :(
				</h2>
				<p>Please disable your ad blocker and go back</p>
				<p>Please try again with a different browser (Firefox, Safari, Chrome)</p>
				<p>Or send an email to bart.reynders@kuleuven.be with as subject [ CoachProfile ].</p>
			
			</div>
			
			</>
		
		)
	}
	
}