import axios from 'axios'


export async function addProfile(participatief, afstemmend, begeleidend, verduidelijkend,
                                 eisend, dominerend, opgevend, afwachtend){
	const time = new Date().getTime();
	const data = {
		time: time,
		participatief: participatief,
		afstemmend: afstemmend,
		begeleidend: begeleidend,
		verduidelijkend: verduidelijkend,
		eisend: eisend,
		dominerend: dominerend,
		opgevend: opgevend,
		afwachtend: afwachtend,
	};
	const request = [
		"http://picasso.experiments.cs.kuleuven.be:3038/api/profile",
	].join('');
	// const request = [
	// 	"http://localhost:5000/api/profile",
	// ].join('');
	const res = await axios.post(request, data);
	return res
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
	const request = [
		"http://picasso.experiments.cs.kuleuven.be:3038/api/demographics",
	].join('');
	// const request = [
	// 	"http://localhost:5000/api/demographics",
	// ].join('');
	const res = await axios.post(request, data);
	return res
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
	const request = [
		"http://picasso.experiments.cs.kuleuven.be:3038/api/demographics",
	].join('');
	// const request = [
	// 	"http://localhost:5000/api/demographics",
	// ].join('');
	const res = await axios.post(request, data);
	return res
}


