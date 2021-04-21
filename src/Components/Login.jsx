import React, {Component} from 'react';
import classnames from 'classnames';
import styles from '../Styles/Login.module.css';
import Title from "./Title";

export default class Login extends Component {
    constructor(props) {
        super();
        this.setPassword = this.setPassword.bind(this)
        this.setUserName = this.setUserName.bind(this)
    }

    setUserName(value){
        sessionStorage.setItem("username" , value)
    }

    setPassword(value){
        sessionStorage.setItem("password" , value)
    }

    checkCredentials(){
        this.props.handleLogin()
    }


    render() {
        let styleContainer = classnames(styles.container)
        return (
        <div className={styleContainer}>
            <Title title={"Please log in"}/>
            <form>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => this.setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => this.setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit" onClick={this.checkCredentials}>Submit</button>
                </div>
            </form>
        </div>)
    }
}