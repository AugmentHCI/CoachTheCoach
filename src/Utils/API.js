import axios from 'axios'
import User from '../auth.json'


export async function addProfile(id, participatief, afstemmend, begeleidend, verduidelijkend,
                                 eisend, dominerend, opgevend, afwachtend, autonomie, structuur, controle, chaos){
	const time = new Date().getTime();
	const data = {
		id: id,
		time: time,
		participatief: participatief,
		afstemmend: afstemmend,
		begeleidend: begeleidend,
		verduidelijkend: verduidelijkend,
		eisend: eisend,
		dominerend: dominerend,
		opgevend: opgevend,
		afwachtend: afwachtend,
		autonomie: autonomie,
		structuur: structuur,
		controle: controle,
		chaos: chaos
	};
	let userName = User.user
	let passWord = User.password
	axios({
		method: 'post',
		url: 'http://picasso.experiments.cs.kuleuven.be:3038/api/profile',
		auth: {username: userName, password:passWord},
		data: data
	}).then(
		function (response){
			return response
		}
	)
}

export async function addDataProfile(id,q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,
							  q11,q12,q13,q14,q15,q16,q17,q18,q19,q20,
							  q21,q22,q23,q24,q25,q26,q27,q28,q29,q30,
							  q31,q32,q33,q34,q35,q36,q37,q38,q39,q40,
							  q41,q42,q43,q44,q45,q46,q47,q48,q49,q50,
							  q51,q52,q53,q54,q55,q56,q57,q58,q59,q60,
							  ){
	const data = {
		id: id,
		q1: q1,
		q2: q2,
		q3: q3,
		q4: q4,
		q5: q5,
		q6: q6,
		q7: q7,
		q8: q8,
		q9: q9,
		q10: q10,
		q11: q11,
		q12: q12,
		q13: q13,
		q14: q14,
		q15: q15,
		q16: q16,
		q17: q17,
		q18: q18,
		q19: q19,
		q20: q20,
		q21: q21,
		q22: q22,
		q23: q23,
		q24: q24,
		q25: q25,
		q26: q26,
		q27: q27,
		q28: q28,
		q29: q29,
		q30: q30,
		q31: q31,
		q32: q32,
		q33: q33,
		q34: q34,
		q35: q35,
		q36: q36,
		q37: q37,
		q38: q38,
		q39: q39,
		q40: q40,
		q41: q41,
		q42: q42,
		q43: q43,
		q44: q44,
		q45: q45,
		q46: q46,
		q47: q47,
		q48: q48,
		q49: q49,
		q50: q50,
		q51: q51,
		q52: q52,
		q53: q53,
		q54: q54,
		q55: q55,
		q56: q56,
		q57: q57,
		q58: q58,
		q59: q59,
		q60: q60,
	}
	let userName = User.user
	let passWord = User.password
	axios({
		method: 'post',
		url: 'http://picasso.experiments.cs.kuleuven.be:3038/api/profile/data',
		auth: {username: userName, password:passWord},
		data: data
	}).then(
		function (response){
			return response
		}
	)
}


export async function addDemographics(id,age,gender,sport,ageSporters,experience,level,nbHours,diploma){
	const data = {
		id: id,
		age: age,
		gender: gender,
		sport: sport,
		ageSporters: ageSporters,
		experience: experience,
		level: level,
		nbHours: nbHours,
		diploma: diploma
	};
	let userName = User.user
	let passWord = User.password
	axios({
		method: 'post',
		url: 'http://picasso.experiments.cs.kuleuven.be:3038/api/demographics',
		auth: {username: userName, password:passWord},
		data: data
	}).then(
		function (response){
			return response
		}
	)

}


export async function addPersonality(id,extravert,kritisch,grondig, angstig, fantasie, gereserveerd, sympathiek, lui, kalm, creatief){
	const data = {
		id: id,
		extravert: extravert,
		kritisch: kritisch,
		grondig: grondig,
		angstig: angstig,
		fantasie: fantasie,
		gereserveerd: gereserveerd,
		sympathiek: sympathiek,
		lui: lui,
		kalm: kalm,
		creatief: creatief
	};
	let userName = User.user
	let passWord = User.password
	axios({
		method: 'post',
		url: 'http://picasso.experiments.cs.kuleuven.be:3038/api/personality',
		auth: {username: userName, password:passWord},
		data: data
	}).then(
		function (response){
			return response
		}
	)
}

export async function getPersonalities(){
	let userName = User.user
	let passWord = User.password
	return axios({
		method: 'get',
		url: 'http://picasso.experiments.cs.kuleuven.be:3038/api/personality/135792468',
		auth: {username: userName, password:passWord},
	})

}

export async function getProfiles(){
	let userName = User.user
	let passWord = User.password
	return axios({
		method: 'get',
		url: 'http://picasso.experiments.cs.kuleuven.be:3038/api/profile/135792468',
		auth: {username: userName, password:passWord},
	})
}

export async function getProfilesRaw(){
	let userName = User.user
	let passWord = User.password
	return axios({
		method: 'get',
		url: 'http://picasso.experiments.cs.kuleuven.be:3038/api/profile/Data/135792468',
		auth: {username: userName, password:passWord},
	})
}

export async function getDemographics(){
	let userName = User.user
	let passWord = User.password
	return axios({
		method: 'get',
		url: 'http://picasso.experiments.cs.kuleuven.be:3038/api/demographics/135792468',
		auth: {username: userName, password:passWord},
	})
}

export async function checkCredentialsAPI(user, password){
	const data = {
		user: user,
		password: password
	};
	let userName = User.user
	let passWord = User.password
	return axios({
		method: 'post',
		url: 'http://picasso.experiments.cs.kuleuven.be:3038/api/admin/password',
		auth: {username: userName, password: passWord},
		data: data
	}).then((res) => {return res}).catch((error) => {
		return error.response.status})
}






