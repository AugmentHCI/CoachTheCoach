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