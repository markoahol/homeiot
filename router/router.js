require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Entry = require('../db/modules/history');

let cache = axios.get(`http://${process.env.SERVERIP}`)
	.then(response => {
		cache = response.data;
	})
	.catch(err => {
		console.log(err);
		cache = undefined;
	});

let date;
let hours;
let minutes;

// Interval to update new entries into the database
setInterval(() => {
	const d = new Date();
	let day = d.getDate();
	let month = d.getMonth() + 1;
	let year = d.getFullYear();
	let hour = d.getHours();
	let minute = d.getMinutes();

	if (day < 10) {
		day = '0' + day;
	}

	if (month < 10) {
		month = '0' + month;
	}

	if (hour < 10) {
		hour = '0' + hour;
	}

	if (minute < 10) {
		minute = '0' + minute;
	}

	date = day + '.' + month + '.' + year;
	hours = hour;
	minutes = minute;

	if (minutes === '00') {

		axios.get(`http://${process.env.SERVERIP}`)
			.then(response => {
				const entry = new Entry({
					light_intensity: {
						value: response.data.light_intensity.value
					},
					humidity: {
						value: response.data.humidity.value
					},
					temperatures: {
						inside: response.data.temperatures.inside,
						outside: response.data.temperatures.outside
					},
					time: {
						date: date,
						time: hours + ':' + minutes
					}
				});

				entry.save((err) => {
					if (!err) {
						console.log('New entry saved');
					} else {
						console.log(err);
					}
				});
			})
			.catch(err => {
				console.log(err);
			});
	}
}, 60000);


router.get('/', (req, res) => {
	axios.get(`http://${process.env.SERVERIP}`)
		.then(response => {
			axios.get(`http://api.openweathermap.org/data/2.5/weather?id=632978&units=metric&appid=${process.env.WEATHERAPI}`)
				.then(weather => {
					res.render('home', { body: 'home', data: response.data, weather: weather.data });
					console.log(response.data);
				});
		})
		.catch(err => {
			res.render('home', { data: undefined, weather: undefined });
		});
});

router.get('/forecast', (req, res) => {
	axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=63.096&lon=21.6158&exclude=current,minutely,hourly&units=metric&appid=${process.env.WEATHERAPI}`)
		.then(response => {
			res.render('forecast', { forecast: response.data, body: 'forecast' });
		});
});

router.get('/history', (req, res) => {
	Entry.find({}, (err, results) => {
		if (!err) {
			res.render('history', { body: 'history', entries: results.reverse() });
		} else {
			res.render('history', { body: 'history', entries: undefined });
		}
	});
});

module.exports = router;