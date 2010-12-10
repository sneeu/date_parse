(function () {
	var times = ['now', 'noon', 'midnight', '17:00', '1730', '6:45 pm', '3am'];
	for (var i = 0; i < times.length; i++) {
		console.log(times[i] + ' -> ' + JSDateParse.parseTime(times[i]).format());
	}
})();
