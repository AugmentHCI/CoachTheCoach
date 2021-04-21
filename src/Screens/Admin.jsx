import React, {Component} from 'react';
import {checkCredentials, getDemographics, getPersonalities, getProfiles, getProfilesRaw} from "../Utils/API";
import DownloadRow from "../Components/DownloadRow";
import Login from "../Components/Login";


export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            profiles: [],
            profilesRaw: [],
            personalities:[],
            demographics: [],
            login: false
        };
        this.getAllData = this.getAllData.bind(this)
        this.checkCredentials = this.checkCredentials.bind(this)
    }

    async checkCredentials(){
        let user = sessionStorage.getItem('username')
        let password = sessionStorage.getItem('password')
        if (user !== null && password !== null){
            console.log("checking credentials")
            let response = await checkCredentials(user, password)
            console.log(response)
            let check = (response !== undefined && response !== null && response.data === 'credentials are ok')
            console.log(check)
            if (check){
                this.setState({
                    login: true
                })
            }
            else{
                this.setState({
                    login: false
                })
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
                    profiles: values[0],
                    profilesRaw: values[1],
                    personalities: values[2],
                    demographics: values[3]
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

    componentWillMount() {
        this.checkCredentials()
    }

    async componentDidMount() {
        this.getAllData()
    }



    render() {
        return (
            this.state.login ? this.renderData() : <Login handleLogin={this.checkCredentials} />


            )
    }
}