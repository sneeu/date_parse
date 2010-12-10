/**
 * JSDate, JSTime, and JSDateParse (c) 2010 John Sutherland <john@sneeu.com>
 */

(function () {
	var root = this;

	var JSDate = function (year, month, day) {
		this.format = function (format) {
			return '' + year + '-' + month + '-' + day;
		};
	};

	var JSTime = function (hours, minutes, seconds) {
		this.format = function (format) {
			return '' + hours + ':' + minutes + ':' + seconds;
		};
	};

	var JSDateParse = {
		DATE: 'date',
		TIME: 'time',
		DATETIME: 'datetime',

		parse: function () {
			var string = arguments[0];
			var hint = JSDateParse.DATETIME;

			if (arguments.length > 1) {
				hint = arguments[1];
			}

			if (hint == JSDateParse.TIME) {
				var time = JSDateParse.parseTime(string);
				if (time != null) {
					return time;
				}
			}
		},

		parseDate: function (dateString) {
			
		},

		parseTime: function (timeString) {
			timeString = timeString.toLowerCase();

			if (timeString == 'now') {
				var now = new Date();
				return new JSTime(now.getHours(), now.getMinutes(), now.getSeconds());
			}

			if (timeString == 'noon') {
				return new JSTime(12, 0, 0);
			}

			if (timeString == 'midnight') {
				return new JSTime(0, 0, 0);
			}

			timeString = timeString.replace(/(\.|\:)/, '');

			var hours = 0, minutes = 0, seconds = 0;

			if (timeString.match(/.*a(m)?.*/)) {
				timeString = timeString.replace(/[^\d]/g, '');
			}
			if (timeString.match(/.*p(m)?.*/)) {
				timeString = timeString.replace(/[^\d]/g, '');
				hours += 12;
			}

			switch (timeString.length) {
				case 1:
				case 2:
					hours += parseInt(timeString, 10);
					break;
				case 3:
					hours += parseInt(timeString.substring(0, 1), 10);
					minutes += parseInt(timeString.substring(1, 3), 10);
					break;
				case 4:
					hours += parseInt(timeString.substring(0, 2), 10);
					minutes += parseInt(timeString.substring(2, 4), 10);
					break;
				case 5:
					hours += parseInt(timeString.substring(0, 1), 10);
					minutes += parseInt(timeString.substring(1, 3), 10);
					seconds += parseInt(timeString.substring(3, 5), 10);
					break;
				case 6:
					hours += parseInt(timeString.substring(0, 2), 10);
					minutes += parseInt(timeString.substring(2, 4), 10);
					seconds += parseInt(timeString.substring(4), 10);
					break;
			}

			return new JSTime(hours, minutes, seconds);
		}
	};

	root.JSDateParse = JSDateParse;
})();
