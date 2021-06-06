
if (document.body.classList.contains('home')) {
	setInterval(() => {

		const date = new Date();
		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();
		let wDay = date.getDay();
		let hour = date.getHours();
		let minute = date.getMinutes();

		let weekday;

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

		if (wDay === 1) {
			weekday = 'Monday';
		}

		if (wDay === 2) {
			weekday = 'Tuesday';
		}

		if (wDay === 3) {
			weekday = 'Wednesday';
		}

		if (wDay === 4) {
			weekday = 'Thursday';
		}

		if (wDay === 5) {
			weekday = 'Friday';
		}

		if (wDay === 6) {
			weekday = 'Saturday';
		}

		if (wDay === 0) {
			weekday = 'Sunday';
		}

		const printDay = document.getElementById('weekday');
		const printTime = document.getElementById('time');

		printDay.innerText = weekday;
		printTime.innerText = day + '.' + month + '.' + year + '   ' + hour + ':' + minute;

	}, 1000);
}

function hideLoader() {
	setTimeout(() => {
		document.querySelector('.loading').classList.add('hide-loader');
	}, 1000);
}