import React, {Component} from 'react';
import {checkCredentialsAPI, getDemographics, getPersonalities, getProfiles, getProfilesRaw} from "../Utils/API";
import DownloadRow from "../Components/DownloadRow";
import Login from "../Components/Login";
import styles from '../Styles/Admin.module.css';
import classnames from 'classnames';


export default class Admin extends Component {
    constructor(props) {
        super(props);
        let nb_incorrect = 0
        let nb_incorrect_session = sessionStorage.getItem('nb_incorrect')
        if (nb_incorrect_session !== null){
            nb_incorrect = parseInt(nb_incorrect_session)
        }
        this.state = {
            loading: true,
            profiles: [],
            profilesRaw: [],
            personalities:[],
            demographics: [],
            login: false,
            wrong_credentials: false,
            nb_incorrect: nb_incorrect
        };
        this.getAllData = this.getAllData.bind(this)
        this.checkCredentials = this.checkCredentials.bind(this)
    }

    async checkCredentials(){
        let user = sessionStorage.getItem('username')
        let password = sessionStorage.getItem('password')
        if (user !== null && password !== null){
            let response = await checkCredentialsAPI(user, password)
            if (response.data === 'credentials are ok' ){
                this.setState({
                    login: true
                })
            }
            else{
                console.log(response)
                if (response === 401) {
                    sessionStorage.setItem('nb_incorrect', parseInt(this.state.nb_incorrect) + 1)
                    this.setState({
                        login: false,
                        wrong_credentials: true,
                    })
                }
                else{
                    this.props.history.push({
                        pathname: '/Error500',
                    })
                }

            }
        }
    }

    async getAllData(){
        const promise1 = getProfiles();
        const promise2 = getProfilesRaw();
        const promise3 = getPersonalities();
        const promise4 = getDemographics();


        Promise.all([promise1, promise2, promise3, promise4])
            .then(values => {
                this.setState({
                    loading: false,
                    profiles: values[0]['data'],
                    profilesRaw: values[1]['data'],
                    personalities: values[2]['data'],
                    demographics: values[3]['data']
                })
            })
    }

    renderData(){
        return(
            this.state.loading ?
                <p>Loading...</p> :
                <div>
                    <DownloadRow
                        name={"Profile"}
                        data={this.state.profiles}
                        file={"profiles.csv"}
                    />
                    <DownloadRow
                        name={"Profile raw data"}
                        data={this.state.profilesRaw}
                        file={"profilesRaw.csv"}
                    />
                    <DownloadRow
                        name={"Personalities"}
                        data={this.state.personalities}
                        file={"personalities.csv"}
                    />
                    <DownloadRow
                        name={"Demographics"}
                        data={this.state.demographics}
                        file={"demographics.csv"}
                    />
                </div>
        )
    }

    renderWrongCredentials(){
        let styleWarning = classnames(styles.warning)
        let styleContainer = classnames(styles.container)
        return(
            <div className={styleContainer}>
                <p className={styleWarning}>Wrong combination of username and password. Please try again.</p>
            </div>
        )
    }

    renderMaxNbIncorrect(){
        let styleError = classnames(styles.error)
        let styleContainer = classnames(styles.container)
        return(
            <div className={styleContainer}>
                <p className={styleError}>It seems that you forgot your password, please contact augment@cs.kuleuven.be. </p>
            </div>

        )
    }




    async componentDidMount() {
        this.checkCredentials()
        this.getAllData()
    }





    render() {
        if (this.state.login){
            return this.renderData()
        }
        if (this.state.nb_incorrect >= 5){
            return (
                <>
                    {this.renderMaxNbIncorrect()}
                </>
            )
        }
        if (this.state.nb_incorrect >= 3){
            return (
                <>
                    {this.renderWrongCredentials()}
                    {this.renderMaxNbIncorrect()}
                    <Login handleLogin={this.checkCredentials} />
                </>
            )
        }
        if (this.state.wrong_credentials){
            return (
                <>
                    <Login handleLogin={this.checkCredentials} />
                    {this.renderWrongCredentials()}

                </>
            )
        }
        else{
            return <Login handleLogin={this.checkCredentials} />
        }
    }
}